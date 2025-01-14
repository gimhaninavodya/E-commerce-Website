import React from "react";
import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from "antd";
import pic from "../assets/create account.jpg";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp.js";
import "./authStyle.css";

export const Register = () => {
  const { loading, error, registerUser } = useSignUp();

  // Form submission handler
  const handleRegister = (values) => {
    registerUser(values); // Call the registerUser function with form values
  };

  return (
    <Card className="card-body">
      <Flex gap="large" align="center">
        <Flex vertical flex={1}>
          
          <Form className="form" layout="vertical" onFinish={handleRegister} autoComplete="off">
          <Typography.Title level={3} strong className="title">
            Create an account
          </Typography.Title>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your full name" />
            </Form.Item>
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
                  message: "The input is not a valid email!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your phone number" />
            </Form.Item>

            <div className="flex-fields">
            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your city" />
            </Form.Item>
            <Form.Item
              label="State"
              name="state"
              rules={[
                {
                  required: true,
                  message: "Please input your state!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your state" />
            </Form.Item>
            </div>

            <div className="flex-fields">
            <Form.Item
              label="Postcode"
              name="postcode"
              rules={[
                {
                  required: true,
                  message: "Please input your postcode!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your postcode" />
            </Form.Item>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please input your country!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your country" />
            </Form.Item>
            </div>

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
            <Form.Item
              label="Confirm Password"
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Re-enter your password"
              />
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
                {loading ? <Spin /> :
                  "Create Account"}
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/login">
                <Button size="large" className="btn custom-btn">
                  Sign In
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
        <Flex flex={1}>
          <img src={pic} alt="r-pic" className="auth-image" />
        </Flex>
      </Flex>
    </Card>
  );
};
