import { Avatar, Comment, Modal, List, Form, Row, Col, Input} from 'antd';
import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import React,{useState} from 'react';
import $ from "jquery";


const CommentList = (props) => {
    const {user, dataSource, refreshBlogList, refreshComment} = props;

    // 回复模态框
    const [isReplyVisible, setIsReplyVisible] = useState(false);
    // 回复form钩子
    const [form] = useForm();
    // 回复的对象
    let [replyObj, setReplyObj] = useState({"articleId":dataSource.articleId,"linkComment":"","replyTo":"","commentContent":""});

    const showReplyModal = () => {
        setIsReplyVisible(true);
    };

    const handleOk = () => {
        let comment = form.getFieldValue("comment");

        // 非空检测
        if(comment === ""){
            alert("请先写评论后再回复哦！");
            return;
        }
        replyObj.commentContent = comment;
        replyObj.articleId = dataSource.articleId;

        // console.log(replyObj);

        // 发布评论
        $.ajax({
            url:"/shareArticle/article/replyComment.map",
            cache:false,
            dataType:"json",
            method:"POST",
            contentType:"application/x-www-form-urlencoded;charset=UTF-8",
            data:replyObj,
            success:(result)=>{
                // console.log(result);

                // 刷新博客前端显示和评论显示
                if(result.success){
                    refreshComment();
                    refreshBlogList();
                    // 清空输入框
                    form.resetFields();
                }else{
                    alert("回复失败");
                }
            },
            error:(err)=>{
                alert("回复失败");
            }
        })
        setIsReplyVisible(false);
    };

    const handleCancel = () => {
        setIsReplyVisible(false);
    };

    // 回复
    const replyTo=(linkComment, replyTo)=>{
        replyObj.linkComment = linkComment;
        replyObj.replyTo = replyTo;

        showReplyModal();
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
                        refreshComment();
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

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={dataSource.data}
                renderItem={(item, index) => (
                    <List.Item
                        style={{margin:"0",padding:"0"}}>
                        <Comment
                            // actions={[<span key="comment-nested-reply-to">回复</span>]}
                            author={<span>
                                <a>{item.linkUser}</a> 
                                    &nbsp;&nbsp;
                                <a style={{color:"red"}} onClick={()=>replyTo(item.id,item.linkUserId)}>回复</a>&nbsp;&nbsp;
                                                        {(item.linkUserId===user.id || user.id===29)?<a style={{color:"red"}} onClick={()=>deleteByCommentId("I~"+item.id)}>删除</a>:null}
                                </span>
                            }
                            avatar={<Avatar src={item.avatar} alt="avatar" />}
                            content={
                                <p>{item.commentContent}</p>
                            }
                            >
                            <List
                                itemLayout="horizontal"
                                dataSource={item.subCommentList}
                                locale={{emptyText:<span></span>}}
                                renderItem={(subItem) => (
                                    <List.Item 
                                        style={{margin:"0",padding:"0"}}>
                                        <Comment
                                            // actions={[<span key="comment-nested-reply-to">回复</span>]}
                                            author={
                                                    <span>
                                                        <a>{subItem.linkUser}</a> 
                                                        &gt; {subItem.replyTo} &nbsp;&nbsp;
                                                        <a style={{color:"red"}} onClick={()=>replyTo(subItem.linkComment, subItem.linkUserId)}>回复</a>&nbsp;&nbsp;
                                                        {(subItem.linkUserId===user.id || user.id===29)?<a style={{color:"red"}} onClick={()=>deleteByCommentId("II~"+subItem.id)}>删除</a>:null}
                                                    </span>
                                                }
                                            avatar={<Avatar src={subItem.avatar} alt="avatar" />}
                                            content={
                                                <p>{subItem.commentContent}</p>
                                            }
                                            >
                                        </Comment>
                                    </List.Item>
                                )}
                            />
                        </Comment>
                    </List.Item>
                )}
            />
            <Modal title="回复" visible={isReplyVisible} onOk={handleOk} onCancel={handleCancel} okText="回复" cancelText="取消">
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
            </Modal>
        </>
    );
};

export default CommentList;