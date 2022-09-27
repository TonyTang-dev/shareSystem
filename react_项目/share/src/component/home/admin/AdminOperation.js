import { Input, Drawer } from 'antd';
import React, { useState } from 'react';
import AddUser from './AddUserDrawer';
import { Avatar, List } from 'antd';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';
import $ from "jquery";



const AdminOperation=(props)=>{
    // 语言
    const {lan, beRefresh, setRefreshList} = props;

    const [visible, setVisible] = useState(false);

    // 添加用户数据
    const [addUserVisible, setAddUserVisible] = useState(false);

    // 查看用户数据
    const [userInforVisible, setUserInforVisible] = useState(false);

    // 用户默认数据
    // 头像-账户-签名-性别-号码-邮箱-文章-评论-点赞-排名-权限
    const [userInfor, setUserInfor] = useState([null,"-","-","-","-","-","0","0","0","0","普通用户"])


    // 搜索用户的搜索框
    const {Search} = Input;


    // 默认抽屉
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    // 查看用户数据的侧边面板
    const onUserInforClose=()=>{
        setUserInforVisible(false);
    }

    /* 添加用户的抽屉 */
    const openAddUserDrawer=()=>{
        setAddUserVisible(true);
    }


    // 搜索用户
    const onSearch=(value)=>{
        if(value === ""){
            alert("请先输入用户名再查询哟！");
            return;
        }
        $.ajax({
            url:"/shareArticle/user/queryUserByName.map",
            method:"POST",
            dataType:"json",
            data:{
                "token":"001",
                "account":value
            },
            contentType:"application/x-www-form-urlencoded; charset=utf-8",
            cache:false,
            success:(result)=>{
                console.log(result);
                if(result[0].success === "true" && result.length===2 && result[1] != null){
                    let obj = [];
                    obj.push(result[1].avatar);
                    obj.push(result[1].acc);
                    obj.push(result[1].sign);
                    obj.push(result[1].gender);
                    obj.push(result[1].phone);
                    obj.push(result[1].email);
                    obj.push(result[1].articleNum);
                    obj.push(result[1].comment);
                    obj.push(result[1].beLiked);
                    obj.push(result[1].ranking);
                    obj.push(result[1].authority);


                    // 更新面板数据
                    setUserInfor(obj);

                    // 拉出侧边栏
                    setUserInforVisible(true);
                }else{
                    alert("查询出错了，请查找原因");    
                }
            },
            error:(err)=>{
                alert("查询出错了，请查找原因");
            }
        });
    }

    // 用户数据前缀
    const userDataPrefix = ["性别:","电话:","邮箱:","文章:","评论:","点赞:","排名:","权限:"];


    return (
        <div className="admin-ope-wrap">
            <table width="100%" height="100%">
                <tbody width="100%" height="100%">
                    <tr>
                        <td colSpan={2}>
                            <Search
                                placeholder="通过用户名查询用户"
                                allowClear
                                enterButton="搜索"
                                size="middle"
                                onSearch={onSearch}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="admin-api-card-td" align="center">
                            <div className="admin-api-card" onClick={openAddUserDrawer} style={{backgroundImage:"linear-gradient(to right, #81ffef, #2376dd)"}}>
                                {lan.get("addUser")}
                            </div>
                        </td>
                        <td className="admin-api-card-td">
                            <div className="admin-api-card" onClick={showDrawer} style={{backgroundImage:"linear-gradient(to right, #81ffef, #2376dd)"}}>
                                {lan.get("queryUser")}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="admin-api-card-td">
                            <div className="admin-api-card" onClick={showDrawer} style={{backgroundImage:"linear-gradient(to right, #81ffef, #2376dd)"}}>
                                {lan.get("addArticleType")}
                            </div>
                        </td>
                        <td className="admin-api-card-td">
                            <div className="admin-api-card" onClick={showDrawer} style={{backgroundImage:"linear-gradient(to right, #81ffef, #2376dd)"}}>
                                {lan.get("publishNotice")}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="admin-api-card-td">
                            <div className="admin-api-card" onClick={showDrawer} style={{backgroundImage:"linear-gradient(to right, #81ffef, #2376dd)"}}>
                                {lan.get("sysEquipment")}
                            </div>
                        </td>
                        <td className="admin-api-card-td">
                            <div className="admin-api-card" onMouseOver={showDrawer} style={{backgroundImage:"linear-gradient(to right, #81ffef, #2376dd)"}}>
                                {lan.get("feedbackDealing")}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* 抽屉 */}
            <Drawer title="右侧菜单" placement="right" onClose={onClose} visible={visible}>
                <p>输入栏</p>
                <p>contents...</p>
                <p>Some contents...</p>
            </Drawer>
            <Drawer title="用户信息" placement="right" closeIcon={<LeftOutlined />}
                     onClose={onUserInforClose} visible={userInforVisible}>
                <>
                    <List
                        header={
                            <List.Item style={{backgroundColor:"rgba(255,85,0,0.2)",borderRadius:"5px"}}>
                                <List.Item.Meta
                                    avatar={<Avatar size="large" src={userInfor[0]|| <UserOutlined />} style={{boxShadow:"0 3px 5px 0 grey"}} />}
                                    title={<a>{userInfor[1]}</a>}
                                    description={userInfor[2]}
                                />
                            </List.Item>}  
                        bordered
                        dataSource={userInfor.slice(3)}
                        renderItem={(item, index) => (
                            <List.Item>
                                {userDataPrefix[index]}{item}
                            </List.Item>
                        )}
                    />
                </>
            </Drawer>
            <AddUser visible={addUserVisible} setVisible={setAddUserVisible} beRefresh={beRefresh} setRefreshList={setRefreshList} />
        </div>
    );
}

export default AdminOperation;