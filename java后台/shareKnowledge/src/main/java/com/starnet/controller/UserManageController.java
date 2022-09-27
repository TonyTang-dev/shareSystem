package com.starnet.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.starnet.Util.DealUtil;
import com.starnet.service.UserService;
import org.apache.commons.lang.UnhandledException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/user")
public class UserManageController {

	@Resource(name = "userService")
	public UserService userService;

	/**
	 *@description 注册入口,true-注册成功;false-注册失败
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-25
	*/
	@RequestMapping(value = "/register.map")
	public void registerRequest(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String acc = request.getParameter("acc");
		String pass = request.getParameter("pass");

		Map<String,String> rs = new HashMap<>();
		rs.put("code", "200");
		rs.put("status", "OK");


		if("".equals(acc) || "".equals(pass)){
			rs.put("register", "false");
			rs.put("forward", "/register");
			try {
				response.getOutputStream().write(JSON.toJSONString(rs).getBytes());
			}catch(IOException e){
				e.printStackTrace();
			}
			return;
		}

		if(userService.registerService(acc, pass)) {
			rs.put("register", "true");
			rs.put("forward", "/login");
		}else{
			rs.put("register", "false");
			rs.put("forward", "/register");
		}
		try {
			response.getOutputStream().write(JSON.toJSONString(rs).getBytes());
		}catch(IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 登录，true-登录成功；false-登录失败
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-26
	*/
	@RequestMapping(value = "/login.map")
	public void login(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type", "text/json;charset=UTF-8");

		String acc = request.getParameter("acc");
		String pass = request.getParameter("pass");


		String token = acc+"token"+System.currentTimeMillis();
		//cookie
		Cookie idCookie = null;
		Cookie accCookie = null;
		Cookie tokenCookie = null;

		Map<String,String> rs = new HashMap<>();
		rs.put("code", "200");
		rs.put("status", "OK");

		int returnId = userService.loginService(acc, pass, token);

		if(returnId != -1) {
			rs.put("login", "true");
			rs.put("forward", "/home");

			//编码
			try {
				//cookie赋值
				idCookie = new Cookie("id", URLEncoder.encode(String.valueOf(returnId), "UTF-8"));
				accCookie = new Cookie("acc",URLEncoder.encode(acc, "UTF-8"));
				tokenCookie = new Cookie("token", URLEncoder.encode(token, "UTF-8"));
			}catch(UnsupportedEncodingException e){
				e.printStackTrace();
			}
			idCookie.setPath("/");
			idCookie.setMaxAge(-1);	//浏览器关闭失效
			accCookie.setPath("/");
			accCookie.setMaxAge(-1);	//浏览器关闭失效
			tokenCookie.setPath("/");
			tokenCookie.setMaxAge(-1);	//浏览器关闭失效

			response.addCookie(idCookie);
			response.addCookie(accCookie);
			response.addCookie(tokenCookie);
		}else{
			rs.put("login", "false");
			rs.put("forward", "/login");
		}

		try{
			response.getOutputStream().write(JSON.toJSONString(rs).getBytes());
		}catch(IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 退出登录
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-8
	*/
	@RequestMapping(value = "/loginout.map")
	public void loginout(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String acc = null;
		String token = null;
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("code", "200");
		jsonObject.put("status", "OK");

		try {
			acc = URLDecoder.decode(request.getParameter("acc"), "UTF-8");
			token = URLDecoder.decode(request.getParameter("token"), "UTF-8");
		}catch(UnsupportedEncodingException e){
			e.printStackTrace();
		}

		if(!(userService.getTokenByAccService(acc).equals(token))){
			System.out.println("没有操作权限");
			jsonObject.put("success", "false");
		}else{
			if(userService.loginoutService(acc)){
				jsonObject.put("success", "true");

				//cookie
				Cookie accCookie = null;
				Cookie tokenCookie = null;
				//编码
				try {
					//cookie赋值
					accCookie = new Cookie("acc",URLEncoder.encode("", "UTF-8"));
					tokenCookie = new Cookie("token", URLEncoder.encode("", "UTF-8"));
				}catch(UnsupportedEncodingException e){
					e.printStackTrace();
				}

				accCookie.setPath("/");
				accCookie.setMaxAge(0);	//浏览器关闭失效
				tokenCookie.setPath("/");
				tokenCookie.setMaxAge(0);	//浏览器关闭失效
				response.addCookie(accCookie);
				response.addCookie(tokenCookie);
			}else{
				jsonObject.put("success","false");
			}
		}

		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch(IOException e){
			e.printStackTrace();
		}
	}


	/**
	 *@description 获取所有用户数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-2
	*/
	@RequestMapping(value = "/alluser.map")
	public void getAllUser(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		JSONArray jsonArray = new JSONArray();

		Map<String,String> rs = new HashMap<>();
		rs.put("code", "200");
		rs.put("status", "OK");

		if(!("001".equals(request.getParameter("token")))){
			System.out.println("没有权限查看用户数据");
			rs.put("authority", "false");
			jsonArray.add(rs);
			try {
				response.getOutputStream().write(jsonArray.toJSONString().getBytes());
			}catch(IOException e){
				e.printStackTrace();
			}
			return;
		}
		rs.put("authority", "true");
		jsonArray.add(rs);

		//加入查询到的结果
		jsonArray.add(userService.getAllUserService());

		try{
			response.getOutputStream().write(jsonArray.toJSONString().getBytes());
		}catch(IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 管理员添加用户
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-3
	*/
	@RequestMapping(value = "/adduseradmin.map")
	public void addUserByManager(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String requstParameters[] = new String[8];

		requstParameters[0] = request.getParameter("account");
		requstParameters[1] = request.getParameter("password");
		requstParameters[2] = request.getParameter("gender");
		requstParameters[3] = request.getParameter("authority");
		requstParameters[4] = request.getParameter("phone");
		requstParameters[5] = request.getParameter("email");
		requstParameters[6] = request.getParameter("sign");

		//菜单
		requstParameters[7] = request.getParameter("menu");

		Map<String, String> rs = new HashMap<String, String>();
		rs.put("code","200");
		rs.put("status","OK");


		if("".equals(requstParameters[0]) || "".equals(requstParameters[1])){
			rs.put("success", "false");
			try {
				response.getOutputStream().write(JSON.toJSONString(rs).getBytes());
			}catch (IOException e){
				e.printStackTrace();
			}
			return;
		}

		try {
			if(userService.addUserByManager(requstParameters)){
				rs.put("success","true");
			}
			else {
				rs.put("success", "false");
			}
			response.getOutputStream().write(JSON.toJSONString(rs).getBytes());
		}catch(IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 通过用户的ID列表来删除用户的数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-3
	*/
	@RequestMapping(value = "/deleteuser.map")
	public void deleteUserById(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String deleteIdList[] = request.getParameter("idList").split(",");

		Map<String, String> rs = new HashMap<>();
		rs.put("code","200");
		rs.put("status","OK");

		//识别用户权限
		if(!("001".equals(request.getParameter("token")))){
			System.out.println("没有权限删除用户数据");
			rs.put("success","false");
			try {
				response.getOutputStream().write(JSON.toJSONString(rs).getBytes());
			}catch(IOException e){
				e.printStackTrace();
			}
		}

		if(userService.deleteUserByIdService(deleteIdList)){
			rs.put("success","true");
		}else{
			rs.put("success","false");
		}
		try {
			response.getOutputStream().write(JSON.toJSONString(rs).getBytes());
		}catch(IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 修改用户数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-3
	*/
	@RequestMapping(value = "/updateuseradmin.map")
	public void updateUser(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String requstParameters[] = new String[9];

		requstParameters[0] = request.getParameter("account");
		requstParameters[1] = request.getParameter("password");
		requstParameters[2] = request.getParameter("gender");
		requstParameters[3] = request.getParameter("authority");
		requstParameters[4] = request.getParameter("phone");
		requstParameters[5] = request.getParameter("email");
		requstParameters[6] = request.getParameter("sign");
		requstParameters[7] = request.getParameter("key");
		//菜单
		requstParameters[8] = request.getParameter("menu");

		Map<String, String> rs = new HashMap<String, String>();
		rs.put("code","200");
		rs.put("status","OK");

		if("".equals(requstParameters[0]) || "".equals(requstParameters[1])){
			rs.put("success", "false");
			try {
				response.getOutputStream().write(JSON.toJSONString(rs).getBytes());
			}catch (IOException e){
				e.printStackTrace();
			}
			return;
		}

		try {
			if(userService.updateUserByManager(requstParameters)){
				rs.put("success","true");
			}
			else {
				rs.put("success", "false");
			}
			response.getOutputStream().write(JSON.toJSONString(rs).getBytes());
		}catch(IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 根据用户名查询数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-3
	*/
	@RequestMapping(value = "/queryUserByName.map")
	public void queryUserByName(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		JSONArray jsonArray = new JSONArray();

		Map<String,String> rs = new HashMap<>();
		rs.put("code", "200");
		rs.put("status", "OK");

		if(!("001".equals(request.getParameter("token")))){
			System.out.println("没有权限查看用户数据");
			rs.put("success", "false");
			jsonArray.add(rs);
			try {
				response.getOutputStream().write(JSON.toJSONString(rs).getBytes());
			}catch(IOException e){
				e.printStackTrace();
			}
			return;
		}
		rs.put("success", "true");
		jsonArray.add(rs);

		//加入查询到的结果
		jsonArray.add(userService.queryUserByNameService(request.getParameter("account")));

		try{
			response.getOutputStream().write(jsonArray.toJSONString().getBytes());
		}catch(IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 验证用户身份
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-11
	*/
	@RequestMapping(value = "verify.map")
	public void verify(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type", "text/json;charset=UTF-8");

		String acc = request.getParameter("acc");
		String token = null;
		try{
			token = URLDecoder.decode(request.getParameter("token"), "UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}

		JSONObject jsonObject = null;

		if(token.equals(userService.getTokenByAccService(acc))){
			jsonObject = DealUtil.getSuccessJson();
		}else{
			jsonObject = DealUtil.getFailJson();
		}

		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 根据密钥验证用户身份，然后重置其密码为一个随机密码
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-17
	*/
	@RequestMapping(value = "/forgetPass.map")
	public void forgetPassController(HttpServletResponse response, HttpServletRequest request){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String acc = request.getParameter("acc");
		String token = request.getParameter("token");

		JSONObject jsonObject = null;

		//默认token为“001”
		if(!DealUtil.token.equals(token)){
			jsonObject = DealUtil.getFailJson();
		}else{
			jsonObject = DealUtil.getSuccessJson();
			jsonObject.put("data", userService.resetAndGetPassByAccService(acc));
		}

		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}
}
