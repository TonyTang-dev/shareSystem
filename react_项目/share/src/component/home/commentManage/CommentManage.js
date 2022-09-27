import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Comment} from 'antd';
import React, { useEffect, useState } from 'react';

import {Modal } from 'antd';

import $ from "jquery";
const CommentManage = (props) => {
    // 主题
    const {userData, bodyTheme, fontTheme} = props;

    // 本页面的主题色
    const [curTheme, setCurTheme] = useState("white");

    // 评论列表
    const [commentList, setCommentList] = useState([]);

    // 界面主题重刷新
    useEffect(()=>{
        setCurTheme(bodyTheme==="#001529"?bodyTheme:"white");
    },[bodyTheme]);


    /* 获取评论 */
    const getArticleComment=()=>{
        $.ajax({
            url:'/shareArticle/article/allComment.map',
            method:"GET",
            cache:false,
            dataType:"json",
            contentType:"application/json;charset=UTF-8",
            data:{
                
            },
            success:(result)=>{
                if(result.success){
                    // 为了使用文章的ID，将其赋值为根源
                    setCommentList(result.data);
                }
            },
            error:(err)=>{
                console.log(err);
                alert("加载评论失败");
            }
        });
    }

    // 根据文章ID删除文章
    const deleteByCommentId=(commentKey)=>{
        if(commentKey === undefined || commentKey === null){
            alert("请先选中需要删除的文章哟！");
            return;
        }
        const OK=()=>{
            $.ajax({
                url:"/shareArticle/article/deleteComment.map",
                method:"POST",
                dataType:"json",
                contentType:"application/x-www-form-urlencoded;charset=UTF-8",
                cache:false,
                data:{
                    commentKey: commentKey
                },
                success:(result)=>{
                    // console.log(result);
                    if(result.success){
                        // 刷新评论列表
                        getArticleComment();
                    }else{
                        alert("评论删除失败");    
                    }
                },
                error:(err)=>{
                    alert("评论删除失败");
                    console.log(err);
                }
            });
        }
    
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: "确认要删除此评论吗？",
            okText: '确认',
            cancelText: '取消',
            onOk:OK,
        });
    }

    // 刷新当前评论
    const refreshCurComment=()=>{
        getArticleComment();
    }

    useEffect(()=>{
        getArticleComment();
    },[]);

    const IconText = ({item, keyindex, icon, text, fontcolor}) => (
        <Space style={{color:fontcolor==="black"?'grey':fontcolor}} className="article-ope" >
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <div style={{backgroundColor:bodyTheme, minHeight:"90vh",color:fontTheme}}>
            <List
                itemLayout="horizontal"
                dataSource={commentList}
                renderItem={(item) => (
                    <>
                        <List.Item 
                            style={{margin:"0",paddingLeft:"20px"}}>
                            <Comment
                                // actions={[<span key="comment-nested-reply-to">回复</span>]}
                                author={
                                        <span>
                                            <a>{item.linkUser}</a> 
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <a style={{color:"red"}} onClick={()=>deleteByCommentId(item.key)}>删除</a>
                                        </span>
                                    }
                                avatar={<Avatar src={item.avatar} alt="avatar" style={{boxShadow:"-2px 0px 5px 0 #fff"}}/>}
                                content={
                                    <p style={{color:fontTheme}}>{item.commentContent}</p>
                                }
                                >
                            </Comment>
                        </List.Item>
                        <hr style={{margin:"0"}}/>
                    </>
                )}
            />
        </div>
    );
}

export default CommentManage;