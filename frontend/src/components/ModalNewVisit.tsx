import React, {useEffect, useState} from 'react';
import {DatePicker, Flex, Form, Input, Modal, Upload} from 'antd';
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


CalendarLocale["shortWeekDays"] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
CalendarLocale["shortMonths"] = ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"]

const ModalNewVisit: React.FC = observer(({isOpen = false, setIsOpen, isEdit = false, idVisit = null, onClickEditVisit, setIdVisit}) => {

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const rootStore = RootStore();
    const {ClientsStore, VisitStore} = rootStore.useStores();
    const {getRequest, postRequest, putRequest} = useHttp();

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
            if (!isFileListEmpty) {//we need convert new photo too
                const nameUploadFile = values.photo[0]["name"]
                const namePreviousFile = VisitStore.getById(Number(idVisit)) ? getNameFile(VisitStore.getById(Number(idVisit))?.photo) : null
                isFileListChange = nameUploadFile !== namePreviousFile
            }
            if (isFileListChange) {
                const formData = new FormData();
                fileList?.forEach((file) => {
                    formData.append('photo', file as RcFile);
                });
                file = await postRequest({url: `${Urls().convert}`, data: formData})
            }

            console.log('file', file)

            const obj = {
                client_id: Number(ClientsStore.CurrentClient["id"]),
                duration: values.duration || null,
                date: values.date?.$d.toISOString(),
                price: values.price || null,
                comment: values.comment || null,
                photo: isFileListEmpty ? null :
                    isFileListChange ? file["data"]?.fileName?.toString()
                        : VisitStore.getById(Number(idVisit))?.photo
            };
            form.resetFields();
            setIsOpen(false);

            if (isEdit) {
                const result = await putRequest({url: `${Urls().visits}/${idVisit}`, data: obj});
                if (!result["data"]["status"]) return;
                runInAction(() => {
                    const visit = VisitStore.getById(idVisit)
                    VisitStore.editVisitById(Number(idVisit), {
                        ...visit,
                        date_format: obj.date ? formatDate(obj.date) : null,
                        ...obj,
                        photo_name: getNameFile(obj.photo || '')
                    });
                })
            } else {
                const result = await postRequest({url: `${Urls().visits}`, data: obj})
                const data = result["data"]
                runInAction(() => {
                    VisitStore.addNewVisit({
                        ...obj,
                        id: Number(data["id"]),
                        key: Number(data["id"]),
                        date_format: data.date ? formatDate(data.date) : null,
                        photo_name: getNameFile(data.photo || ''),
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
            }

        }
        catch (info) {
            console.log('Validate Failed:', info);
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
        //if (!isEdit) return;
        //if(!isOpen) return;
        if(idVisit) {
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