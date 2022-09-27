import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Comment, Button, Image} from 'antd';
import React, { useEffect, useState } from 'react';

import {Modal } from 'antd';

import $ from "jquery";
const FileManage = (props) => {
    // 主题
    const {userData, bodyTheme, fontTheme} = props;

    // 本页面的主题色
    const [curTheme, setCurTheme] = useState("white");

    // 文件列表
    const [coverData, setCoverData] = useState([]);

    // 界面主题重刷新
    useEffect(()=>{
        setCurTheme(bodyTheme==="#001529"?bodyTheme:"white");
    },[bodyTheme]);


    const showHistoryCoverModal = () => {
        // 发出请求，获取到所有图片路径
        $.ajax({
            url:"/shareArticle/file/coverList.map",
            method:"GET",
            cache:false,
            dataType:'json',
            contentType:'application/json;charset=UTF-8',
            data:{

            },
            success:(result)=>{
                if(result.success){
                    // 设置图片源
                    setCoverData(result.data);
                }
            },
            error:(err)=>{
                console.log(err);
            }
        })
    };

    // 根据文章ID删除文章
    const deleteCover=(item)=>{
        if(item === undefined || item === null || item===""){
            alert("请先选中需要删除的文章哟！");
            return;
        }
        const OK=()=>{
            $.ajax({
                url:"/shareArticle/file/deleteFile.map",
                method:"POST",
                dataType:"json",
                contentType:"application/x-www-form-urlencoded;charset=UTF-8",
                cache:false,
                data:{
                    deleteObj: item
                },
                success:(result)=>{
                    console.log(result);
                    if(result.success){
                        // 刷新图片列表
                        showHistoryCoverModal();
                    }else{
                        alert("图片删除失败");    
                    }
                },
                error:(err)=>{
                    alert("图片删除失败");
                    console.log(err);
                }
            });
        }
    
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: "确认要删除此文件吗？",
            okText: '确认',
            cancelText: '取消',
            onOk:OK,
        });
    }

    useEffect(()=>{
        showHistoryCoverModal();
    },[]);

    const IconText = ({item, keyindex, icon, text, fontcolor}) => (
        <Space style={{color:fontcolor==="black"?'grey':fontcolor}} className="article-ope" >
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <div style={{backgroundColor:bodyTheme, minHeight:"90vh",color:fontTheme}}>
            <div className='scroll-bar' style={{
                    height:"90vh",
                    overflow:"auto"
                }}>
                <List
                    dataSource={coverData}
                    renderItem={(item) => (
                        <List.Item style={{paddingLeft:"20px"}}>
                            <Image style={{width:"40vw",height:"100px",borderRadius:"10px",cursor:"pointer"}} src={item} alt="cover" />
                            <Button type='primary' style={{marginRight:"20px"}} onClick={()=>deleteCover(item)}>不合规-删除</Button>
                        </List.Item>
                    )}
                    />
            </div>
        </div>
    );
}

export default FileManage;