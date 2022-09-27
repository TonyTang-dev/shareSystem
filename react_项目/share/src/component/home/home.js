import StatusBar from '../Basic/StatusBar';

import "../../css/home.css";


import { LaptopOutlined, 
	UserOutlined, SettingOutlined, DesktopOutlined, 
	ReadOutlined, SolutionOutlined, EditOutlined, 
	StarOutlined, FolderOutlined, CoffeeOutlined, 
	FileSearchOutlined, CommentOutlined, VideoCameraOutlined, ShareAltOutlined} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import {
	Route,
	Routes} from "react-router-dom";

import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import Console from './homeTab/Console';
import MyData from './homeTab/MyData';
import Administrator from "./homeTab/Administrator";

import $ from "jquery";


/* 语言 */
import intl from 'react-intl-universal';
import {emit} from "../../locale/emit";
import BlogGalaxy from './homeTab/BlogGalaxy';
import Setting from './homeTab/Setting';
import EditionManage from './homeTab/EditionManage';
import ArticleDetail from './blog/ArticleDetail';
import UpdateArticle from './editionManage/UpdateArticle';
import SortManage from './sortManage/SortManage';
import CommentManage from './commentManage/CommentManage';
import AdManage from './adManage/AdManage';
import FileManage from './fileManage/FileManage';
import BottomHome from './bottomPanel/BottomHome';

 
const locales = {
	'en_US': require('../../locale/en-US.json'),
	'zh_CN': require('../../locale/zh-CN.json'),
};


/* ===================================================
	这属于全局变量，后续全局可使用下述变量 
   ==================================================*/
/* 初始状态加载本地主题、语言缓存并切换，保持用户个人习惯 */
// 初始化读取用户本地缓存，读取到缓存的主题数据
let cacheTheme = localStorage.getItem("sysTheme");
let sysThemeIndex = cacheTheme===null?0:parseInt(cacheTheme);
let cacheLanguage = localStorage.getItem("sysLanguage");


/* 初始化语言 */
const loadLocales = (lang) => {
	intl.init({
		currentLocale: lang,  // 设置初始语言
		locales
	})
}
// 语言切换监听
emit.on('change_language', (lang) => {
	loadLocales(lang);
}); // 监听语言改变事件
loadLocales(cacheLanguage==="en"?"en_US":"zh_CN"); // 初始化语言



/* 主页 */
const Home = () => {
	// 初始菜单选中状态
	const [curSelectMenu, setCurSelectMenu] = useState("blog");

	// 主题数据列表rgba(50,50,255,0.5)
	let themeEquipList = ["light","white","rgba(0,0,0,0.1)","black","linear-gradient(to right, #c2ffd8, #465efb)",
							"dark","rgba(255,255,255,0.1)","#001529","white","linear-gradient(to right, #002040,#002040)"];


	// 主题切换
	const [menuTheme, setMenuTheme] = useState(themeEquipList[sysThemeIndex]);
	const [componentTheme, setComponentTheme] = useState(themeEquipList[sysThemeIndex+1]);
	const [bodyTheme, setBodyTheme] = useState(themeEquipList[sysThemeIndex+2]);
	const [fontTheme, setFontTheme] = useState(themeEquipList[sysThemeIndex+3]);
	const [statusBarTheme, setStatusBarTheme] = useState(themeEquipList[sysThemeIndex+4]);

	// 主页布局
	const { Header, Content, Sider } = Layout;

	// 菜单的显示与隐藏
	const [menuState, setMenuState] = useState("200");

	// 语言模式状态参量
	const [language, setLanguage] = useState(cacheLanguage);

	// API图标总图标
	const menuIconsTotal = {"blogGalaxy":ReadOutlined, 
							"console":DesktopOutlined, 
							"profile":SolutionOutlined, 
							"editManage":EditOutlined, 
							"credit":StarOutlined, 
							"setting":SettingOutlined, 
							"administrator":UserOutlined,
							"sortManage":ShareAltOutlined, 
							"fileManage":FolderOutlined,
							"edit":LaptopOutlined, 
							"update":EditOutlined, 
							"articleManage":CoffeeOutlined, 
							"detail":FileSearchOutlined, 
							"creditManage":CoffeeOutlined,
							"adManage": VideoCameraOutlined,
							"commentManage":CommentOutlined
						};
	
	// 默认显示的图标(默认非管理员)
	const [menuIcons, setMenuIcons] = useState(menuIconsTotal);

	// 是否刷新文章列表
	const [refreshArticleList, setRefreshArticleList] = useState(true);

	// API名称,菜单项目
	let menu = [
		{"key":"blogGalaxy","name":"博客星系"},
		{"key":"console","name":"主控制台"}, 
		{"key":"profile","name":"我的资料"}, 
		{"key":"editManage","name":"创作管理"}, 
		{"key":"credit","name":"积分管理"}, 
		{"key":"setting","name":"设置"}
	];
	const [apiName, setApiName] = useState(menu);

	// 子菜单列表
	const subMenu = [
		[
			{"key":"edit","name":"创作"},
			{"key":"update","name":"编辑"},
			{"key":"articleManage","name":"管理"}
		],
		[
			{"key":"detail","name":"详情"},
			{"key":"creditManage","name":"管理"}
		
		]
	];

	// 生成菜单选项
	const menuItems = apiName.map((item, index) => {
		return {
			key: item.key,
			icon: React.createElement(menuIcons[item.key]),
			label: language==="zh"?item.name:item.key,
			children: (item.key==="editManage"||item.key==="credit")?(item.key==="editManage"?subMenu[0]:subMenu[1]).map((subItem, j) => {
				return {
					key: subItem.key,
					label: <div>{React.createElement(menuIcons[subItem.key])}&nbsp;{language==="zh"?subItem.name:subItem.key}</div>,
				};
			}):null,
		};
	});	

	// 路由切换
	const Navigate = useNavigate();

	// 切换菜单页
	const changeMenu=(item)=>{
		switch(item.key){
			case "blogGalaxy":
				Navigate("/home/blog");
				break;
			case "console":
				Navigate("/home/console");
				break;
			case 'profile':
				Navigate("/home/datamine");
				break;
			case "administrator":
				Navigate("/home/administrator");
				break;
			case "setting":
				Navigate("/home/setting");
				break;
			case "edit":
				Navigate("/home/edition");
				break;
			case "sortManage":
				Navigate("/home/sortManage");
				break;
			case "commentManage":
				Navigate("/home/comment");
				break;
			case "adManage":
				Navigate("/home/adManage");
				break;
			case "fileManage":
				Navigate("/home/fileManage");
				break;
			default:
				break;
		}

		// 切换选中页面
		setCurSelectMenu(item.key);
	}

	/* 切换主题 */
	const changeSkin=(index)=>{
		// dark
		if(index === 2){
			setMenuTheme(themeEquipList[5]);
			setComponentTheme(themeEquipList[6]);
			setBodyTheme(themeEquipList[7]);
			setFontTheme(themeEquipList[8]);
			setStatusBarTheme(themeEquipList[9]);

			// 将主题效果缓存到本地，避免多次请求
			localStorage.setItem("sysTheme","5");
		}else{	//light
			setMenuTheme(themeEquipList[0]);
			setComponentTheme(themeEquipList[1]);
			setBodyTheme(themeEquipList[2]);
			setFontTheme(themeEquipList[3]);
			setStatusBarTheme(themeEquipList[4]);

			// 将主题效果缓存到本地，避免多次请求
			localStorage.setItem("sysTheme","0");
		}
	}

	/* 切换语言 */
	const changeLocale=(index)=>{
						//中文
		if(index === 1){
			emit.emit('change_language', "zh_CN");
			setLanguage("zh");
			
			// 将语言切换效果缓存到本地，避免多次请求
			localStorage.setItem("sysLanguage","zh");
		}else{			//英文
			emit.emit('change_language', "en_US");
			setLanguage("en");
			
			// 将语言切换效果缓存到本地，避免多次请求
			localStorage.setItem("sysLanguage","en");
		}
	}

	// 切换菜单显示与隐藏
	const switchMenuState=()=>{
		setMenuState(menuState==="200"?"0":"200");
	}


    // 我的信息初始数据源
    const [mineData, setMineData]= useState({
		id:"0",
		acc:"-",
		pass:"",
		sign:"-",
		gender:"男",
		phone:"无",
		email:"无",
		articleNum:"0",
		beLiked:"0",
		comment:0,
		ranking:"0",
		authority:"-",
		avatar:""
	});


    // 获取数据源
    const getData=()=>{
		// 用户信息cookie值
		let userObj = {};
		for(let i of document.cookie.split(/;\s+/)){
			userObj[i.split("=")[0]] = i.split("=")[1];
		}
		// let userObj = JSON.parse(localStorage.getItem("userInformation"));
		
        $.ajax({
            url: "/shareArticle/init/me.map",
			method:"GET",
            dataType: 'json',
            cache: false,
            data: {
				acc:userObj.acc,
                token:userObj.token
            },
            contentType:"application/json;charset=utf-8",
            success: (result)=>{
                if(result[0].success === "true"){
					// console.log(result);
					// 当前用户的数据,设置在状态中
					setMineData(result[1]);

					// 新菜单
					let obj = [];
					if(!(result[1].extendMenu === "")){
						obj = JSON.parse(result[1].extendMenu);
					}
					// 菜单数组拼接
					obj.map((item)=>{
						menu.push(item);
					});
					setApiName(menu);
                }else{
					console.log("非登录状态");
                }
				
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    }

	// hook，监听简化并执行重渲染
	useEffect(()=>{
		
	},[language]);

	// 初始化获取当前用户数据
	useEffect(()=>{
		getData();
	},[])


	// 回复显示顶层面板
	const recoverTop=()=>{
		let topPanel = document.getElementById("top-panel-root");
		let mask = document.getElementById("mask-layer");
		mask.style.display=mask.style.display==="block"?"none":"block";
		topPanel.style.transitionProperty="left transform";
		topPanel.style.transitionDuration="1s";
		topPanel.style.transform=topPanel.style.transform==="rotate(-10deg) scale(0.5)"?
						"rotate(0deg) scale(1)":"rotate(-10deg) scale(0.5)";
		topPanel.style.left=topPanel.style.left==="50%"?"0%":"50%";
	}

	return(
		<div className='home-content-wrap-root'>
			<Layout className='top-panel-root' id='top-panel-root'>
				<div id='mask-layer' onClick={recoverTop}></div>
				{/* <Header className="header">
				</Header> */}
				<StatusBar user={mineData} lan={intl} ComponentTheme={componentTheme} theme={statusBarTheme} onChangeSkin={changeSkin} onChangeLanguage={changeLocale} />
				<Layout>
					<Sider width={menuState} className="site-layout-background">
						<Menu
							// defaultSelectedKeys={["blog"]}
							// defaultOpenKeys={['editManage']}
							mode="inline"
							className="scroll-bar"
							style={{
								height: '90vh',
								fontWeight: "bold",
								overflowX:"hidden",
								border:"2px solid rgba(255,255,255,0.1)",
								borderWidth:"0 2px 0 0"
							}}
							triggerSubMenuAction="hover"
							theme={menuTheme}
							onClick={changeMenu}
							selectedKeys={curSelectMenu}
							items={menuItems}/>
					</Sider>
					<Layout style={{
						// padding: '0 24px 24px',
						}} >
						{/* <Breadcrumb style={{
								margin: '16px 0',
							}} >
							<Breadcrumb.Item>/首页</Breadcrumb.Item>
						</Breadcrumb> */}
						<Content
							className="site-layout-background scroll-bar"
							style={{
								padding: 0,
								margin: 0,
								minHeight: 280,
								overflowX:"hidden"
							}} >
							<Routes>
								<Route path="/blog" element={<BlogGalaxy userData={mineData} lan={intl} bodyTheme={bodyTheme} 
																ComponentTheme={componentTheme} fontTheme={fontTheme} 
																onSwitchMenu={switchMenuState} refreshArticleList={refreshArticleList}/>}/>
								<Route path="/blog/detail" element={<ArticleDetail />}/>
								<Route path="/blog/update" element={<UpdateArticle refreshArticleList={refreshArticleList} user={mineData}
																setRefreshArticleList={setRefreshArticleList}/>}/>
								<Route path="/console" element={<Console user={mineData} lan={intl} bodyTheme={bodyTheme} ComponentTheme={componentTheme} fontTheme={fontTheme} />}/>
								<Route path="/datamine" element={<MyData user={mineData} lan={intl} bodyTheme={bodyTheme} ComponentTheme={componentTheme} fontTheme={fontTheme} />}/>
								<Route path="/administrator" element={<Administrator lan={intl} bodyTheme={bodyTheme} ComponentTheme={componentTheme} fontTheme={fontTheme} />}/>
								<Route path="/setting" element={<Setting lan={intl} language={language} bodyTheme={bodyTheme} ComponentTheme={componentTheme} fontTheme={fontTheme} changeSkin={changeSkin} changeLocale={changeLocale}/>}/>
								<Route path="/edition" element={<EditionManage refreshArticleList={refreshArticleList} user={mineData}
																setRefreshArticleList={setRefreshArticleList} onSwitchMenu={switchMenuState}/>} />
								<Route path="/sortManage" element={<SortManage user={mineData} lan={intl} bodyTheme={bodyTheme} ComponentTheme={componentTheme} fontTheme={fontTheme} />}/>
								<Route path="/comment" element={<CommentManage userData={mineData} lan={intl} bodyTheme={bodyTheme} 
																ComponentTheme={componentTheme} fontTheme={fontTheme} />} />
								<Route path="/adManage" element={<AdManage user={mineData} lan={intl} bodyTheme={bodyTheme} ComponentTheme={componentTheme} fontTheme={fontTheme} />}/>
								<Route path="/fileManage" element={<FileManage userData={mineData} lan={intl} bodyTheme={bodyTheme} 
																ComponentTheme={componentTheme} fontTheme={fontTheme} />} />
								<Route path="/*"  element={<BlogGalaxy userData={mineData} lan={intl} bodyTheme={bodyTheme} 
														ComponentTheme={componentTheme} fontTheme={fontTheme} 
														onSwitchMenu={switchMenuState} refreshArticleList={refreshArticleList}/>}/>
							</Routes>
						</Content>
					</Layout>
				</Layout>
			</Layout>

		{/* 底层面板 */}
		<Layout className='bottom-panel-root'>
			<BottomHome />
		</Layout>
	</div>
	);
}

export default Home;