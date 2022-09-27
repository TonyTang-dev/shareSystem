import React, { useEffect, useState } from 'react';

import AdminSysCard from '../admin/AdminSysCard';
import PersonRatioCard from "../admin/PersonRatioCard";
import AdminOperation from '../admin/AdminOperation';
import UserList from '../admin/UserList';

import $ from "jquery";


const Console = (props)=>{
    // 主题
    const  {lan, ComponentTheme, bodyTheme, fontTheme} = props;

    // 是否刷新用户列表
    const [refreshList, setRefreshList] = useState(true);

    // 用户管理面板基本数据
    const [manageBasic, setManageBasic] = useState({
        totalUser:0,
        totalArticle:0,
        dayRegister:0,
        dayAccess:0,
        commonUser:0,
        commonAdmin:0,
        superAdmin:0
    })

    const getData=()=>{
        // 用户信息cookie值
		let userObj = {};
		for(let i of document.cookie.split(/;\s+/)){
			userObj[i.split("=")[0]] = i.split("=")[1];
		}
        console.log(userObj);

        $.ajax({
            url:"/shareArticle/init/manageBasic.map",
            method:"GET",
            dataType:"json",
            cache:false,
            contentType:"application/json;charset=UTF-8",
            data:{
                acc:userObj.acc,
                token:userObj.token
            },
            success:(result)=>{
                // 设置数据
                if(result.success){
                    setManageBasic(result.data);
                }
            },
            error:(err)=>{
                alert("获取管理面板数据发生错误");
            }
        })
    }

    // 数据仅加载一次
    useEffect(()=>{
        getData();
    },[])


    return (
        <table className='content-table' align='center' style={{backgroundColor:bodyTheme, color:fontTheme}}>
            <tbody align='center'>
                <tr className='home-panel-content-row-admin'>
                    <td><AdminSysCard manageBasic={manageBasic} lan={lan} theme={ComponentTheme} /></td>
                    <td><PersonRatioCard manageBasic={manageBasic} lan={lan} theme={ComponentTheme} fontTheme={fontTheme} /></td>
                    <td rowSpan='2' className='rank-list-table-wrap' style={{backgroundColor:ComponentTheme,color:fontTheme}}>
                        <AdminOperation lan={lan} beRefresh={refreshList} setRefreshList={setRefreshList} />
                    </td>
                </tr>
                <tr className='home-panel-content-row-admin'>
                    <td colSpan='2'>
                        <div className='user-list-wrap scroll-bar'>
                            <UserList lan={lan} theme={ComponentTheme} fontTheme={fontTheme} beRefresh={refreshList} setRefreshList={setRefreshList}/>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Console;