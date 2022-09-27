import React, {Component} from "react";
import Comment from './Comment';

class CommentList extends Component{
    // 默认数据避免不传入数据报错
    static defaultProps = {
        comments: []
    }

    render(){
        // const comments = [
        //     {userName: 'jelly', content:'hello'},
        //     {userName: 'tony', content:'heihei'},
        //     {userName: '张三', content:'wow'}
        // ];
        const comments = this.props.comments;

        return (
            <div>
                <hr/>
                <div className="comment-tag">
                    <span>评论区</span>
                </div>
                <hr/>
                <div>
                    {comments.map((comment, i)=><Comment comment={comment} key={i}/>)}
                </div>
            </div>
        );
    }
}


export default CommentList;