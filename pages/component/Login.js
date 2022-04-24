import React, {useState} from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
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
            name="username"
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
            name="password"
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
        <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
            </Form.Item>
    
            <a className="login-form-forgot" href="">
            Forgot password
            </a>
        </Form.Item>
    
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