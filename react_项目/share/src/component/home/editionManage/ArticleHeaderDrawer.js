import { LeftOutlined, PictureTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Input, Row, Select, Space, Image, Tag, Modal, List} from 'antd';
import React, { useEffect, useState } from 'react';
import TagList from '../../Basic/TagList';
import TypeTagList from "../../Basic/TypeTagList";

import $ from "jquery";
import ArticleSortTree from './ArticleSortTree';

// 选择输入框
const { Option } = Select;


const ArticleHeaderDrawer = (props) => {
    // 父组件传参
    const {visible, setVisible, title, setTitle, curCover, setCurCover, articleAbstract, setArticleAbstract,
        articleTypeData, setArticleTypeData,articleTagData, setArticleTagData} = props;

    const onClose = () => {
        setVisible(false);
    };

    // 选择分类抽屉显示与隐藏
    const [sortVisible, setSortVisible] = useState(false);
    // 分类抽屉的关闭
    const onCloseSort=()=>{
        setSortVisible(false);
    }
    // 显示抽屉
    const showSortDrawer=()=>{
        setSortVisible(true);
    }


    // 历史封面
    const [historyCoverVisible, setHistoryCoverVisible] = useState(false);
    const [coverData, setCoverData] = useState([]);

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
        setHistoryCoverVisible(true);
    };

    const handleOk = () => {
        setHistoryCoverVisible(false);
    };

    const handleCancel = () => {
        setHistoryCoverVisible(false);
    };

    // 选中历史封面
    const selectHistoryCover=(item)=>{
        setCurCover(item);
        // 隐藏选择面板
        setHistoryCoverVisible(false);
    }


    // 选择文章分类
    const selectFileSort=(e)=>{
        let tempdata = [];
        for(let i of articleTypeData){
            if(i === e){
                return;
            }
            tempdata.push(i);
        }
        tempdata.push(e);
        setArticleTypeData(tempdata);
    }
    // 选择文章标签
    const selectTagSort=(e)=>{
        let tempdata = [];
        for(let i of articleTagData){
            if(i === e){
                return;
            }
            tempdata.push(i);
        }
        tempdata.push(e);
        setArticleTagData(tempdata);
    }

    // 修改文章标题
    const modifyTitle=(e)=>{
        setTitle(e.target.value);
    }
    // 修改摘要
    const modifyAbstract=(e)=>{
        setArticleAbstract(e.target.value);
    }

    return (
        <>
            <Drawer
                title="博客配置"
                width={720}
                closeIcon={<LeftOutlined/>}
                onClose={onClose}
                visible={visible}
                bodyStyle={{
                    
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>取消</Button>
                        <Button onClick={onClose} type="primary">
                            确认
                        </Button>
                    </Space>
                }
                >
                
                {/* 封面 672px*/}
                <Row gutter={16}>
                    <Col span={19}>
                        <label>博客封面</label>
                        <br />
                        <Image style={{width:"500px",height:"20vh",borderRadius:"5px"}} src={curCover} alt="封面"/>
                    </Col>
                    <Col span={5}>
                        <label></label>
                        <br />
                        <div className='history-cover-select' onClick={showHistoryCoverModal}>
                                    <PlusOutlined/>历史封面
                        </div>
                    </Col>
                </Row>
                <br/>

                <form style={{
                    height:"50vh",
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"space-around"}}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <label>博客标题</label>
                            <Input placeholder="这里是文章标题呀" value={title} onChange={modifyTitle} />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <label>分类</label>
                            <div className='tag-row-wrap'>
                                <div style={{width:"calc(100% - 5em)"}}>
                                    <TypeTagList data={articleTypeData} setData={setArticleTypeData}/>
                                </div>
                                <Select style={{width:"5em"}} placeholder="请选择文章的分类呀"  onClick={showSortDrawer} defaultValue="选择">
                                    <Option value="tip" style={{width:"5em"}}>分类</Option>
                                </Select>
                            </div>
                        </Col>
                        <Col span={12}>
                            <label>标签</label>
                            <div className='tag-row-wrap'>
                                <div style={{width:"calc(100% - 5em)"}}>
                                    <TagList data={articleTagData} setData={setArticleTagData}/>
                                </div>
                                <Select style={{width:"5em"}} placeholder="请选择文章的标签呀" onSelect={selectTagSort} defaultValue="原创">
                                    <Option value="原创">原创</Option>
                                    <Option value="转载">转载</Option>
                                    <Option value="娱乐">娱乐</Option>
                                    <Option value="其他">其他</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <label>摘要</label>
                            <Input.TextArea rows={4} placeholder="在这里输入文章摘要呀！" value={articleAbstract} onChange={modifyAbstract} />
                        </Col>
                    </Row>
                </form>
            </Drawer>

            {/* 抽屉 */}
            <Drawer title="选择分类" placement="right" onClose={onCloseSort} visible={sortVisible}
                closeIcon={<LeftOutlined/>}
                extra={
                    <Space>
                      <Button onClick={onCloseSort}>取消</Button>
                      <Button type="primary" onClick={onCloseSort}>
                            确认
                      </Button>
                    </Space>
                }
                >
                <ArticleSortTree setData={setArticleTypeData} />
            </Drawer>

            {/* 历史图片 */}
            <Modal title={<span><PictureTwoTone/>&nbsp;历史封面</span>} visible={historyCoverVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className='scroll-bar' style={{
                            height:"40vh",
                            overflow:"auto"
                        }}>
                    <List
                        dataSource={coverData}
                        renderItem={(item) => (
                            <List.Item>
                                <img style={{width:"50%",height:"100px",borderRadius:"10px",cursor:"pointer"}} src={item} alt="cover" />
                                <Button type='primary' style={{marginRight:"20px"}} onClick={()=>selectHistoryCover(item)}>就它了</Button>
                            </List.Item>
                        )}
                        />
                </div>
            </Modal>
        </>
    );
};

export default ArticleHeaderDrawer;