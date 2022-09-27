package com.starnet.controller;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.starnet.Util.DealUtil;
import com.starnet.service.InitAccessService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/init")
public class GetInitDataController {
	//服务层操作装配
	@Resource(name = "initAccessService")
	private InitAccessService initAccessService;


	/**
	 *@description 初期用于直接返回当前用户数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-2
	*/
	@RequestMapping(value = "/me.map")
	public void me(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");
		JSONArray jsonArray = new JSONArray();

		String acc = request.getParameter("acc");
		String token = request.getParameter("token");


		//UTF-8解码
		try {
			acc = URLDecoder.decode(acc, "UTF-8");
			token = URLDecoder.decode(token, "UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}


		//状态
		Map<String, String> rs = new HashMap<String, String>();
		rs.put("code","200");
		rs.put("status","OK");

		if(!(initAccessService.getTokenByAccService(acc).equals(token))){
			rs.put("success", "false");
			jsonArray.add(rs);
		}else {
			rs.put("success", "true");
			jsonArray.add(rs);
			jsonArray.add(initAccessService.getMeService(acc));
		}

		byte[] reArr = jsonArray.toJSONString().getBytes();

		try {
			response.getOutputStream().write(reArr);
		}catch(IOException e){
			e.printStackTrace();
		}
	}


	/**
	 *@description 获取文章类型列表
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-26
	*/
	@RequestMapping(value = "/articleType.map")
	public void getArticleTypeListBean(HttpServletRequest request,HttpServletResponse response){
		response.setHeader("Content-type", "text/json;charset=UTF-8");
		JSONArray jsonArray = new JSONArray();

		//状态
		Map<String, String> rs = new HashMap<String, String>();
		rs.put("code","200");
		rs.put("status","OK");

		jsonArray.add(rs);
		jsonArray.add(initAccessService.getArticleTypeListService());

		byte[] reArr = jsonArray.toJSONString().getBytes();

		try {
			response.getOutputStream().write(reArr);
		}catch(IOException e){
			e.printStackTrace();
		}
	}


	/**
	 *@description 获取积分榜前十
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-1
	 */
	@RequestMapping(value = "/credittop.map")
	public void credittop(HttpServletResponse response){
		response.setHeader("Content-type", "text/json;charset=UTF-8");
		JSONArray jsonArray = new JSONArray();

		//状态
		Map<String, String> rs = new HashMap<String, String>();
		rs.put("code","200");
		rs.put("status","OK");

		jsonArray.add(rs);
		jsonArray.add(initAccessService.getCreditTopTen());

		byte[] reArr = jsonArray.toJSONString().getBytes();

		try {
			response.getOutputStream().write(reArr);
		}catch(IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 获取用户管理的面板基本数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-10
	*/
	@RequestMapping(value = "/manageBasic.map")
	public void getManageBasic(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");
		JSONObject jsonObject = null;

		String token = null;
		Cookie cookies[] = request.getCookies();
		for(Cookie cookie:cookies) {
			if("token".equals(cookie.getName())){
				token = cookie.getValue();
				break;
			}
		}
		String acc = request.getParameter("acc");

		//解码
		try{
			token = URLDecoder.decode(token, "UTF-8");
			acc = URLDecoder.decode(acc, "UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}

		// 检测token与用户是否匹配
		if(token == null || !(token.equals(initAccessService.getTokenByAccService(acc)))){
			System.out.println("非法访问用户管理基本数据");
			jsonObject = DealUtil.getFailJson();
		}else{
			jsonObject = DealUtil.getSuccessJson();
			jsonObject.put("data",initAccessService.getManageBasicService());
		}

		//	返回
		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}
}
