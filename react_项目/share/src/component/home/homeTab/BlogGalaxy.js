import { LikeOutlined, LikeFilled ,MessageOutlined, SettingOutlined, EyeOutlined, LaptopOutlined, 
    UnorderedListOutlined, EditOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, List, Menu, Space, Image} from 'antd';
import React, { useEffect, useState } from 'react';

import { Tabs, Modal } from 'antd';
import CommentDrawer from '../blog/CommentDrawer';
import { Link, useNavigate } from 'react-router-dom';

import $ from "jquery";
import BlogTag from '../../Basic/BlogTag';


const { TabPane } = Tabs;


const BlogGalaxy = (props) => {
    // 主题
    const {userData, bodyTheme, fontTheme, onSwitchMenu, refreshArticleList} = props;

    // 本页面的主题色
    const [curTheme, setCurTheme] = useState("white");

    // 评论侧边栏的显示效果
    const [commentSideVisible, setCommentSideVisible] = useState(false);

    // 当前菜单状态切换提示
    const [curMenuState, setCurMenuState] = useState("关闭菜单");

    // 文章数据
    let [articleData, setArticleData] = useState([]);

    // 评论列表
    const [commentList, setCommentList] = useState([]);

    // 界面主题重刷新
    useEffect(()=>{
        setCurTheme(bodyTheme==="#001529"?bodyTheme:"white");
    },[bodyTheme]);

    // 切换菜单状态
    const switchMenu=()=>{
        // 调用父组件的切换菜单状态函数
        onSwitchMenu();

        // 切换提示文本
        setCurMenuState(curMenuState==="打开菜单"?"关闭菜单":"打开菜单");
    }

    // 路由跳转实例
    const Navigate = useNavigate();

    // 根据文章ID删除文章
    const deleteBlogById=(articleId)=>{
        if(articleId === undefined || articleId === null){
            alert("请先选中需要删除的文章哟！");
            return;
        }
        const OK=()=>{
            // 用户信息cookie值
            let userObj = {};
            userObj["acc"] = document.cookie.split(";")
            for(let i of document.cookie.split(/;\s+/)){
                userObj[i.split("=")[0]] = i.split("=")[1];
            }
            $.ajax({
                url:"/shareArticle/article/deletearticle.map",
                method:"POST",
                dataType:"json",
                contentType:"application/x-www-form-urlencoded;charset=UTF-8",
                cache:false,
                data:{
                    acc:userData.acc,
                    token: userObj.token,
                    articleId: articleId
                },
                success:(result)=>{
                    console.log(result);
    
                    if(result.success){
                        // 刷新文章列表
                        getData();
                    }else{
                        alert("文章删除失败");    
                    }
                },
                error:(err)=>{
                    alert("文章删除失败");
                    console.log(err);
                }
            });
        }
    
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: "确认要删除此文章吗？",
            okText: '确认',
            cancelText: '取消',
            onOk:OK,
        });
    }

    /* 根据文章ID获取评论 */
    const getArticleComment=(articleId)=>{
        $.ajax({
            url:'/shareArticle/article/comment.map',
            method:"GET",
            cache:false,
            dataType:"json",
            contentType:"application/json;charset=UTF-8",
            data:{
                articleId:articleId
            },
            success:(result)=>{
                if(result.success){
                    // 为了使用文章的ID，将其赋值为根源
                    setCommentList(result);
                }
            },
            error:(err)=>{
                console.log(err);
                alert("加载评论失败");
            }
        });
    }
    // 刷新当前评论
    const refreshCurComment=()=>{
        getArticleComment(commentList.articleId);
    }


    // 对文章的收藏、点赞、评论按钮
    const handleOpeArticle=(item, keyindex)=>{
        if(keyindex === "comment-o"){
            // 根据文章ID获取评论
            getArticleComment(item.articleID);
            setCommentSideVisible(true);
        }else if(keyindex === "updateEdit"){
            Navigate("/home/blog/update?acc="+item.acc+"&id="+item.articleID);
        }else if(keyindex === "deleteArticle"){
            deleteBlogById(item.articleID);
        }else if(keyindex === "like-o"){
            clickLike(item);
        }else{
            alert(item.title);
        }
    }

    const IconText = ({item, keyindex, icon, text, fontcolor}) => (
        // <div>
            <Space onClick={()=>handleOpeArticle(item, keyindex)} style={{color:fontcolor==="black"?'grey':fontcolor}} className="article-ope" >
                {React.createElement(icon)}
                {text}
            </Space>
        // </div>
    );

    // 悬浮按钮菜单
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Link to="/home/edition"><LaptopOutlined style={{color:"#1890ff"}}/>&nbsp;博客创作</Link>
                    ),
                },{
                    key: '2',
                    label: (
                        <a onClick={switchMenu}>
                            <UnorderedListOutlined style={{color:"#1890ff"}}/>&nbsp;菜单显隐
                        </a>
                    ),
                },
            ]}
        />
    );

    const getData=()=>{
        // 请求文章列表
        $.ajax({
            url:"/shareArticle/article/fileList.map",
            method:"GET",
            cache:false,
            dataType:"json",
            contentType:"application/json",
            data:{
                "token":"001"
            },
            success:(result)=>{
                console.log(result);
                let data = [];
                result.data.map((item)=>(data.unshift({
                    userID:item.userID,
                    acc: item.acc,
                    avatar: item.avatar,
                    articleID: item.articleId,
                    title: item.title,
                    content: item.content,
                    cover:item.cover,
                    scan:item.beScaned,
                    like:item.beLiked,
                    comment:item.beComment,
                    articleType:item.articleType,
                    curLike:item.isLiked
                })));

                // 设置数据源
                setArticleData(data);
            },
            error:(err)=>{
                // alert("请求文章列表失败");
            }
        });
    }

    // 检测数据变化进行刷新
    useEffect(()=>{
        getData();
    },[refreshArticleList]);


    // 文章内容详情
    const openarticleDetail=(acc, id, title, content)=>{
        // console.log(acc, id, title, content);
        window.open("/home/blog/detail?acc="+acc+"&id="+id, "_blank");
    }

    // 点赞文章
    const clickLike=(item)=>{
        // console.log(item);
        // 用户信息cookie值
		let userObj = {};
		for(let i of document.cookie.split(/;\s+/)){
			userObj[i.split("=")[0]] = i.split("=")[1];
		}

        $.ajax({
            url:"/shareArticle/article/like.map",
            method:"GET",
            cache:false.valueOf,
            dataType:"json",
            contentType:"application/json;charset=UTF-8",
            data:{
                // userId: userObj.id,
                // token: userObj.token,
                articleId: item.articleID
            },
            success:(result)=>{
                // console.log(result);

                if(result.success){
                    // 刷新文章列表
                    getData();
                }
            },
            error: (err)=>{
                console.log(err);
            }
        })
    }
    

    return (
        <div>
            <Tabs defaultActiveKey='2' style={{paddingLeft:"10px",
                    backgroundColor:bodyTheme==="#001529"?bodyTheme:"white",
                    color:fontTheme,fontWeight:"bold"}}>
                <TabPane className='content-tab' tab="关注" key="1">
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={articleData.length>40?{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 50,
                        }:null}
                        dataSource={articleData}
                        style={{color:fontTheme,minHeight:"90vh"}}
                        renderItem={(item) => (
                            <List.Item
                                key={item.articleID}
                                actions={(item.userID===userData.id||userData.authority==2)?[
                                    <IconText item={item} fontcolor={fontTheme} icon={EyeOutlined} text={item.scan} keyindex="star-o" />,
                                    <IconText item={item} fontcolor={fontTheme} icon={item.curLike?LikeFilled:LikeOutlined} text={item.like} keyindex="like-o" />,
                                    <IconText item={item} fontcolor={fontTheme} icon={MessageOutlined} text={item.comment} keyindex="comment-o" />,
                                    <IconText item={item} fontcolor={fontTheme} icon={EditOutlined} text="编辑" keyindex="updateEdit" />,
                                    <IconText item={item} fontcolor={fontTheme} icon={CloseOutlined} text="删除" keyindex="deleteArticle" />
                                ]
                                :
                                [
                                    <IconText item={item} fontcolor={fontTheme} icon={EyeOutlined} text={item.scan} keyindex="star-o" />,
                                    <IconText item={item} fontcolor={fontTheme} icon={LikeOutlined} text={item.like} keyindex="like-o" />,
                                    <IconText item={item} fontcolor={fontTheme} icon={MessageOutlined} text={item.comment} keyindex="comment-o" />,
                                ]}
                                extra={
                                    <Image
                                        width={272}
                                        style={{borderRadius:"10px"}}
                                        alt="cover"
                                        src={item.cover}
                                    />
                                }
                                style={{color:fontTheme}}>
                                <List.Item.Meta style={{display:"flex",alignItems:"center"}}
                                    avatar={<Avatar style={{boxShadow:"0 3px 10px 0 grey"}} size="large" src={item.avatar} />}
                                    title={<span><a href={item.href} style={{color:fontTheme,marginRight:"50px"}} >{item.acc}</a><BlogTag data={item.articleType} /></span>}
                                    description={
                                        <span onClick={()=>openarticleDetail(item.acc,item.articleID, item.title, item.content)} style={{color:fontTheme==="black"?"grey":fontTheme,cursor:'pointer'}} >
                                            {item.title}
                                        </span>
                                    }
                                />
                                <span onClick={()=>openarticleDetail(item.acc, item.articleID, item.title, item.content)} style={{cursor:'pointer'}} >
                                    {item.content.slice(0,128)+"|......"}
                                </span>
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane className='content-tab' tab="推荐" key="2">
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={articleData.length>40?{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 50,
                        }:null}
                        style={{color:fontTheme,minHeight:"90vh"}}
                        dataSource={articleData}
                        // footer={
                        //     <div>
                        //     <b>ant design</b> footer part
                        //     </div>
                        // }
                        renderItem={(item) => (
                            <List.Item
                                key={item.articleID}
                                actions={(item.userID===userData.id||userData.authority==2)?[
                                    <IconText item={item} fontcolor={fontTheme} icon={EyeOutlined} text={item.scan} keyindex="star-o" />,
                                    <IconText item={item} fontcolor={fontTheme} icon={item.curLike?LikeFilled:LikeOutlined} text={item.like} keyindex="like-o" />,
                                    <IconText item={item} fontcolor={fontTheme} icon={MessageOutlined} text={item.comment} keyindex="comment-o" />,
                                    <IconText item={item} fontcolor={fontTheme} icon={EditOutlined} text="编辑" keyindex="updateEdit" />,
                                    <IconText item={item} fontcolor={fontTheme} icon={CloseOutlined} text="删除" keyindex="deleteArticle" />
                                ]
                                :
                                [
                                    <IconText item={item} fontcolor={fontTheme} icon={EyeOutlined} text={item.scan} keyindex="star-o" />,
                                    <IconText item={item} fontcolor={fontTheme} icon={LikeOutlined} text={item.like} keyindex="like-o" />,
                                    <IconText item={item} fontcolor={fontTheme} icon={MessageOutlined} text={item.comment} keyindex="comment-o" />,
                                ]}
                                extra={
                                    <Image
                                        width={272}
                                        style={{borderRadius:"10px"}}
                                        alt="cover"
                                        src={item.cover}
                                    />
                                }
                                style={{color:fontTheme}} >
                                <List.Item.Meta style={{display:"flex",alignItems:"center"}}
                                    avatar={<Avatar style={{boxShadow:"0 3px 10px 0 grey"}} size='large' src={item.avatar} />}
                                    title={<span><a href={item.href} style={{color:fontTheme,marginRight:"50px"}} >{item.acc}</a><BlogTag data={item.articleType} /></span>}
                                    description={
                                        <span onClick={()=>openarticleDetail(item.acc, item.articleID, item.title, item.content)} style={{color:fontTheme==="black"?"grey":fontTheme,cursor:'pointer'}} >
                                            {item.title}
                                        </span>
                                    }
                                />
                                <span onClick={()=>openarticleDetail(item.acc, item.articleID, item.title, item.content)} style={{cursor:'pointer'}} >
                                    {item.content.length>250?item.content.slice(1,250)+"|......":item.content}
                                </span>
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane className='content-tab' tab="教育" key="3">

                </TabPane>
                <TabPane className='content-tab' tab="军事" key="4">
                    
                </TabPane>
                <TabPane className='content-tab' tab="金融" key="5">
                    
                </TabPane>
                <TabPane className='content-tab' tab="财政" key="6">
                    
                </TabPane>
            </Tabs>

            {/* 菜单打开关闭按钮 */}
            <Dropdown overlay={menu} placement="top" arrow>
                <div className="switchMenu-btn">
                    <UnorderedListOutlined />
                </div>
            </Dropdown>

            {/* 评论侧边栏 */}
            <CommentDrawer user={userData} dataSource={commentList} refreshBlogList={getData} refreshComment={refreshCurComment} visible={commentSideVisible} setVisible={setCommentSideVisible} />
        </div>
    );
}

export default BlogGalaxy;