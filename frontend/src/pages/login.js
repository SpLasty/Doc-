import React from "react";
import "antd/dist/reset.css";
import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Setting you on the Home page");
        localStorage.setItem("token", response.data.data);
        Navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authenticate">
      <div className="form card p-2">
        <h1 className="card-title">login</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Enter your password" type="password" />
          </Form.Item>
          <div className="d-flex flex-column">
            <Button className="primary-button my-4 full-width-button" htmlType="submit">
              Login
            </Button>

            <Link to="/signup" className="loginlink">
              Or Register !
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
