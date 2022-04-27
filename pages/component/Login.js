import React, {useState} from 'react'
import { Form, Input, Button, Checkbox, Radio, InputNumber } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function Layout({ children }) {
    const [isLogin, setIsLogin] = useState(true);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    
    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
        <Form.Item
            name="name"
            rules={[
            {
                required: true,
                message: 'Please input your Username!',
            },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
            name="pwd"
            rules={[
            {
                required: true,
                message: 'Please input your Password!',
            },
            ]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            />
        </Form.Item>
        {!isLogin && <Form.Item
            name="sex"
            rules={[
                {
                    required: true,
                    message: '请选择性别!',
                },
                ]}
        >
            <Radio.Group>
            <Radio value="0">男</Radio>
            <Radio value="1">女</Radio>
            </Radio.Group>
        </Form.Item>}
        {!isLogin && <Form.Item>
            <Form.Item
                name="age"
                noStyle
                rules={[
                    {
                        required: true,
                        message: '请填写年龄！!',
                    },
                    ]}
            >
            <InputNumber min={1} max={100} />
            </Form.Item>
            <span className="ant-form-text"> 岁</span>
        </Form.Item>}
        <Form.Item>
            <Button style={{width: '100%'}} type="primary" htmlType="submit" className="login-form-button">
            {isLogin ? 'Log in' : 'register' }
            </Button>
            Or
            <span
            style={{
                color: '#1890ff',
                cursor:'pointer'
            }}
            onClick={()=>{
                setIsLogin(!isLogin)
            }}>
            {isLogin ? ' register now!' : ' Log in!'}</span>
        </Form.Item>
        </Form>
    );
}