import { Button, Form, Input, Spin } from "antd";
// import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginThunk } from "../../store/sliceAuth";
import { IFAuth } from "../../interface";
import "./css/login.css";
import { useAppDispatch } from "../../store";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
interface MessageAuth {
  status: "" | "error";
  messHelp: string | null;
}

function Auth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);

  // Manage State
  const [messageAuth, setMessageAuth] = useState<MessageAuth>({
    status: "",
    messHelp: null,
  });

  const onFinish = async (values: IFAuth) => {
    setSpinning(true);
    const { payload } = await dispatch(loginThunk(values));
    setSpinning(false);
    if (payload.status !== "200") {
      setMessageAuth({
        status: "error",
        messHelp: "Email or password invalid",
      });
    } else navigate("/");
  };

  const handleValuesChange = () => {
    if (messageAuth.messHelp) {
      setMessageAuth({
        status: "",
        messHelp: null,
      });
    }
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };

  return (
    <>
      <div className="box_login max-w-xs m-auto mt-20 ">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-5">Login</h2>
        </div>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          onValuesChange={handleValuesChange}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { type: "email", message: "This is not a valid email" },
            ]}
            validateStatus={messageAuth.status}
            help={messageAuth.messHelp}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            validateStatus={messageAuth.status}
            // help={messageAuth.messHelp}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item className="text-center">
            <Spin spinning={spinning} delay={100}>
              <Button type="primary" htmlType="submit" className="w-full">
                Log in
              </Button>
            </Spin>
          </Form.Item>
        </Form>
      </div>
      <div className="text-center mt-4 font-medium">
        <Link to={"/register"}>Register Account</Link>
      </div>
    </>
  );
}
export default Auth;
