import React from "react";
import ReactDOM from "react-dom/client";
import CommentApp from '../component/comment/CommentApp'
// import "../css/comment.css"



/* 渲染主进程 */
// react17写法
// ReactDOM.render(
//   <CommentApp />,
//   document.getElementById("root")
// )
// react18写法
ReactDOM.createRoot(document.getElementById("root")).render(
	<CommentApp />
);