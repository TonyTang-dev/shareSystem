import { LeftOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space, Avatar} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import CommentList from './CommentList';

import $ from "jquery";

const CommentDrawer = (props) => {
    // 可见性
    const {user, visible, setVisible, dataSource, refreshComment, refreshBlogList} = props;

    const onClose = () => {
        setVisible(false);
    };

    // 表单钩子
    const [form] = useForm();

    // 发布评论
    const pubComment=()=>{
        let comment = form.getFieldValue("comment");

        // 非空检查
        if(comment === ""){
            alert("请先输入评论内容再发布哦!");
            return;
        }

        $.ajax({
            url:"/shareArticle/article/addComment.map",
            method:"POST",
            cache:false,
            dataType:"json",
            contentType:"application/x-www-form-urlencoded; charset=utf-8",
            data:{
                articleId: dataSource.articleId,
                commentContent:comment
            },
            success:(result)=>{
                // console.log(result);
                // 重新获取评论列表，新增评论在最底部
                refreshComment();
                // 刷新主页统计数据（重新获取文章列表）
                refreshBlogList();
                // 清空输入框
                form.resetFields();
            },  
            error:(err)=>{
                alert("发布评论失败");
            }
        });
    }

    return (
        <div>
            <Drawer
                title="评论"
                width={720}
                closeIcon={<LeftOutlined />}
                onClose={onClose}
                visible={visible}
                bodyStyle={{

                }}
                extra={
                    <Space>
                        <Button onClick={onClose} style={{borderRadius:"5px"}}>取消</Button>
                        <Button onClick={pubComment} style={{borderRadius:"5px"}} type="primary">
                            发布
                        </Button>
                    </Space>
                }
                >
                <div>
                    <Form layout="vertical" hideRequiredMark form={form}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="comment"
                                    label={<span><Avatar style={{ backgroundColor: '#87d068',marginRight:"5px"}} icon={<UserOutlined />} />评论</span>}
                                    rules={[
                                    {
                                        required: true,
                                        message: '发表好思路，解决新问题！',
                                    },
                                    ]}
                                >
                                    <Input.TextArea className='scroll-bar' rows={4} placeholder="在这儿输入你的评论哟！" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <hr />
                    <CommentList user={user} dataSource={dataSource} refreshComment={refreshComment} refreshBlogList={refreshBlogList} />
                </div>
            </Drawer>
        </div>
    );
};

export default CommentDrawer;