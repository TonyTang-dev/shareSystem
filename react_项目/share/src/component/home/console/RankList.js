import { Avatar, Divider, List, Tabs} from 'antd';

import {UserOutlined,ApartmentOutlined} from "@ant-design/icons";

import React, { useEffect, useState } from 'react';

import $ from "jquery";


// 分页实例
const {TabPane} = Tabs;





const RankList = (props) => {
    const {lan, fontTheme,articleChart,setArticleChart,creditChart, setCreditChart} = props;

    // 排行数据源
    const [data, setData]= useState([]);
    // 文章排行数据源
    const [articleData, setArticleData]= useState([]);

    // 获取数据源
    const getData=()=>{
        let tempData = [];
        $.ajax({
            url: "/shareArticle/init/credittop.map",
            dataType: 'json',
            cache: false,
            data: {
                
            },
            contentType:"application/json;charset=utf-8",
            success: (result)=>{
                // console.log("rank\n"+JSON.stringify(result));

                if(result[0].status == "OK"){
                    result[1].map((item,index)=>{
                        tempData.push(item);
                        creditChart[index] = item.credit;
                    });
                    // 设置积分数据源
                    setCreditChart(creditChart);
                }else{
                    alert("获取排行榜失败");
                }

                // 设置数据源
                setData(tempData);
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    }

    // 获取文章排名数据源
    const getArticleData=()=>{
        let tempData = [];
        $.ajax({
            url: "/shareArticle/article/articletop.map",
            dataType: 'json',
            cache: false,
            data: {
                
            },
            contentType:"application/json;charset=utf-8",
            success: (result)=>{
                if(result.success){
                    result.data.map((item, index)=>{
                        tempData.push(item);
                        // 设置展示数据源
                        articleChart[index] = item.beScaned;
                    });
                    setArticleChart(articleChart);
                    console.log(articleChart);
                }else{
                    alert("获取排行榜失败");
                }

                // 设置数据源
                setArticleData(tempData);
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    }

    // 获取数据源
    useEffect(()=>{
        // 获取数据源
        getData();
        getArticleData();
    },[]);

    // 文章内容详情
    const openarticleDetail=(item)=>{
        window.open("/home/blog/detail?acc="+item.acc+"&id="+item.articleId, "_blank");
    }


    return (
        <div className='ranklist-content scroll-bar'>
            <List>
                <List.Item style={{backgroundImage:"linear-gradient(to right, #c2ffd8, #465efb)",borderRadius:"5px"}}>
                        <Avatar size="large" icon={<ApartmentOutlined style={{color:'blue'}} />} style={{boxShadow:"0 3px 5px 0 grey",marginLeft:"10px"}}/>
                        <span style={{color:'white',fontSize:"18px",marginRight:"10px"}}>积分/文章排行榜</span>
                </List.Item>
            </List>
            {/* <Divider orientation="center" style={{color: fontTheme}}><ApartmentOutlined style={{color:'blue'}}/>&nbsp;{lan.get("rankTitle")}</Divider> */}
            <Tabs defaultActiveKey="1" onChange={null} style={{color:fontTheme==="black"?"grey":fontTheme,fontWeight:'bold'}}>
                <TabPane className='content-tab' tab={lan.get("pointRankList")} key="1">
                    <List
                        bordered
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <div className='list-item-wrap'>
                                    <div className='list-rank-item'>
                                        <Avatar style={{ backgroundColor: '#87d068',marginRight:"5px"}} src={item.avatar || <UserOutlined />} />
                                        <div style={{textAlign:"left"}}>
                                            <span style={{fontWeight:"bold",color: fontTheme}}>{item.acc}</span>
                                            <br/>
                                            <span style={{
                                                    fontSize:'12px',color:"grey",textOverflow:"ellipsis",whiteSpace:"nowrap",
                                                    display:"block",overflowX:"hidden",width:"6em",maxWidth:"8em"
                                                    }}>
                                                    {item.sign}
                                            </span>
                                        </div>
                                    </div>
                                    <img src={require('../../../img/'+((index+1)%10)+".png")} alt="0" style={{width:"32px"}} />
                                </div>
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane className='content-tab' tab={lan.get("articleRanklist")} key="2">
                    <List
                        bordered
                        dataSource={articleData}
                        renderItem={(item,index) => {
                            return (
                                <List.Item>
                                    <div className='list-item-wrap'>
                                        <div className='list-rank-item'>
                                            <Avatar style={{ backgroundColor: '#87d068',marginRight:"5px"}} src={item.cover || <UserOutlined />} />
                                            <div style={{textAlign:"left"}}>
                                                <span onClick={()=>openarticleDetail(item)} style={{cursor:"pointer",display:"inline-block",fontWeight:"bold",color: fontTheme, width:"7em",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{item.title}</span>
                                                {/* <br/>
                                                <span style={{
                                                        fontSize:'12px',color:"grey",textOverflow:"ellipsis",whiteSpace:"nowrap",
                                                        display:"block",overflowX:"hidden",width:"6em",maxWidth:"8em"
                                                        }}>
                                                        {item.sign}
                                                </span> */}
                                            </div>
                                        </div>
                                        <img src={require('../../../img/'+((index+1)%10)+".png")} alt="0" style={{width:"32px"}} />
                                    </div>
                                </List.Item>
                            );}
                        }
                    />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default RankList;