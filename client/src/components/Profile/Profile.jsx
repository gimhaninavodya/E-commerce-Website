import { Avatar, Button, Card, Flex, Typography } from "antd";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { UserOutlined } from "@ant-design/icons";

export const Profile = () => {
  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <Card className="profile-card">
      <Flex vertical gap="small" align="center">
        <Avatar size={150} icon={<UserOutlined />} className="avatar" />
        <Typography.Title level={2} strong className="username">
          {userData.name}
        </Typography.Title>
        <Typography.Text type="secondary" strong>
          Email: {userData.email}
        </Typography.Text>
        <Typography.Text type="secondary" strong>
          Role: {userData.role}
        </Typography.Text>
        <Button
          size="large"
          type="default"
          className="profile-btn"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>
    </Card>
  );
};

export default Profile;
