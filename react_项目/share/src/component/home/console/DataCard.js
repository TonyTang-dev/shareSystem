import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Drawer, List } from "antd";
import React, { useState } from "react";
import AdBanner from "../../banner/AdBanner";


const DataCard = (props)=>{
    const {user, lan, theme} = props;

    // 用户数据前缀
    const userDataPrefix = ["性别:","电话:","邮箱:","文章:","评论:","点赞:","排名:","权限:"];
    // 用户数据下标签
    const userDataIndex = ['gender',"phone","email",'articleNum','comment','beLiked','ranking','authority'];

    // 我的数据抽屉面板
    const [myInforVisible, setMyInforVisible] = useState(false);

    // 打开查看我的资料的侧边面板
    const showMyInfor=()=>{
        setMyInforVisible(true);
    }

    // 关闭查看我的资料的侧边面板
    const onMyInforClose=()=>{
        setMyInforVisible(false);
    }

    return (
        <div className="data-card-content">
            <table>
                <tbody>
                    <tr className="aa">
                        <td colSpan="2" height="50%" className="bgCard" align="center">
                            {/* <img src={require("../../../img/loginbg_login.png")} alt="加载失败" /> */}
                            <AdBanner style={{width:"22.5vh",height:"22.5vh"}} />
                        </td>
                    </tr>
                    <tr className="ele-row">
                        <td className="api-card" align="center" style={{border:"1px solid",borderWidth:"0 2px 0px 0px", 
                                    borderColor:"grey",cursor:"pointer",backgroundColor:theme}}>
                            <span>{lan.get("articleNum")}</span>
                            <br/>
                            <span className="statistic-text">{user.articleNum}{lan.get("piece")}</span>
                        </td>
                        <td className="api-card" align="center" style={{cursor:"pointer",backgroundColor:theme}}>
                            <span>{lan.get("commentNum")}</span>
                            <br/>
                            <span className="statistic-text">{user.comment}{lan.get("commentPiece")}</span>
                        </td>
                    </tr>
                    <tr height="1px" style={{backgroundColor:"grey"}}>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr className="ele-row">
                        <td className="api-card" align="center" style={{border:"1px solid",borderWidth:"0 2px 0px 0px", 
                                    borderColor:"grey",cursor:"pointer",backgroundColor:theme}}>
                            <span>{lan.get("pointCount")}</span>
                            <br/>
                            <span className="statistic-text">1005{lan.get("star")}</span>
                        </td>
                        <td className="api-card" align="center" 
                                style={{cursor:"pointer",backgroundColor:theme}} onClick={showMyInfor}>
                            <span>{lan.get("myData")}</span>
                            <br/>
                            <span className="statistic-text">{user.acc}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* 我的数据 */}
            <Drawer title="我的资料" placement="right" closeIcon={<LeftOutlined />}
                     onClose={onMyInforClose} visible={myInforVisible}>
                <>
                    <List
                        header={
                            <List.Item style={{backgroundColor:"rgba(255,85,0,0.2)",borderRadius:"5px"}}>
                                <List.Item.Meta
                                    avatar={<Avatar size="large" src={user.avatar|| <UserOutlined />} style={{boxShadow:"0 3px 5px 0 grey"}} />}
                                    title={<a>{user.acc}</a>}
                                    description={user.sign}
                                />
                            </List.Item>}  
                        bordered
                        dataSource={userDataPrefix}
                        renderItem={(item, index) => (
                            <List.Item>
                                {item}{user[userDataIndex[index]]}
                            </List.Item>
                        )}
                    />
                </>
            </Drawer>
        </div>
    );
}



export default DataCard;