import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import {Modal, Input, Form, Row, Col, Spin} from "antd";

import $ from 'jquery';
import Comfirm from '../modal/Comfirm';


/* 登录面板 */
function LoginPanel(){
    const [time, setTime] = useState("早上好！");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [remPassCheckBox, setRemPassCheckBox] = useState(true);

    // setTime(greetText);

    // 每当出现更新、初次挂载完成都会触发
    useEffect(() =>{
        var greetText = "";
        let hour = (new Date()).getHours();
        if(hour >= 0 && hour <= 12){
            greetText = "早上好!";
        }else if(hour > 12 && hour <= 18){
            greetText = "下午好!";
        }else{
            greetText = "晚上好!";
        }

        // 设置账户密码（缓存）
        if(userName === ""){
            setAccountPass();
        }

        // 启动定时器15分钟后再检查一遍是否发生变化
        setTimeout(setTime(greetText), 1000*60*15);
    }, [time]); //只当time发生变化的时候修改


    // 路由跳转组建
    const Navigate = useNavigate();

    // 记住密码选项框的设置
    const changeRemPassStatus = ()=>{
        setRemPassCheckBox(!remPassCheckBox);
    }

    // 挂载完毕,设置账户密码
    function setAccountPass(){
        let cacheObj = JSON.parse(localStorage.getItem("userInformation"));
        if(! cacheObj){
            return;
        }
        
        setUserName(cacheObj.userName);
        setPassword(String(cacheObj.pass));
    }

    // 忘记密码验证模态框显示与隐藏
    const [forgetModalVisible, setForgetModalVisible] = useState(false);

    // 钩子
    const [form] = Form.useForm();

    // 初始密码（重置后）
    const [initPass, setInitPass] = useState("");

    const handleOk = () => {
        // console.log(form.getFieldsValue());
        // 输入结果
        let obj = form.getFieldsValue();
        // setForgetModalVisible(false);

        if(obj.acc==="" || obj.token==="" || obj.acc===undefined || obj.token===undefined){
            Comfirm({"text":"申请认证的账户和密钥不能为空！","resultOK":()=>{}});
            return;
        }
        // 发出请求
        $.ajax({
            url:"/shareArticle/user/forgetPass.map",
            method:"POST",
            cache:false,
            dataType:"json",
            contentType:"application/x-www-form-urlencoded;charset=UTF-8",
            data:obj,
            success:(result)=>{
                if(result.success){
                    if(result.data === ""){
                        Comfirm({"text":"验证失败，请重试！","resultOK":()=>{}});
                        return;
                    }
                    // 显示结果面板
                    $("#tokenValidateResult").fadeIn(200);
                    // 设置初始密码
                    setInitPass(result.data);
                }
            },
            error:(err)=>{
                Comfirm({"text":"密钥无效，验证失败，请重试！","resultOK":()=>{}});
            }
        })
    };

    const handleCancel = () => {
        setForgetModalVisible(false);
        $("#tokenValidateResult").fadeOut(200);
    };

    // 忘记密码
    const forgetPassword=()=>{
        setForgetModalVisible(true);
    }


    // 点击登录
    function login(userName, password){
        // 先显示加载界面
        $("#loginLoading").css("display","flex");

        $.ajax({
            url: "/shareArticle/user/login.map",
            dataType: 'json',
            cache: false,
            timeout:5000,
            data: {
                "acc": userName,
                "pass": String(password)
            },
            contentType:"application/json;charset=utf-8",
            success: (result)=>{
                // console.log("login\n"+JSON.stringify(result));

                if(result.login == "true"){
                    // 如果是记住密码则将帐号密码缓存到浏览器，否则清空帐号密码
                    if(remPassCheckBox){
                        localStorage.setItem("userInformation",JSON.stringify({"userName":userName,"pass":String(password),"token":"001"}));
                    }else{
                        localStorage.removeItem("userInformation");
                        setRemPassCheckBox(false);
                    }

                    setUserName("");
                    setPassword("");

                    // 登录成功，隐藏
                    setTimeout(()=>{
                        $("#loginLoading").css("display","none");
                        Navigate(result.forward);
                    },1500);
                }else{
                    $("#loginLoading").css("display","none");
                    setTimeout(
                        Comfirm({"text":"登录失败,帐号密码错误","resultOK":()=>{}}),1000
                    );
                }
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                Comfirm({"text":"登录失败,获取服务器数据失败","resultOK":()=>{}});
                $("#loginLoading").css("display","none");
            }
        });
    }

    // 游客登录
    function visitorLogin(){
        Navigate("/home");
    }


    return(
        <div className='login-panel'>
            <div className='greet'>
                <span>{time}</span>&nbsp;&nbsp;<span>欢迎登录</span>
                <hr/>
            </div>
            <div className='input-wrap'>
                <div style={{display:"grid"}}>
                    <div className='input-box-wrap'>
                        <img src={require("../../img/account_white.png")} width="24" height="24" alt='账户'/>
                        <input className='login-input-component' value={userName}
                            onChange={(e)=>setUserName(e.target.value)} type='text' placeholder='请输入用户名' />
                    </div>
                </div>
                <br/>
                <div style={{display:"grid"}}>
                    <div className='input-box-wrap'>
                        <img src={require("../../img/password_white.png")} width="24" height="24" alt='账户'/>
                        <input className='login-input-component' value={password}
                        onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='请输入密码' />
                    </div>
                </div>
            </div>
            <div style={{marginLeft:"50px",height:"30px",fontSize:"14px",userSelect:"none",color:"white"}}>
                <input className='login-checkBox-component' checked={remPassCheckBox}
                    onChange={changeRemPassStatus} type="checkBox" id='remPass' />
                <label htmlFor="remPass">记住密码？</label>
            </div>
            <div className='login-btn-wrap'>
                <button className='login-panel-btn m_btn' onClick={()=>{window.location.href="/register"}}>注册</button>
                <button id='login-btn' className='m_btn' onClick={()=>{
                    // window.location.href="/comment"
                    login(userName, password);
                    }}>登录
                </button>
            </div>
            <div className='other-btn-wrap'>
                <button className='login-panel-btn m_btn' onClick={forgetPassword}>忘记密码</button>
                <button className='login-panel-btn m_btn'
                    onClick={visitorLogin}
                    >游客登录</button>
            </div>

            {/* 忘记密码验证框 */}
            <Modal title="忘记密码" visible={forgetModalVisible} onOk={handleOk} 
                    onCancel={handleCancel} okText="提交" cancelText="取消" forceRender>
                <Form form={form} >
                    <Row gutter={16}>
                        <Col span={20}>
                            <Form.Item
                                label="账户"
                                name="acc"
                                rules={[
                                {
                                    required: true,
                                    message: '请输入你的账户名',
                                },
                                ]}
                                >
                                <Input placeholder="请输入你的账户名" />
                            </Form.Item>
                            <Form.Item
                                label="密钥"
                                name="token"
                                rules={[
                                {
                                    required: true,
                                    message: '请输入密钥以重置密码',
                                },
                                ]}
                                >
                                <Input placeholder="请输入密钥以重置密码" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <span id='tokenValidateResult' style={{display:"none",color:"red",fontSize:"14px"}}>申请成功，默认密码是(尽快修改)：{initPass}</span>
                </Form>
            </Modal>

            {/* 登录加载 */}
            <div id="loginLoading" style={{display:"none",background:"rgba(0,0,0,0.4)",
                    position:"absolute",width:"100%",height:"80vh",zIndex:"99",
                    alignItems:"center",justifyContent:"center"}}>
                <Spin size='large'/>
            </div>
        </div>
    );
}


// 导出
export {LoginPanel};