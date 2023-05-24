import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAppDispatch from "../../store/useAppDispatch";
import { setLogin, selectLogin } from "../../store/login";
import useAppSelector from "../../store/useAppSelector";

const App: React.FC = () => {
  const status: boolean = useAppSelector(selectLogin);
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(status) nav('/main');
  }, [nav, status])
  
  const onFinish = async (values: any) => {
      axios.post('/api/user/login', values)
        .then((res) => {
        if(res.data.code === 0) {
          console.log('dispatch')
          dispatch(setLogin());
          nav("/main");
        }
        else {
          message.info("登录失败，用户名或密码错误")
        }
    })
  };
  
  return (
    <div className="sign-in">
      <div className="sign-in-title">
        <span>登录</span>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
