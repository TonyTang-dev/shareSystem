import React, { useState } from 'react';
import Editor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import {Button, Input, Image, Modal, Row, Col} from "antd";
import ArticleHeaderDrawer from './ArticleHeaderDrawer';
import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons';

import $ from "jquery";
import {useNavigate} from "react-router-dom";

const ArticleEditor=(props)=>{
    // 编辑的文本
    const [articleContent, setArticleContent] = useState('>欢迎使用知识分享系统\n```cpp\nclass node{\n\n};\n```');

    // 标题字数统计
    const [title, setTitle] = useState("");

    // 文章摘要
    const [articleAbstract, setArticleAbstract] = useState("");

    // 文章分类数据
    const [articleTypeData, setArticleTypeData] = useState([]);
    // 文章标签数据
    const [articleTagData, setArticleTagData] = useState(['原创']);

    // 详情配置侧边栏显隐状态
    const [blogConfigVisible, setBlogConfigVisible] = useState(false);

    // 上传图片模态框
    const [coverModalVisible, setCoverModalVisible] = useState(false);

    // 上传的封面图片路径
    const [coverPath, setCoverPath] = useState("/shareArticle/static/cover/default.png");

    // 使用的封面
    const [curCover, setCurCover] = useState("/shareArticle/static/cover/default.png");

    // 是否刷新文章列表
    const {user, refreshArticleList, setRefreshArticleList} = props;


    // 路由跳转
    const Navigate = useNavigate();


    /* 事件处理 */
    // 打开配置侧边栏
    const showBlogConfig=()=>{
        setBlogConfigVisible(true);
    }

    // 打开上传图片模态框
    const showCoverUpload=()=>{
        setCoverModalVisible(true);
    }
    // 关闭上传图片模态框
    const handleCoverUploadCancel=()=>{
        setCoverModalVisible(false);
        // 封面恢复默认
        setCoverPath("/shareArticle/static/cover/default.png");
    }
    // 封面图片确定（是否上传后续确定）
    const handleCoverUpload=(obj)=>{
        // 如果图片为空则不上传
        if(obj === ""){
            return;
        }

        // 上传图片的表单
        let formData = new FormData();
        formData.append("document", obj);

        $.ajax({
            url:"/shareArticle/file/cover.map",
            method:"POST",
            cache:false,
            data: formData,
            // 不对url编码
            processData:false,
            // 不修改contentType属性，原样发送
            contentType:false,
            success:(result)=>{
                // 将json字符串转为json对象
                result = JSON.parse(result);
                if(result.success){
                    setCoverPath(result.data);

                    // 清空文件输入框
                    $("#uploadCoverPanel").val("");
                }else{
                    alert("上传封面失败");
                }
            },
            error:(err)=>{
                alert('上传失败');
            }
        })
    }

    // 使用刚刚上传的封面
    const handleUseCover=()=>{
        setCurCover(coverPath);
        // 关闭模态框面板
        setCoverModalVisible(false);
    }


    // 清空
    const resetArticle=()=>{
        setArticleContent("");
        setTitle("");
        setArticleAbstract("");
        setArticleTagData(["原创"]);
        setArticleTypeData([]);
    }
    // 发布
    const publishArticle=()=>{
        // 文章标题不为空
        if(title===""){
            alert("文章标题不能为空！");
            return;
        }

        // 将数组转化为字符串传输
        let tempType = "";
        let tempIndex = "";
        articleTypeData.map((item)=>{
            tempType += (item.name+",");
            tempIndex += ((item.target).split("-")[1]+",")
        })
        let tempTag = "";
        articleTagData.map((item)=>{
            tempTag += (item+",");
        })

        $.ajax({
            url:"/shareArticle/article/publish.map",
            method:"POST",
            cache:false,
            dataType:"json",
            contentType:"application/x-www-form-urlencoded;charset=UTF-8",
            data:{
                userID:user.id,
                title:title,
                content:articleContent,
                type:tempType+";"+tempIndex,
                abstract:articleAbstract===""?articleContent.slice(0,128):articleAbstract,
                tag:tempTag,
                cover:curCover
            },
            success:(result)=>{
                // console.log(result);
                
                // 清空输入框
                resetArticle();
                // 封面恢复默认
                setCurCover("/shareArticle/static/cover/default.png");
                // 发布成功，刷新文章列表,并跳转到文章列表
                setRefreshArticleList(!refreshArticleList);
                Navigate("/home/blog");
            },
            error:(err)=>{
                console.log(err);
            }
        });
    }


    return (
        <div>
            <div className='edition-status-bar'>
                <Input className='edition-title-input' value={title}
                    prefix={<div style={{color:"#1890ff"}}>文章标题:</div>} 
                    suffix={String(title.length+"/128")} 
                    maxLength="128"
                    placeholder='在这输入您的博客标题呀,最多128词哟~'
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                <div style={{display:"flex",
                        flexDirection:"row",alignItems:"center"}}
                    >
                    <Image style={{width:"8vh",height:"32px",overflow:"hidden",
                                    borderRadius:"3px",marginRight:"5px"}}
                        src={curCover} alt="cover"
                        />
                    <Button type='primary' onClick={showCoverUpload}>上传封面</Button>
                </div>
                <Button type='primary' onClick={showBlogConfig}>博客配置</Button>
                <Button type='primary' onClick={publishArticle}>发布</Button>
                <Button type='primary' style={{backgroundColor:"red"}} onClick={resetArticle}>清空</Button>
            </div>
            <Editor style={{height:"calc(90vh - 40px)"}} 
                theme="light"
                onSave={()=>alert(articleContent)} 
                modelValue={articleContent} 
                onChange={setArticleContent}/>


            {/* 博客配置侧边栏（抽屉） */}
            <ArticleHeaderDrawer title={title} setTitle={setTitle} 
                curCover={curCover}
                setCurCover={setCurCover}
                visible={blogConfigVisible} setVisible={setBlogConfigVisible} 
                articleAbstract={articleAbstract} setArticleAbstract={setArticleAbstract}
                articleTypeData={articleTypeData} setArticleTypeData={setArticleTypeData}
                articleTagData={articleTagData} setArticleTagData={setArticleTagData}
                />
            {/* 选择封面图片上传 */}
            <Modal title={<span><CloudUploadOutlined style={{color:"#40a9ff"}}/>&nbsp;上传图片(仅一张)</span>} visible={coverModalVisible} 
                okText="使用" cancelText="取消" onOk={handleUseCover} onCancel={handleCoverUploadCancel}>
                <Row gutter={16} style={{display:'flex',flexDirection:"row",alignItems:"center"}}>
                    <Col span={12}>
                        <div className="file-upload-module">
                            <label className="upload-file-label-input" 
                                    htmlFor="uploadCoverPanel" 
                                    style={{display:"flex",flexDirection:"column",
                                    alignItems:"center",justifyContent:"center",
                                    fontSize:"14px",fontWeight:"bold",color:"white"}}
                                >
                                <PlusOutlined style={{fontSize:"24px"}} />
                                <span>点击/拖动封面至此释放上传</span>
                            </label>
                            <input name="document" 
                                id="uploadCoverPanel" type="file" 
                                accept="image/png, image/jpeg, image/jpg"
                                style={{opacity:"0",width:"100%",height:"100%",cursor:"pointer"}} 
                                onChange={(e)=>handleCoverUpload(e.target.files[0])} 
                                />
                        </div>
                    </Col>
                    <Col span={12}>
                        <Image style={{borderRadius:"5px"}} width="100%" height="200px" src={coverPath} alt="cover"/>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}

export default ArticleEditor;
