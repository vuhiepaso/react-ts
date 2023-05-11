import { Button, Form, Input, notification } from "antd";
import { useState } from "react";
import "./css/login.css";
import {
  required,
  min,
  email,
  customPassword,
  confirmPassword,
  max,
} from "../../rules/fromInput";
import { IFRegister } from "../../interface";
import { APIregister } from "../../api/auth";
import { Link } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";
interface MessageAuth {
  status: "" | "error";
  messHelp: string | null;
}

function Register() {
  const [messageAuth, setMessageAuth] = useState<MessageAuth>({
    status: "",
    messHelp: null,
  });

  const onFinish = async (values: IFRegister) => {
    const rq = await APIregister(values);
    if (rq.data.status !== "success") {
      setMessageAuth({
        status: "error",
        messHelp: rq.data.message,
      });
    } else {
      openNotificationWithIcon();
    }
  };

  const handleValuesChange = () => {
    if (messageAuth.messHelp) {
      setMessageAuth({
        status: "",
        messHelp: null,
      });
    }
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = () => {
    api.success({
      message: "Register success",
    });
  };

  return (
    <>
      <div className="box_login max-w-2xl m-auto mt-28">
        <div className="max-w-2xl m-auto  font-medium">
          <Link to={"/auth"} title="To login">
            <LoginOutlined className="text-xl icon-login" />
          </Link>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-5">Register</h2>
        </div>

        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onValuesChange={handleValuesChange}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[required("Username"), min(4), max(20)]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[required("Email"), email]}
            hasFeedback
            validateStatus={messageAuth.status}
            help={messageAuth.messHelp}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[required("Password"), customPassword, min(8)]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[required("Confirm Password"), confirmPassword]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
      {contextHolder}
    </>
  );
}

export default Register;
