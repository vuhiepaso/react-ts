import { Button, Checkbox, Form, Input } from "antd";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginThunk } from "../../store/sliceAuth";
import { IFAuth } from "../../interface";
import "./css/login.css";
import { useAppDispatch } from "../../store";
interface MessageAuth {
  status: "" | "error";
  messHelp: string | null;
}

function Auth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Manage State
  const [messageAuth, setMessageAuth] = useState<MessageAuth>({
    status: "",
    messHelp: null,
  });

  const onFinish = async (values: IFAuth) => {
    const { payload } = await dispatch(loginThunk(values));
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
      <div className="box_login max-w-xs m-auto mt-28">
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
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            validateStatus={messageAuth.status}
            help={messageAuth.messHelp}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            validateStatus={messageAuth.status}
            help={messageAuth.messHelp}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default Auth;
