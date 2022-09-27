import { Modal } from 'antd';
import React from 'react';
import { Avatar, List } from 'antd';
import {DashboardOutlined, UserOutlined} from "@ant-design/icons";

const AboutSys = (props) => {
    // 控制显示隐藏
    const {visible, setVisible} = props;

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    // 系统信息
    const sysData = ["版本：Version 1.0.0","developer： tonyTang", "版权：Copyright Of Starnet"];

    return (
        <div>
            <Modal title={<span style={{color:"#1890ff"}}><DashboardOutlined />&nbsp;关于系统</span>} okText="确定" cancelText="取消" visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <List
                    header={
                        <List.Item style={{backgroundColor:"rgba(255,85,0,0.2)",borderRadius:"5px"}}>
                            <List.Item.Meta
                                avatar={<Avatar size="large" src={<UserOutlined />} style={{boxShadow:"0 3px 5px 0 grey"}} />}
                                title={<a>知识分享系统 version:1.0.0</a>}
                                description="让知识成为财富，让分享成就快乐"
                            />
                        </List.Item>}
                    bordered
                    dataSource={sysData}
                    renderItem={(item, index) => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}>
                </List>
            </Modal>
        </div>
    );
};

export default AboutSys;