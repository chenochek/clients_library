import React, { useState } from 'react';
import {DatePicker, Form, Input, Modal, Upload} from 'antd';
import {PlusOutlined} from "@ant-design/icons/lib";
import TextArea from "antd/es/input/TextArea";

const ModalNewVisit: React.FC = () => {

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const [isModalOpen, setIsModalOpen] = useState(true);

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
            <Modal title="Добавить посещение" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 800 }}
                >
                    <Form.Item label="Дата визита">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Продолжительность">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Цена">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Комментарий">
                        <TextArea rows={8} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalNewVisit;