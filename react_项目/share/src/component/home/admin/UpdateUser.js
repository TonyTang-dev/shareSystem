import { LeftOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import $ from "jquery";
import MultiSelectTag from '../../Basic/MultiSelectTag';


const { Option } = Select;

const UpdateUser = (props) => {
    const {visible, setVisible, beRefresh, setRefreshList, updateObj} = props;

    // 拓展菜单列表
    const extendMenuList = [
        {"key":"administrator","name":"用户管理"},
        {"key":"sortManage","name":"分类管理"},
        {"key":"fileManage","name":"文件管理"},
        {"key":"adManage","name":"广告管理"},
        {"key":"commentManage","name":"评论管理"}
    ];

    // 自定义拓展菜单
    const [customMenu, setCustomMenu] = useState([]);

    // 表单hook
    const [form] = Form.useForm();

    const onClose = () => {
        setVisible(false);
        form.setFieldsValue({
            account:"",
            password:"",
            gender:"",
            authority:"",
            phone:"",
            email:"",
            sign:""
        });
    };

    // 提交表单
    const onSubmitBtn=(event)=>{
        let obj = form.getFieldsValue();

        if(obj.account === "" || obj.password === ''){
            alert("请先填写必需数据后再添加哟！");
            return;
        }
        // 添加key值
        obj["key"] = updateObj.key;
        // 添加关联菜单
        obj["menu"] = JSON.stringify(customMenu);

        $.ajax({
            url:"/shareArticle/user/updateuseradmin.map",
            type:"POST",
            cache: false,
            dataType: "json",
            data: obj,
            contentType:"application/x-www-form-urlencoded; charset=utf-8",
            success:(result)=>{
                // console.log("update: "+JSON.stringify(result));
                if(result.code==="200" && result.status==="OK" && result.success==="true"){
                    form.resetFields(["account","password","phone","email","sign"]);

                    // 隐藏修改面板
                    setVisible(false);

                    // 刷新用户列表
                    setRefreshList(!beRefresh);
                }else{
                    alert("添加用户数据失败/未修改数据就提交");
                }
            },
            error:(status,err)=>{
                console.log(err, status);
                alert("添加用户数据失败,可能没有网络！");
            }
        })
    }


    const init=()=>{
        form.setFieldsValue({
            account:updateObj.acc,
            password:"",
            gender:updateObj.gender,
            authority:updateObj.authority,
            phone:updateObj.phone,
            email:updateObj.email,
            sign:updateObj.sign
        });
    }

    // 检测form是否被挂载，避免未挂载就使用情况的出现
    useEffect(()=>{
        init();
    },[form]);

    // 用户资料变换后需要重渲染界面数据
    useEffect(()=>{
        init();
    },[visible]);



    // 密码强度提示文本
    let initPassTip = "弱";
    const [passStrength, setPassStrength] = useState(initPassTip);
    // 号码提示
    const [phoneValid, setPhoneValid] = useState("号码格式不正确");
    // 邮箱提示
    const [emailValid, setEmailValid] = useState("邮箱格式不正确");

    // 密码强度校验
    const handlePassValidate=(e)=>{
        // console.log(e.target.value);
        if(e.target.value.length < 6){
            setPassStrength("密码过于简单,建议6位以上数字、字母组合");
            return;
        }
        //正则匹配校验
        if(/^[0-9]+$/.test(e.target.value)){
            setPassStrength("弱");
        }else if(/^[0-9]+[a-zA-Z]{1,3}$/.test(e.target.value)){
            setPassStrength("中");
        }else if(/^[0-9]+[a-zA-Z]{3,}$/.test(e.target.value)){
            setPassStrength("强");
        }
    }
    // 手机号校验
    const handlePhoneValidate=(e)=>{
        if(/^1(3|4|5|6|7|8|9)\d{9}$/.test(e.target.value)){
            setPhoneValid("");
        }else{
            setPhoneValid("号码格式不正确");
        }
    }
    // 邮箱校验
    const handleEmailValidate=(e)=>{
        if(/[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/.test(e.target.value)){
            setEmailValid("");
        }else{
            setEmailValid("邮箱格式不正确");
        }
    }


    return (
        <>
            <Drawer
                title="修改用户数据"
                width={720}
                onClose={onClose}
                closeIcon={<LeftOutlined />}
                visible={visible}
                // 强制渲染，解决form使用的问题出现
                forceRender
                bodyStyle={{
                    
                }}
                extra={
                    <Space>
                    <Button onClick={onClose}>取消</Button>
                    <Button onClick={onSubmitBtn} type="primary">
                        提交
                    </Button>
                    </Space>
                }
                >
                <Form id='add-form' layout="vertical" form={form}>
                        {/* initialValues={{account:updateObj.acc,password:"123456",gender:updateObj.gender,authority:updateObj.authority,phone:updateObj.phone,email:updateObj.email,sign:"每个人的一生都是一次远行"}}> */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="account"
                                label="账户"
                                value="11"
                                rules={[
                                    {
                                    required: true,
                                    message: '请输入账户名',
                                    },
                                ]}
                                >
                                <Input placeholder="请输入账户名"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="password"
                                label={
                                    <span>
                                        密码&nbsp;&nbsp;&nbsp;
                                        <span style={{color:"#1896ff",fontSize:"13px"}}>
                                            密码强度：
                                            <span style={{color:"red",fontWeight:"bold"}}>
                                                {passStrength}
                                            </span>
                                        </span>
                                    </span>
                                }
                                rules={[
                                    {
                                    required: true,
                                    message: '请输入密码',
                                    },
                                ]} >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="请输入密码"
                                    onChange={handlePassValidate}
                                    type='password'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={12}>
                            <Form.Item
                                name="gender"
                                label="性别"
                                rules={[
                                    {
                                    required: false,
                                    message: '请选择性别',
                                    },
                                ]} >
                                <Select placeholder="请选择">
                                    <Option value="1">男</Option>
                                    <Option value="0">女</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="authority"
                                label="权限"
                                rules={[
                                    {
                                    required: false,
                                    message: '请选择用户权限',
                                    },
                                ]}>
                                <Select placeholder="请选择">
                                    <Option value="0">普通用户</Option>
                                    <Option value="1">管理员</Option>
                                    <Option value="2">超级管理员</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label={
                                    <span>
                                        电话&nbsp;&nbsp;&nbsp;
                                        <span style={{color:"red",fontSize:"13px",fontWeight:"bold"}}>
                                            {phoneValid}
                                        </span>
                                    </span>
                                }
                                rules={[
                                    {
                                    required: false,
                                    message: '请输入手机或电话号码',
                                    },
                                ]}>
                                <Input onChange={handlePhoneValidate} placeholder="请输入手机或电话号码" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label={
                                    <span>
                                        邮箱&nbsp;&nbsp;&nbsp;
                                        <span style={{color:"red",fontSize:"13px",fontWeight:"bold"}}>
                                            {emailValid}
                                        </span>
                                    </span>
                                }
                                rules={[
                                    {
                                    required: false,
                                    message: '请输入邮箱',
                                    },
                                ]}
                                >
                                <Input onChange={handleEmailValidate} placeholder="请输入邮箱" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="extendMenu"
                                label="拓展菜单"
                                rules={[
                                    {
                                    required: false,
                                    message: '请选择拓展菜单',
                                    },
                                ]}
                                >
                                <MultiSelectTag selectList={extendMenuList} setData={setCustomMenu} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="sign"
                                label="用户签名"
                                rules={[
                                    {
                                    required: false,
                                    message: '请输入用户签名',
                                    },
                                ]}
                                >
                                <Input.TextArea rows={4} placeholder="在这输入用户签名" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default UpdateUser;