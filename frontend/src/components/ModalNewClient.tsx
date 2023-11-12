import React, { useState } from 'react';
import {Form, Input, Modal, Upload} from 'antd';
import {PlusOutlined} from "@ant-design/icons/lib";

const ModalNewClient: React.FC = () => {

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    /*
    Make with hoc
     */

    return (
        <>
            <Modal title="Добавить клиента" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 800 }}
                >
                    <Form.Item label="ФИО">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Номер телефона">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Загрузить соглашение" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload action="/upload.do" listType="picture-card">
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Загрузить</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalNewClient;