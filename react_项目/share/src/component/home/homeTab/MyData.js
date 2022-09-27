import React from "react";

// import { Col, Row } from 'antd';
import { CreditCardOutlined, PlusOutlined, QuestionCircleOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";


const MyData=(props)=>{
    // 主题
    const {user, bodyTheme, ComponentTheme,fontTheme} = props;

    return (
        <div className='content-table' align='center' style={{backgroundColor:bodyTheme,color:fontTheme}}>
            <table width="100%" height="100%" align='center'>
                <tbody className="myData-content" width="100%" height="100%" align='center'>
                    <tr>
                        <td className="mydata-left-panel">
                            <div className="data-card-wrap" style={{backgroundColor:ComponentTheme}}>
                                <div style={{fontSize:"18px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:"0 20px 0 20px"}}>
                                    <UserAddOutlined />
                                    <span>账户信息</span>
                                </div>
                                <hr />
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="data-detail-wrap">
                                                    <span>我的账户：{user.acc}</span>
                                                </div>
                                                <div className="data-detail-wrap">
                                                    <span>手机号码：{user.phone}</span>
                                                </div>
                                                <div className="data-detail-wrap">
                                                    <span>实名认证：{user.acc}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="data-detail-wrap">
                                                    <span>我的密码：{user.pass}</span>
                                                </div>
                                                <div className="data-detail-wrap">
                                                    <span>电子邮件：{user.email}</span>
                                                </div>
                                                <div className="data-detail-wrap">
                                                    <span>用户权限：{user.authority==="0"?"普通用户":user.authority==="1"?"管理员":"超级管理员"}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                        <td rowSpan="3" className="mydata-right-panel">
                            <div className="data-card-wrap" style={{backgroundColor:ComponentTheme}}>
                                <div className="mine-data-header">
                                    <img src={require("../../../img/loginbg_login.png")} alt="个人页面" />
                                </div>
                                <div className="mine-data-component">
                                    <Avatar size='large' style={{ backgroundColor: '#87d068',boxShadow:"0 3px 5px 0 grey"}} 
                                        src={user.avatar || <UserOutlined />} />
                                    <div style={{textAlign:"left"}}>
                                        <span style={{fontSize:'16px',fontWeight:'bold',color:"white"}}>{user.acc}</span>
                                        <br />
                                        <span style={{fontSize:"14px",color:"grey"}}>{user.sign}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="mydata-left-panel">
                            <div className="data-card-wrap scroll-bar" style={{backgroundColor:ComponentTheme}}>
                                <div style={{fontSize:"18px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:"0 20px 0 20px"}}>
                                    <CreditCardOutlined />
                                    <span>读者卡片</span>
                                </div>
                                <hr />
                                <div className="read-card-wrap" style={{fontSize:"16px",color:"white"}}>
                                    <div className="read-card-item">
                                        <div style={{padding:"20px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                            <UserAddOutlined />
                                            <span>阅读卡</span>
                                        </div>
                                        <span>****** 0123</span>
                                    </div>
                                    <div className="read-card-item">
                                        <div style={{padding:"20px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                            <UserAddOutlined />
                                            <span>进阶卡</span>
                                        </div>
                                        <span>****** 4563</span>
                                    </div>
                                    <div className="read-card-item add-card">
                                        <PlusOutlined />
                                        <div style={{fontSize:"16px"}}>添加新卡</div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="mydata-left-panel">
                            <div className="data-card-wrap" style={{backgroundColor:ComponentTheme}}>
                                <div style={{fontSize:"18px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:"0 20px 0 20px"}}>
                                    <QuestionCircleOutlined />
                                    <span>常见问题</span>
                                </div>
                                <hr />
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <ol className="question-detail-wrap">
                                                    <li>怎么修改密码？</li>
                                                    <li>怎么实名认证？</li>
                                                    <li>怎么修改号码？</li>
                                                </ol>
                                            </td>
                                            <td>
                                                <ol className="question-detail-wrap">
                                                    <li>文章能撤销吗？</li>
                                                    <li>如何删除评论？</li>
                                                    <li>如何修改系统配置？</li>
                                                </ol>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}



export default MyData;