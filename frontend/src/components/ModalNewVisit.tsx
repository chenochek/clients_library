import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Flex, Form, Input, Modal, notification, Upload} from 'antd';
import {PlusOutlined} from "@ant-design/icons/lib";
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';
import TextArea from "antd/es/input/TextArea";
import RootStore from "../stores/RootStore.jsx";
import {RcFile, UploadFile, UploadProps} from "antd/es/upload/interface";
import {runInAction} from "mobx";
import {observer} from "mobx-react";
import useHttp from "../hooks/useHttp.js";
import Urls from "../constants/url";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
import {getNameFile} from "../utils/getNameFile"
import dayjs from 'dayjs';
import formatDate from "../utils/formatDate.js"
import {useCustomNotification} from "../hooks/useCustomNotification";


CalendarLocale["shortWeekDays"] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
CalendarLocale["shortMonths"] = ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"]

const ModalNewVisit: React.FC = observer(({isOpen = false, setIsOpen, isEdit = false, idVisit = null, onClickEditVisit, setIdVisit,
                                          setVisibleImage, setFilePath}) => {

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const rootStore = RootStore();
    const {ClientsStore, VisitStore} = rootStore.useStores();
    const {getRequest, postRequest, putRequest} = useHttp();
    const [api, contextHolder] = notification.useNotification();

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([file]);

            return false;
        },
        fileList,
    };


    const onClickPhoto = (photo) => {
        return () => {
            if(!photo) return;
            setVisibleImage(true)
            setFilePath(photo)
        }

    }

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };


    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const isFileListEmpty = !values.photo || values.photo?.length === 0;
            let isFileListChange = true;
            let file = null;
            const visit =  VisitStore.getById(Number(idVisit))
            if (!isFileListEmpty) {
                const nameUploadFile = values.photo[0]["name"]
                const namePreviousFile = getNameFile(visit?.photo || '')
                isFileListChange = nameUploadFile !== namePreviousFile
            }
            if (isFileListChange) {
                const formData = new FormData();
                fileList?.forEach((file) => {
                    formData.append('photo', file as RcFile);
                });
                file = await postRequest({url: `${Urls().convert}`, data: formData})
            }


            const obj = {
                client_id: Number(ClientsStore.CurrentClient["id"]),
                duration: values.duration || null,
                date: values.date?.$d.toISOString(),
                price: values.price || null,
                comment: values.comment || null,
                photo: isFileListEmpty ? null :
                    isFileListChange ? file["data"]?.fileName?.toString()
                        : visit?.photo
            };
            form.resetFields();
            setIsOpen(false);

            if (isEdit) {
                const result = await putRequest({url: `${Urls().visits}/${idVisit}`, data: obj});
                if (!result["data"]["status"]) return;
                runInAction(() => {
                    VisitStore.editVisitById(Number(idVisit), {
                        ...visit,
                        ...obj,
                        key: Number(visit.id),
                        date_format: obj.date ? formatDate(obj.date) : null,
                        photo_name:  <Button onClick={onClickPhoto(obj.photo)} type='link'> {getNameFile(obj.photo || '')}</Button>
                    });
                });
                api.info({
                    message:  'Информация об изменении',
                    description: 'Данные о посещении успешно изменены',
                    placement: 'topRight',
                })
            } else {
                const result = await postRequest({url: `${Urls().visits}`, data: obj})
                const data = result["data"]
                console.log('data', data)
                runInAction(() => {
                    VisitStore.addNewVisit({
                        ...obj,
                        id: Number(data["id"]),
                        key: Number(data["id"]),
                        date_format: obj.date ? formatDate(obj.date) : null,
                        photo_name: <Button onClick={onClickPhoto(obj.photo)} type='link'>{getNameFile(obj.photo || '')}</Button>,
                        action:
                            <Flex>
                                <EditBtn title="Редактировать сведения о посещении" onClick={() => {
                                    onClickEditVisit();
                                    setIdVisit(Number(data.id))
                                }
                                }/>
                                <DeleteBtn id={data.id} store={VisitStore} url={Urls().visits}/>
                            </Flex>
                    });
                })
                api.info({
                    message:  'Информация о добавлении',
                    description: 'Новое посещение успешно добавлено',
                    placement: 'topRight',
                })
            }

        }
        catch (info) {
            console.log('Validate Failed:', info);
            api.error({
                message:  'Информация об операции',
                description: 'Операция не выполнена. Произошла ошибка',
                placement: 'topRight',
            })

        }
    };

    const handleCancel = () => {
        setIsOpen(false);
        setIdVisit(null)
        form.resetFields();
    };

    const loadData = async () => {
        if(!isEdit) return;
        form.resetFields();
        const visit = await getRequest({url: `${Urls().visit}/${idVisit}`})
        const [visitInfo] = visit["data"]
        let preview = null;
        if (visitInfo.photo) {
            const nameFile = getNameFile(visitInfo.photo || '');
            const imageUrl = await postRequest({
                url: `${Urls().image}`, data: {
                    nameFile: nameFile
                }
            });
            preview = [{
                name: nameFile,
                status: 'done',
                url: imageUrl["data"]["url"],
                thumbUrl: imageUrl["data"]["url"],

            }];
            setFileList(preview)

        } else {
            setFileList(null)
        }
        form.setFieldsValue({
            duration: visitInfo.duration,
            date:  visitInfo.date? dayjs(visitInfo.date ) : null,
            price: visitInfo.price,
            comment: visitInfo.comment,
            photo: preview
        })

    };

    useEffect(() => {
        form.resetFields();
        loadData();

    }, [])

    useEffect(() => {
        if(idVisit) {
            form.resetFields();
            loadData();
        } else {
            form.resetFields();
        }


    }, [isEdit, idVisit, isOpen])
    /*
    Make with hoc
     */

    return (
        <>
            {contextHolder}
            <Modal forceRender title={isEdit ? "Редактировать посещение" : "Добавить посещение"} open={isOpen}
                   onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                    style={{maxWidth: 800}}
                >
                    <Form.Item name="date" label="Дата визита" rules={[
                        {
                            required: true,
                            message: 'Заполните это поле',
                        },
                    ]}>
                        <DatePicker locale={CalendarLocale} format="DD.MM.YYYY"/>
                    </Form.Item>
                    <Form.Item name="duration" label="Продолжительность">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="price" label="Цена">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="comment" label="Комментарий">
                        <TextArea rows={8}/>
                    </Form.Item>
                    <Form.Item name="photo" label="Загрузить фото" valuePropName="fileList"
                               getValueFromEvent={normFile}>
                        <Upload fileList={fileList} {...props} listType="picture-card" maxCount={1}>
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Загрузить</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});

export default ModalNewVisit;