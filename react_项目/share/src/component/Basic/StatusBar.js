import React, {useState, useEffect} from "react";

import "../../css/home.css";


import { ReloadOutlined, TranslationOutlined,
	SettingOutlined,SkinOutlined,UserOutlined,
	LaptopOutlined,LogoutOutlined,HeartOutlined, LeftOutlined, EditTwoTone, SkinTwoTone, AudioTwoTone, SmileTwoTone, MailTwoTone, HomeTwoTone, RightOutlined } from '@ant-design/icons';
import { Input, Space, Popover} from 'antd';

import { Dropdown, Menu, Tooltip, Avatar, Badge, Drawer, List, Switch} from 'antd';
import $ from 'jquery';
import SearchBlog from "./SearchBlog";


// 搜索框
const { Search } = Input;


// 退出登录
function loginOut(){
		// 发送请求让后台删除数据库的token，目前我是关闭浏览器就删除token
	// 用户信息cookie值
	let userObj = {};
	for(let i of document.cookie.split(/;\s+/)){
		userObj[i.split("=")[0]] = i.split("=")[1];
	}
	console.log(userObj);

	// 如果是未登录用户的话，就直接退出
	if(userObj.token === null || userObj.token === undefined || userObj.token === ""){
		window.location.replace("/");
		return;
	}

	$.ajax({
		url:"/shareArticle/user/loginout.map",
		method:"GET",
		dataType:"json",
		cache:false,
		contentType:"application/json;charset=UTF-8",
		data:{
			acc:userObj.acc,
			token:userObj.token
		},
		success:(result)=>{
			window.location.replace("/");
			// 清除缓存
			let cacheData = JSON.parse(localStorage.getItem("userInformation"));
			localStorage.setItem("userInformation",JSON.stringify({"userName":cacheData.userName,"pass":cacheData.pass,"token":""}));
		},
		error:(err)=>{
			alert("退出登录失败");
		}
	})
}


/* 搜索框组件 */
const SearchInput = (props) => {
	const {lan, setSearchResultList } = props;

	// 搜索框文本
	const [searchText, setSearchText] = useState("");

	// 执行搜索操作
	function handleSearch(title, e){
		if(title === ""){
			alert("请先输入文章信息再查询哟~");
			return;
		}
		// console.log(title);
		// 发出请求
		$.ajax({
			url:"/shareArticle/article/search.map",
			method:"GET",
			cache:false,
			dataType:"json",
			contentType:"application/json;charset=UTF-8",
			data:{
				title: title
			},
			success:(result)=>{
				// console.log(result);
				if(result.success){
					setSearchResultList(result.data);

					// 清空搜索框文本
					setSearchText("");
				}
			},
			error:(err)=>{
				alert("搜索操作发生错误！");
			}
		});

		// 显示搜索结果面板
		let obj = $("#search-article-result");
		obj.fadeIn(600);
	}

	return(
		<Space direction="vertical">
			<Search placeholder={lan.get("searchSomething")} 
				value={searchText} onChange={(e)=>setSearchText(e.target.value)} 
				onSearch={handleSearch} enterButton />
		</Space>
	)
};


/* 菜单组件 */
const menu = (lan)=>{
	return (
		<Menu
			items={[
			{
				key: '1',
				label: (
					<a target="_blank" rel="noopener noreferrer" href="/">
						{lan.get("myProfile")}
					</a>
				),
				icon: <UserOutlined />
			},{
				key: '2',
				label: (
					<a target="_blank" rel="noopener noreferrer" href="/">
						{lan.get("myPoint")}
					</a>
				),
				icon: <HeartOutlined />
			},{
				key: '3',
				label: (
					<a target="_blank" rel="noopener noreferrer" href="/">
						{lan.get("editManage")}
					</a>
				),
				icon: <LaptopOutlined />
			},{
				key: '4',
				label: (
					<a target="_self" rel="noopener noreferrer" onClick={loginOut}>
						{lan.get("loginOut")}
					</a>
				),
				icon: <LogoutOutlined />
			}
			]}
		/>
		);
	}



function StatusBar(props){
	// 属性传惨修改主题
	const {user, lan, theme, ComponentTheme, onChangeSkin,onChangeLanguage} = props;

	// 系统设置抽屉面板
	const [settingVisible, setSettingVisible] = useState(false);

	// 搜索结果列表
	const [searchResultList, setSearchResultList] = useState([]);

	
	// 修改皮肤
	const changeSkin = (index)=>{
		// 调整主题色
		if(index===1){
			onChangeSkin(1);
		}else{
			onChangeSkin(2);
		}
	}

	// 修改语言
	const changeLanguage = (index)=>{
		onChangeLanguage(index);
	}

	// 打开设置面板
	const openSetting=()=>{
		setSettingVisible(true);
	}
	const onSettingClose=()=>{
		setSettingVisible(false);
	}

	// 打开底层面板
	const showBottomPanel=()=>{
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
		<div className="statusBar-wrap" style={{backgroundImage:theme}}>
			<div className="left-bar-wrap">
				<img id="logo" src={require("../../img/logo_heavy.png")} onClick={showBottomPanel} alt="加载失败" />
				<span className="logo-span" onClick={showBottomPanel} style={{userSelect:"none"}}>{lan.get("title")}</span>
				<SearchInput lan={lan} searchResultList={searchResultList} setSearchResultList={setSearchResultList} />
			</div>
			<div className="right-bar-wrap">
				<Tooltip title={lan.get("refresh")}>
					<ReloadOutlined className="apiIcon" onClick={()=>window.location.reload()}/>
				</Tooltip>
				<Popover
					content={
						<div>
							<a onClick={()=>changeSkin(1)}>{<SkinTwoTone/>}&nbsp;{lan.get("light")}</a>
							<hr />
							<a onClick={()=>changeSkin(2)}>{<SkinTwoTone/>}&nbsp;{lan.get("dark")}</a>
						</div>}
					title={lan.get("skin")}
					trigger="hover"
					// visible={visibleTheme}
					// onVisibleChange={()=>handleVisibleChange(1)}
					>
					<SkinOutlined className="apiIcon" />
				</Popover>
				<Popover
					content={
						<div>
							<a onClick={()=>changeLanguage(1)}>{<EditTwoTone/>}&nbsp;{lan.get("chinese")}</a>
							<hr />
							<a onClick={()=>changeLanguage(2)}>{<EditTwoTone/>}&nbsp;{lan.get("english")}</a>
						</div>}
					title={lan.get("language")}
					trigger="hover"
					// visible={visibleLanguage}
					// onVisibleChange={()=>handleVisibleChange(2)}
					>
					<TranslationOutlined className="apiIcon" />
				</Popover>

				<Tooltip title={lan.get("barSetting")}>
					<SettingOutlined className="apiIcon" onClick={openSetting}/>
				</Tooltip>

				<Dropdown overlay={menu(lan)}>
					<a onClick={(e) => e.preventDefault()}>
						<Space>
							<Badge dot color="green">
								<Avatar style={{ backgroundColor: '#87d068'}} icon={<UserOutlined />} src={user.avatar || ""} />
							</Badge>
						</Space>
					</a>
				</Dropdown>
			</div>

			{/* 抽屉 */}
            <Drawer style={{padding:0}} closeIcon={<LeftOutlined />} title={lan.get("sys_configuration")} placement="right" onClose={onSettingClose} visible={settingVisible}>
				<List
					header={
						<List.Item style={{backgroundColor:"rgba(255,85,0,0.2)",borderRadius:"5px"}}>
							<List.Item.Meta
								avatar={<Avatar size="large" src={user.avatar|| <UserOutlined />} style={{boxShadow:"0 3px 5px 0 grey"}} />}
								title={<a>{user.acc}</a>}
								description={user.sign}
							/>
						</List.Item>}  
						bordered
						dataSource={['']}
						renderItem={() => (
							<div>
								<List.Item className="setting-api-wrap">
									<div>
										<SkinTwoTone /> &nbsp;{lan.get("setting_theme")}
									</div>
									<Switch checkedChildren="dark" unCheckedChildren="light" onClick={()=>changeSkin(ComponentTheme==="white"?2:1)} checked={ComponentTheme==="white"?false:true} />
								</List.Item>
								<List.Item className="setting-api-wrap">
									<div>
										<AudioTwoTone/>&nbsp;{lan.get("setting_language")}
									</div>
									<Switch checkedChildren="中文" unCheckedChildren="english" onClick={()=>changeLanguage(lan.get("chinese")==="中文"?2:1)} checked={lan.get("chinese")==="中文"?true:false} />
								</List.Item>
								<List.Item className="setting-api-wrap">
									<div>
										<SmileTwoTone/>&nbsp;{lan.get("setting_avatar")}
									</div>
									<RightOutlined />
								</List.Item>
								<List.Item className="setting-api-wrap">
									<div>
										<EditTwoTone/>&nbsp;{lan.get("setting_background")}
									</div>
									<RightOutlined />
								</List.Item>
								<List.Item className="setting-api-wrap">
									<div>
										<MailTwoTone/>&nbsp;{lan.get("setting_contact_us")}
									</div>
									<RightOutlined />
								</List.Item>
								<List.Item className="setting-api-wrap" onClick={onSettingClose}>
									<div>
										<HomeTwoTone/>{lan.get("setting_exit")}
									</div>
									<RightOutlined />
								</List.Item>
							</div>
						)}
				/>
            </Drawer>

			{/* 搜索结果面板 */}
			<SearchBlog  searchResultList={searchResultList} setSearchResultList={setSearchResultList}  />
		</div>
	)
}


export default StatusBar;