package com.starnet.Util;

import com.alibaba.fastjson.JSONObject;

public class DealUtil {
	/**
	 *@description 全局密钥，用于身份验证，只有管理员告诉你了你才知道
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-17
	*/
	public static String token = "001";

	/**
	 *@description 字符串去除尾部“,"
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-12
	*/
	public static String strTrim(String str){
		if(str.length() < 1 || str == null) {
			return "";
		}
		return str.substring(0, str.length()-1);
	}

	/**
	 *@description 数组字符串截取"[]"
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-12
	*/
	public static String arrayStrTrim(String arr){
		if(arr.length() < 2 || arr == null){
			return "";
		}
		return arr.substring(1, arr.length()-1);
	}

	/**
	 *@description 生成成功返回数据的实例
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-10
	*/
	public static JSONObject getSuccessJson(){
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("code", "200");
		jsonObject.put("status", "OK");
		jsonObject.put("success", true);

		return jsonObject;
	}

	/**
	 *@description 生成失败返回数据的实例
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-10
	 */
	public static JSONObject getFailJson(){
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("code", "200");
		jsonObject.put("status", "OK");
		jsonObject.put("success", false);

		return jsonObject;
	}
}
