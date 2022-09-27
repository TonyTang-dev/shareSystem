import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

import $ from "jquery";
import Comfirm from '../../modal/Comfirm';
import UpdateUser from './UpdateUser';



const UserList = (props) => {
    // 语言
    const {lan, theme, beRefresh, setRefreshList} = props;

    // 所有用户数据源
    const [userData, setUserData] = useState([]);

    // 修改用户面板可见性
    const [updatePanelVisible, setUpdatePanelVisible] = useState(false);
    // 待修改数据
    const [updateObj, setUpdateObj] = useState({
        key:'-',
        acc:'-',
        gender:'-',
        phone:'-',
        email:'-',
        articleNum:'-',
        beLiked:'-',
        comment:'-',
        ranking:'-',
        authority:'-',
        sign:"",
        extendMenu:""
    });

    // 获取数据源
    const getData=()=>{
        let tempData = [];
        $.ajax({
            url: "/shareArticle/user/alluser.map",
            dataType: 'json',
            cache: false,
            data: {
                "token":"001"
            },
            contentType:"application/json;charset=utf-8",
            success: (result)=>{
                if(result[0].authority == "true"){
					// 当前用户的数据
                    // console.log(result[1]);
                    result[1].map((item,index)=>{
                        tempData.push({
                            key:item.id,
                            acc:item.acc,
                            gender:item.gender,
                            phone:item.phone,
                            email:item.email,
                            articleNum:item.articleNum,
                            beLiked:item.beLiked,
                            comment:item.comment,
                            ranking:item.ranking,
                            authority:item.authority,
                            sign:item.sign,
                            extendMenu:item.extendMenu
                        });
                    });

                    //设置数据源
                    setUserData(tempData);
                }else{
                    alert("获取排行榜失败");
                }
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    }

    useEffect(()=>{
        getData();
    },[beRefresh]);


    // 根据用户ID删除数据，支持批量删除
    const deleteUserById=(idList)=>{
        $.ajax({
            url:"/shareArticle/user/deleteuser.map",
            type:"POST",
            dataType:"json",
            contentType:"application/x-www-form-urlencoded; charset=utf-8",
            cache:"false",
            data:{
                "token":"001",
                "idList":JSON.stringify(idList)
            },
            success: (result)=>{
                // console.log(result);
                if(result.success === "true"){
                    // 刷新表格
                    setRefreshList(!beRefresh);
                }
            },
            error:(err)=>{
                alert("删除用户数据失败");
            }
        })
    }



    // 修改用户数据
    const handleUpdateRow=(obj)=>{
        // console.log(obj);

        // 拉出修改用户右侧弹窗
        setUpdateObj(obj);
        setUpdatePanelVisible(true);
    }

    // 删除当前行数据
    const handleDeleteRow=(deleteId)=>{
        // 调用删除函数向服务器发出删除请求
        Comfirm({text:"确认要删除选中数据吗?",resultOK: ()=>deleteUserById(deleteId)});
    }


    const columns = [
        {
            title: lan.get("userList_10"),
            key: 'action',
            align:'center',
            dataIndex: "key",
            width:"10em",
            render: (_, record, key) => (
                <Space size="middle">
                    <a onClick={()=>handleUpdateRow(record)}>修改</a>
                    <a onClick={()=>handleDeleteRow(record.key)}>删除</a>
                </Space>
            ),
        },
        {
            title: lan.get("userList_1"),
            dataIndex: 'acc',
            key: 'acc',
            align:'center',
            width:"10em",
            render: (text) => <a>{text}</a>,
        },
        {
            title: lan.get("userList_2"),
            dataIndex: 'gender',
            key: 'gender',
            align:'center',
            width:"9em",
            render:(gender)=>{
                return gender==="1"?"男":"女";
            }
        },
        {
            title: lan.get("userList_3"),
            dataIndex: 'phone',
            key: 'phone',
            align:'center',
            width:"9em",
        },
        {
            title: lan.get("userList_4"),
            dataIndex: 'email',
            key: 'email',
            align:'center',
            width:"9em",
        },
        {
            title: lan.get("userList_5"),
            dataIndex: 'articleNum',
            key: 'articleNum',
            align:'center',
            width:"9em",
        },
        {
            title: lan.get("userList_6"),
            dataIndex: 'beLiked',
            key: 'beLiked',
            align:'center',
            width:"9em",
        },
        {
            title: lan.get("userList_7"),
            dataIndex: 'comment',
            key: 'comment',
            align:'center',
            width:"8em",
        },
        {
            title: lan.get("userList_8"),
            dataIndex: 'ranking',
            key: 'ranking',
            align:'center',
            width:"8em",
        },{
            title: lan.get("userList_9"),
            key: 'authority',
            dataIndex: 'authority',
            align:'center',
            width:"10em",
            render: (authority)=>{
                    let color = "blue";
                    if(authority==="1" || authority==="2"){
                        color = "pink";   
                    }
                    return (
                        <Tag color={color} key={authority}>
                            {authority==="1"?"admin":authority==="2"?"superadmin":"customer"}
                        </Tag>
                    );
            }
        },
        {
            title: lan.get("userList_11"),
            dataIndex: 'sign',
            key: 'sign',
            align:'center',
            width:0,
            ellipsis:true
        },
        {
            title: lan.get("userList_11"),
            dataIndex: 'extendMenu',
            key: 'extendMenu',
            align:'center',
            width:0,
            ellipsis:true
        }
    ];
    return(
        <div style={{width:"59vw",overflowX:"auto"}} className="scroll-bar">
            <Table scroll={{x:"70vw"}} className="scroll-bar" columns={columns} dataSource={userData} pagination={{pageSize:50}} />
            <UpdateUser updateObj={updateObj} setUpdateObj={setUpdateObj} visible={updatePanelVisible} setVisible={setUpdatePanelVisible} beRefresh={beRefresh} setRefreshList={setRefreshList} />
        </div>
    );
}

export default UserList;