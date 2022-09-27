import React from "react";
import $ from "jquery";

import {List,Avatar} from "antd";
import { SearchOutlined } from "@ant-design/icons";


const SearchBlog=(props)=>{
    const {searchResultList, setSearchResultList} = props;

    // 关闭搜索结果面板
    const closeResultPanel=()=>{
        $("#search-article-result").fadeOut(300);
        // 清空上次的数据
        setSearchResultList([]);
    }

    // 文章内容详情
    const openarticleDetail=(acc, id, title, content)=>{
        // console.log(acc, id, title, content);
        window.open("/home/blog/detail?acc="+acc+"&id="+id, "_blank");
    }

    return (
        <div onClick={closeResultPanel} id="search-article-result" className="search-result-panel">
            <div style={{display:"block",color:"white",fontWeight:"bold",fontSize:"20px",lineHeight:"2em",textAlign:"center"}}>
                <SearchOutlined />&nbsp;搜索结果
            </div>
            <hr />
            <div className="scroll-bar" style={{height:"80vh",overflow:"auto"}}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={searchResultList.length>40?{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 50,
                    }:null}
                    dataSource={searchResultList}
                    style={{color:"white",
                            width:"50vw",}}
                    renderItem={(item) => (
                        <List.Item
                            key={item.articleID}
                            extra={
                                <img
                                    // width="272px"
                                    style={{borderRadius:"10px",width:"150px",height:"100px"}}
                                    alt="cover"
                                    src={item.cover}
                                />
                            }
                            style={{color:"grey",
                                backgroundColor:"rgba(255,255,255,0.8)",
                                margin:"20px",borderRadius:"10px"}}
                            onClick={()=>openarticleDetail(item.acc, item.articleId, item.title, item.content)}
                            >
                            <List.Item.Meta style={{display:"flex",alignItems:"center",fontSize:"16px",fontWeight:"bold"}}
                                avatar={<Avatar style={{boxShadow:"0 3px 10px 0 grey"}} size="large" src={item.avatar} />}
                                title={<a href={item.href} style={{color:"#00f"}} >{item.acc}</a>}
                                description={
                                    <span style={{marginLeft:"0",color:"black",cursor:'pointer',fontSize:"16px",fontWeight:"bold"}} 
                                        onClick={()=>openarticleDetail(item.acc,item.articleId, item.title, item.content)} >
                                        {item.title}
                                    </span>
                                }
                            />
                            <span onClick={()=>openarticleDetail(item.acc, item.articleId, item.title, item.content)} 
                                style={{cursor:'pointer',fontSize:"16px",fontWeight:"bold"}} >
                                {item.content.length>128?item.content.slice(1,128)+"......":item.content}
                            </span>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}

export default SearchBlog;