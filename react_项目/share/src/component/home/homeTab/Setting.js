import {ExclamationCircleOutlined, CodeSandboxCircleFilled, ExclamationCircleFilled, IdcardFilled, SkinFilled, SlackCircleFilled, SmileFilled } from "@ant-design/icons";
import React, {useState } from "react";
import {Modal} from "antd";
import AboutSys from "../../modal/AboutSys";
import AboutUs from "../../modal/AboutUs";




const Setting=(props)=>{
    // 父组件参数-主题语言等
    const {lan, language, bodyTheme, fontTheme, changeSkin, changeLocale} = props;

    // 关于系统模态框
    const [aboutSysModalVisible, setAboutSysModalVisible] = useState(false);
    // 关于我们模态框
    const [aboutUsModalVisible, setAboutUsModalVisible] = useState(false);

    // 更改主题
    const changeTheme=()=>{
        let index = bodyTheme==="#001529"?1:2;
        // 调用父组件的切换全局主题函数
        changeSkin(index);
    }
    // 切换语言
    const changeLanguage=()=>{
        let index = language==="en"?1:0;
        // 调用父组件函数
        changeLocale(index);
    }

    // 系统重置，现在主要是将主题默认为白色、语言默认为中文
    const resetSystem=()=>{
        const go=()=>{
            changeSkin(1);
            changeLocale(1);
        }
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '确认要恢复系统设置吗？',
            okText: '确认',
            cancelText: '取消',
            onOk:go
        });
    }

    // 系统信息展示（关于系统）
    const showSysInfor=()=>{
        setAboutSysModalVisible(true);
    }
    // 关于我们信息展示（关于我们）
    const showUsInfor=()=>{
        setAboutUsModalVisible(true);
    }


    return (
        <div className="setting-content">
            <img src={require("../../../img/loginbg_login.png")} alt="背景" />
            <table width="80%" height="80%">
                <tbody>
                    <tr height="50%" className="setting-row-wrap" align="center">
                        <td width="23%">
                            <div className="setting-item-wrap" onClick={changeTheme}>
                                <SkinFilled style={{fontSize:"32px",backgroundColor:"green",opacity:"0.7"}} />
                                <br />
                                <span>{lan.get("changeTheme")}</span>
                            </div>
                        </td>
                        <td width="23%">
                            <div className="setting-item-wrap" onClick={changeLanguage}>
                                <SlackCircleFilled style={{fontSize:"32px",backgroundColor:"green",opacity:"0.7"}} />
                                <br />
                                <span>{lan.get("changeLanguage")}</span>
                            </div>
                        </td>
                        <td width="23%">
                            <div className="setting-item-wrap">
                                <SlackCircleFilled style={{fontSize:"32px",backgroundColor:"green",opacity:"0.7"}} />
                                <br />
                                <span>待定</span>
                            </div>
                        </td>
                        <td width="23%">
                            <div className="setting-item-wrap">
                                <SlackCircleFilled style={{fontSize:"32px",backgroundColor:"green",opacity:"0.7"}} />
                                <br />
                                <span>待定</span>
                            </div>
                        </td>
                    </tr>
                    <tr height="50%" className="setting-row-wrap" align="center">
                        <td width="23%">
                            <div className="setting-item-wrap">
                                <IdcardFilled style={{fontSize:"32px",backgroundColor:"green",opacity:"0.7"}} />
                                <br />
                                <span>{lan.get("modifyData")}</span>
                            </div>
                        </td>
                        <td width="23%">
                            <div className="setting-item-wrap" onClick={resetSystem}>
                                <ExclamationCircleFilled style={{fontSize:"32px",backgroundColor:"green",opacity:"0.7"}} />
                                <br />
                                <span>{lan.get("resetSystem")}</span>
                            </div>
                        </td>
                        <td width="23%">
                            <div className="setting-item-wrap" onClick={showSysInfor}>
                                <CodeSandboxCircleFilled style={{fontSize:"32px",backgroundColor:"green",opacity:"0.7"}} />
                                <br />
                                <span>{lan.get("aboutSys")}</span>
                            </div>
                        </td>
                        <td width="23%">
                            <div className="setting-item-wrap" onClick={showUsInfor}>
                                <SmileFilled style={{fontSize:"32px",backgroundColor:"green",opacity:"0.7"}} />
                                <br />
                                <span>{lan.get("aboutUs")}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <AboutSys visible={aboutSysModalVisible} setVisible={setAboutSysModalVisible} />
            <AboutUs visible={aboutUsModalVisible} setVisible={setAboutUsModalVisible} />
        </div>
    )
}


export default Setting;