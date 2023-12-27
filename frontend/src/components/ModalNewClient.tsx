import React, { useEffect, useState} from 'react';
import {DatePicker, Form, Input, Modal, notification, Upload} from 'antd';
import {PlusOutlined} from "@ant-design/icons/lib";
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';
import {runInAction} from "mobx";
import Urls from "../constants/url";
import {RcFile, UploadFile, UploadProps} from "antd/es/upload/interface";
import useHttp from "../hooks/useHttp.js";
import RootStore from "../stores/RootStore.jsx";
import dayjs from 'dayjs';
import {observer} from 'mobx-react'
import {getNameFile} from "../utils/getNameFile.js"
import {useCustomNotification} from "../hooks/useCustomNotification";



CalendarLocale["shortWeekDays"] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
CalendarLocale["shortMonths"] = ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"]

const ModalNewClient: React.FC = observer(({isOpen = false, setIsOpen, isEdit = false, id = null}) => {

        const [form] = Form.useForm();
        const [fileList, setFileList] = useState<UploadFile[]>([]);
        const {getRequest, postRequest, putRequest} = useHttp();
        const rootStore = RootStore();
        const {ClientsStore} = rootStore.useStores();
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

        const normFile = (e: any) => {
            if (Array.isArray(e)) {
                return e;
            }
            return e?.fileList;
        };

        const showModal = () => {
            setIsOpen(true);
        };

        const handleOk = async () => {
            try {
                setIsOpen(false);
                const values = await form.validateFields();
                const isFileListEmpty = !values.agreement || values.agreement.length === 0;
                let isFileListChange = false;
                let file = null;
                if(!isFileListEmpty) {
                    const nameUploadFile = values.agreement[0]["name"]
                    const namePreviousFile = ClientsStore.CurrentClient["agreement"]? getNameFile(ClientsStore.CurrentClient["agreement"]): null
                    isFileListChange = nameUploadFile !== namePreviousFile
                }
               if(isFileListChange) {
                   const formData = new FormData();
                   fileList?.forEach((file) => {
                       formData.append('agreement', file as RcFile);
                   });
                   file = await postRequest({url: `${Urls().convert}`, data: formData})
               }
                const obj = {
                    fio: values.fio,
                    dateBirth: values.date_birth?.$d.toISOString() || null,
                    mobile: values.mobile,
                    agreement:isFileListEmpty? null :
                        isFileListChange?  file["data"]?.fileName?.toString() : ClientsStore.CurrentClient["agreement"]
                };
                if(isEdit) {
                    const result = await putRequest({url: `${Urls().clients}/${id}`, data: obj});
                    if(! result["data"]["status"]) return;
                    runInAction(()=>{
                        ClientsStore.editClientById(id, {...obj, id: Number(id), date_birth: obj.dateBirth, last_visit: ClientsStore.CurrentClient.last_visit });
                        ClientsStore.CurrentClient = {...obj, id: Number(id), date_birth: obj.dateBirth, last_visit: ClientsStore.CurrentClient.last_visit   };
                    })
                    api.info({
                        message:  'Информация об изменении',
                        description: 'Данные о клиенте успешно обновлены',
                        placement: 'topRight',
                    })
                } else {
                    form.resetFields();
                    const result = await postRequest({url: `${Urls().clients}`, data: obj});
                    runInAction(()=>{
                        const client = result["data"]["client"]
                        ClientsStore.addNewClient({...client});
                        ClientsStore.CurrentClient = {...client};
                        console.log('ClientsStore.CurrentClient', ClientsStore.CurrentClient)
                    })
                    api.info({
                        message:  'Информация о добавлении',
                        description: 'Новый клиент успешно добавлен',
                        placement: 'topRight',
                    })
                }



            }
            catch (info) {
                console.log('Validate Failed:', info);
                api.error({
                    message:  'Информация об операции',
                    description: 'Произошла какая-то ошибка. Операция не выполнена',
                    placement: 'topRight',
                })
            }
        }


        const handleCancel = () => {
            setIsOpen(false);
        };

        const loadData = async () => {
            const persData = ClientsStore.CurrentClient;
            let preview = null;
            if(persData.agreement) {
                const nameFile = getNameFile(persData.agreement);
                const  imageUrl = await postRequest({url:`${Urls().image}`, data: {
                        nameFile: nameFile
                    }});
               preview = [{
                    name:nameFile,
                    status: 'done',
                    url: imageUrl["data"]["url"] ,
                    thumbUrl: imageUrl["data"]["url"],

                }];
                setFileList(preview)

            } else {
                setFileList(null)
            }
            form.setFieldsValue({
                fio: persData.fio,
                mobile: persData.mobile,
                date_birth: persData.date_birth? dayjs(persData.date_birth ) : null,
                agreement: preview
            })

        };


        useEffect(() => {
            form.resetFields();
            if (!isEdit) return;
            loadData();

        }, [])

    useEffect(() => {
        form.resetFields();
        if (!isEdit) return;
        loadData();

    }, [isEdit, id])

        /*
        Make with hoc
         */

        return (
            <>
                {contextHolder}
                <Modal forceRender  title={isEdit? "Добавить клиента" : "Редактировать клиента"} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        form={form}
                        labelCol={{span: 8}}
                        wrapperCol={{span: 14}}
                        layout="horizontal"
                        style={{maxWidth: 800}}
                    >
                        <Form.Item name="fio" label="ФИО" rules={[
                            {
                                required: true,
                                message: 'Заполните это поле',
                            },
                        ]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="mobile" label="Номер телефона">
                            <Input/>
                        </Form.Item>
                        <Form.Item name="date_birth" label="День рождения">
                            <DatePicker locale={CalendarLocale} format="DD.MM.YYYY"/>
                        </Form.Item>
                        <Form.Item name="agreement" label="Загрузить соглашение" valuePropName="fileList"
                                   getValueFromEvent={normFile}>
                            <Upload fileList={fileList} {...props} listType="picture-card"  maxCount={1}>
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
    })
;

export default ModalNewClient;