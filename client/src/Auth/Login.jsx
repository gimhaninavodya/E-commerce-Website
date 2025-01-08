import React from "react";
import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from "antd";
import pic1 from "../assets/sign in.png";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin.js";
import "./authStyle.css";

export const Login = () => {
  const { error, loading, loginUser } = useLogin();
  const handleLogin = async (values) => {
    await loginUser(values);
  };
  return (
    <Card className="card-body">
      <Flex gap="large" align="center">
        <Flex flex={1}>
          <img src={pic1} alt="r-pic" className="auth-image" />
        </Flex>
        <Flex vertical flex={1}>
          
          <Form className="form" layout="vertical" onFinish={handleLogin} autoComplete="off">
          <Typography.Title level={3} strong className="title">
            Sign In
          </Typography.Title>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "The input in not valid Email!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>

            {error && (
              <Alert
                description={error}
                type="error"
                showIcon
                closable
                className="alert"
              />
            )}
            <br /><br />
            <Form.Item>
              <Button
                type="default"
                htmlType="submit"
                size="large"
                className="btn custom-btn"
              >
                {loading ? <Spin /> : "Sign in"}
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/register">
                <Button size="large" className="btn custom-btn">
                  Create an account
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
  );
};
