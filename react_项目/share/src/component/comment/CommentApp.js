import React, {Component} from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import HeadStatusBar from "./HeadStatusBar";

import "../../css/comment.css"



class CommentApp extends Component{
    constructor(){
        super();
        this.state = {
            comments: []
        };
    }


    /* 评论发布 */
    handleSubmitComment(comment){
        /* 简单的数据检查 */
        if(!comment){
            return;
        }
        if(!comment.userName){
            return alert("请先输入用户名");
        }
        if(!comment.content){
            return alert("请先输入评论内容");
        }

        this.state.comments.push(comment);
        this.setState({
            comments: this.state.comments
        });
    }

    render(){
        return (
            <div className="wrapper">
                <HeadStatusBar />

                {/* 传入onSubmit属性 */}
                <CommentInput 
                    onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList comments={this.state.comments} />
            </div>
        )
    }
}

export default CommentApp;