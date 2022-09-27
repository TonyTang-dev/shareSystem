import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import $ from 'jquery';

import '../../css/register.css';
import Comfirm from '../modal/Comfirm';


/* 登录面板 */
function RegisterPanel(){
    const [time, setTime] = useState("早上好！");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

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
        // if(userName === ""){
        //     setAccountPass();
        // }

        // 启动定时器15分钟后再检查一遍是否发生变化
        setTimeout(setTime(greetText), 1000*60*15);
    }, [time]); //只当time发生变化的时候修改


    // 路由跳转组建
    const Navigate = useNavigate();


    // 挂载完毕,设置账户密码
    function setAccountPass(){
        // let cacheObj = JSON.parse(localStorage.getItem("userInformation"));
        // if(! cacheObj){
        //     return;
        // }
        
        // setUserName(cacheObj.userName);
        // setPassword(cacheObj.pass);
    }

    // 密码强度提示文本
    let initPassTip = "弱";
    const [passStrength, setPassStrength] = useState(initPassTip);

    // 密码强度校验
    const handlePassValidate=(e)=>{
        // 设置密码框内容
        setPassword(e.target.value);
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


    // 点击注册
    function register(){
        // 用于确认框的回调函数
        const OK=()=>{

        }

        if(passStrength === "密码过于简单,建议6位以上数字、字母组合"){
            Comfirm({"text":"密码过于简单,建议6位以上数字、字母组合","resultOK":OK});
            return;
        }
        $.ajax({
            url: "/shareArticle/user/register.map",
            dataType: 'json',
            cache: false,
            data: {
                "acc": userName,
                "pass": password
            },
            contentType:"application/json;charset=utf-8",
            success: (result)=>{
                console.log("register\n"+JSON.stringify(result));

                if(result.register === "true"){
                    setUserName("");
                    setPassword("");

                    Navigate(result.forward);
                }else{
                    console.log("注册失败");
                }
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    }

    // 游客登录
    function registerByPhone(){
        alert("暂未实现，正维护中...");
    }


    return(
        <div className='register-panel-content'>
            <div className='register-panel-left'>
                <div className='greet'>
                    <span>注册生活，开启世界</span>
                </div>
                <div style={{textAlign:"center",color:"white",fontWeight:"bold"}}>
                    <span style={{fontSize:'18px'}}>A Warm Journey</span>
                    <br />
                    <span style={{fontSize:"24px"}}>每个人的一生都是一次远行</span>
                </div>
            </div>
            <div className='register-panel'>
                <div className='greet'>
                    <span>{time}</span>&nbsp;&nbsp;<span>欢迎注册</span>
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
                            onChange={(e)=>handlePassValidate(e)} type='password' placeholder='请输入密码' />
                        </div>
                        <span style={{color:"white",fontSize:"13px"}}>
                            密码强度：
                            <span style={{color:"red",fontWeight:"bold"}}>
                                {passStrength}
                            </span>
                        </span>
                    </div>
                </div>
                <div className='login-btn-wrap'>
                    <button className='m_btn login-panel-btn' onClick={()=>{window.location.href="/login"}}>取消</button>
                    <button id='login-btn' className='m_btn' onClick={register}>注册
                    </button>
                </div>
                <div className='other-btn-wrap'>
                    <button className='m_btn login-panel-btn'>邮箱注册</button>
                    <button className='m_btn login-panel-btn'
                        onClick={registerByPhone}
                        >手机注册</button>
                </div>
            </div>
        </div>
    );
}


// 导出
export {RegisterPanel};