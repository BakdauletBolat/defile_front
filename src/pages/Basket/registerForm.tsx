import { Form, Col, Row, Input, Space, message,Button } from "antd";
import { ShoppingOutlined,LoadingOutlined } from '@ant-design/icons';
import { useLocalStoreContext } from "../../hooks/useLocalContext";
import { useStoreContext } from "../../hooks/useContext";
import { IUserResponse } from "../../api/user";
import {observer} from 'mobx-react-lite';
import useModal from "../../hooks/useModal";

interface RegisterFormProps {
    onClose: React.MouseEventHandler<HTMLButtonElement>
}

function RegisterForm({ onClose }: RegisterFormProps) {

    const { userService } = useLocalStoreContext();
    const { basket } = useStoreContext();
    const { openModal, closeModal, Modal } = useModal();

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        values['session_id'] = basket?.session_uuid;
        basket?.setIsLoadingCreateOrder(true);
        try {
            const res = await userService?.createOrderToUnauthorizedUser(values);
            localStorage.setItem('token', res?.data.access!);
            basket?.setIsLoadingCreateOrder(false);
            basket?.getUser();
            openModal();
            basket?.getOrder();
        }
        catch (e: any) {
            console.log(e.response.data);

            if (e.response.data.message == 'UNIQUE constraint failed: users_customuser.email') {
                console.log('ea');
                message.error('Такое email уже существует, попробуйте другую')
            }
            basket?.setIsLoadingCreateOrder(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };



    return (
        <>
            <Modal></Modal>
            <Form layout="vertical"
                hideRequiredMark
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Col span={'auto'}>
                    <Form.Item
                        name="fullname"
                        label="ФИО"
                        rules={[{ required: true, message: 'Напишите свое Фио' }]}
                    >
                        <Input placeholder="Напишите свое Фио" />
                    </Form.Item>
                </Col>
                <Col span={'auto'}>
                    <Form.Item
                        name="email"
                        label="Почта"
                        rules={[{ type: 'email', required: true, message: 'Напишите свою почту' }]}
                    >
                        <Input placeholder="Напишите свою почту" />
                    </Form.Item>
                </Col>
                <Col span={'auto'}>
                    <Form.Item
                        name="phone"
                        label="Телефон"
                        rules={[{ required: true, message: 'Напишите свой телефон' }]}
                    >
                        <Input placeholder="Напишите свой телефон" />
                    </Form.Item>
                </Col>
                <Row justify="end" gutter={16}>
                    <Space>
                        <Button onClick={onClose}>Отменить</Button>
                        <Button htmlType={'submit'} disabled={basket?.isLoadingOrderCreating ? true :false} 
                                icon={basket?.isLoadingOrderCreating ? <LoadingOutlined></LoadingOutlined> : <ShoppingOutlined></ShoppingOutlined>} 
                                type={'primary'}>Оформить</Button>
                    </Space>
                </Row>
            </Form>
        </>
    );
}

export default observer(RegisterForm);