import React from "react";
import ReactDOM from "react-dom/client";

import {BrowserRouter,
		Route,
		Routes} from "react-router-dom";

import {Login} from "./js/login"
import Comment from "./component/comment/CommentApp";
import Home from './js/Home';


import 'antd/dist/antd.min.css';

import "./index.css"
import { Register } from "./js/Register";
import ArticleDetail from "./component/home/blog/ArticleDetail";



/* 渲染主进程 */
// react17写法
// ReactDOM.render(
//   <CommentApp />,
//   document.getElementById("root")
// )
// react18写法
ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />}/>
			<Route path="/register" element={<Register />}/>
			<Route path="/home/*" element={<Home />}/>
			<Route path="/comment" element={<Comment />}/>
			<Route path='*' element={<Login />} />
		</Routes>
	</BrowserRouter>
)