import React,{useEffect, useState} from "react";
import {Avatar, List} from "antd";

import Editor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import $ from "jquery";



const ArticleDetail=()=>{
    // 修改页面标题
    document.title="文章详情";

    // 作者
    const [author, setAuthor] = useState("-");

    // 文章标题
    const [articleTitle, setArticleTitle] = useState("-");

    // 文章的文本
    const [articleContent, setArticleContent] = useState("");
    // 评论列表
    const [data,setData] = useState([]);


    // 获取文章数据
    const getData=()=>{
        $.ajax({
            url:"/shareArticle/article/articleDetail.map",
            method:"GET",
            cache:false,
            dataType:"json",
            contentType:"application/json;charset=UTF-8",
            data:{
                id: window.location.href.split("=")[2]
            },
            success:(result)=>{
                // console.log(result);
                if(result.code === "200"){
                    // 作者
                    setAuthor(result.data.acc);
                    // 标题
                    setArticleTitle(result.data.title);
                    // 内容
                    let init = `<img style="width:100%;height:200px;border-radius:10px" src="${result.data.cover}" />
                    <hr />\n\n># ${result.data.title}\n\n`
                    setArticleContent(init+result.data.content);
                }
            },
            error:(err)=>{
                console.log(err);
            }
        });
    }

    /* 根据文章ID获取评论 */
    const getArticleComment=()=>{
        $.ajax({
            url:'/shareArticle/article/comment.map',
            method:"GET",
            cache:false,
            dataType:"json",
            contentType:"application/json;charset=UTF-8",
            data:{
                articleId:window.location.href.split("=")[2]
            },
            success:(result)=>{
                if(result.success){
                    // 为了使用文章的ID，将其赋值为根源
                    // console.log(result);
                    result.data.map((item)=>{
                        let obj = {"avatar":"","commentContent":""};
                        obj.avatar = item.avatar;
                        obj.commentContent = item.commentContent;
                        data.push(obj);
                    });
                    setData(data);

                }
            },
            error:(err)=>{
                console.log(err);
                alert("加载评论失败");
            }
        });
    }

    // 数据只加载一次
    useEffect(()=>{
        getData();
        getArticleComment();
    },[]);

    return (
        <>
            {/* 左侧评论 */}
            <div className="left-comment-wrap scroll-bar">
                <div className="article-detail-about-wrap">
                    <span className="article-detail-title">{articleTitle}</span>
                    <span style={{fontSize:"14px"}}>作者：{author}</span>
                </div>
                <div className="article-detail-about-wrap">
                    <List
                        header="文章评论"
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta style={{display:"flex",flexDirection:"row", alignItems:"center"}}
                                    avatar={<Avatar src={item.avatar} />}
                                    description={item.commentContent}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
            <Editor style={{height:"90vh",width:"calc(80vw - 200px)",padding:"10px"}} 
                theme="light"
                onSave={()=>alert(articleContent)} 
                modelValue={articleContent} 
                previewOnly
                />
        </>
    );
}

export default ArticleDetail;