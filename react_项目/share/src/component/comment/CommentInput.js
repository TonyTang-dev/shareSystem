import React, {Component} from "react";

import { RedoOutlined } from '@ant-design/icons';
import { Button, Modal} from 'antd';

import $ from "jquery";


class CommentInput extends Component{
    constructor(){
        super();
        this.state = {
            userName: "",
            content: "",
            isModalVisible: false,
            version: ""
        };       
    }

    /* 处理输入框文本同步 */
    handleUserNameChange(event){
        this.setState({
            userName: event.target.value
        });
    }
    handleContentChange(event){
        this.setState({
            content: event.target.value
        });
    }

    /* 发布按钮 */
    handleSubmit(){
        if(this.props.onSubmit){
            const {userName, content} = this.state;
            this.props.onSubmit({userName, content});
        }
        // 显示模态框
        // setIsModalVisible(true);
        // fetch("https://www.fastmock.site/mock/5457964f13c92e2a2cf118077aa3cb87/api/test")
        // .then(
        //     res => res.json()
        // )
        // .then(
        //     (result) => {
        //         this.setState({
        //             version: result.content.version
        //         });
        //         console.log(result.content.version);
        //     },
        //     // 注意：需要在此处处理错误
        //     // 而不是使用 catch() 去捕获错误
        //     // 因为使用 catch 去捕获异常会掩盖掉组件本身可能产生的 bug
        //     (error) => {
        //         this.setState({
        //             version: ""
        //         });
        //     }
        // )

        $.ajax({
            url: "/shareSystem/loginController.do",
            dataType: 'json',
            cache: false,
            success: (result)=>{
                this.setState({
                    version: result
                });
                console.log(result);
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });


        this.setState({content:'', isModalVisible:true});
    }
    /* 清空 */
    handleReset(){
        alert("清空");
        this.setState({content:''});
    }


    // handleOk = () => {
    //     setIsModalVisible(false);
    // };

    // handleCancel = () => {
    //     setIsModalVisible(false);
    // };

    /* 确认模态框 */
    handleOk(){
        this.setState({isModalVisible:false});
    }
    /* 取消模态框 */
    handleCancel(){
        this.setState({isModalVisible:false});
    }

    render(){
        return (
            <div className="comment-input">
                <div className="comment-filed">
                    <span className="comment-filed-name">用户名：</span>
                    <div className="comment-filed-input">
                        <input className="box-input-textare" value={this.state.userName} 
                            onChange={(e)=>this.handleUserNameChange(e)}/>
                    </div>
                </div>
                <div className="comment-filed">
                    <span className="comment-filed-name">评论内容：</span>
                    <div className="comment-filed-input">
                        <textarea className="box-input-textare" rows="10" value={this.state.content} 
                            onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className="comment-filed-button">
                    <Modal title="操作提示" visible={this.state.isModalVisible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                        <strong>嘿嘿，这是接受的系统版本</strong>
                        <br/>
                        <strong>version: <font style={{color:"red"}}>{this.state.version}</font></strong>
                    </Modal>
                    <Button type="primary" className="btn-cancel" icon={<RedoOutlined />} onClick={this.handleReset.bind(this)}>
                        重置
                    </Button>
                    <button onClick={this.handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}


/* 向外暴露变量 */
export default CommentInput;