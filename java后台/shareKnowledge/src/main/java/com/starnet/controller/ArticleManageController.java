package com.starnet.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.starnet.Util.DbUtil;
import com.starnet.Util.DealUtil;
import com.starnet.service.ArticleService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/article")
public class ArticleManageController {
	@Resource(name = "articleService")
	private ArticleService articleService;

	/**
	 *@description 获取文章列表的Controller
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-25
	*/
	@RequestMapping(value = "/fileList.map")
	public void getFileList(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String userId = null;
		String token = null;
		JSONObject jsonObject = null;

		Cookie cookies[] = request.getCookies();
		for(Cookie cookie:cookies) {
			if("token".equals(cookie.getName())){
				token = cookie.getValue();
			}
			if("id".equals(cookie.getName())){
				userId = cookie.getValue();
			}
		}

		//cookie解码
		try{
			userId = URLDecoder.decode(userId, "UTF-8");
			token = URLDecoder.decode(token, "UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}

		if(!(token.equals(articleService.getTokenByUserId(Integer.parseInt(userId))))){
			System.out.println("没有权限访问文章列表");
			jsonObject = DealUtil.getFailJson();
			return;
		}else{
			jsonObject = DealUtil.getSuccessJson();
			//加入文章列表
			jsonObject.put("data",articleService.getArticleListService(Integer.parseInt(userId)));
		}

		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch(IOException e){
			System.out.println("getFileList Error");
		}
	}

	/**
	 *@description 发布文章
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-7
	*/
	@RequestMapping(value = "publish.map")
	public void publishArticle(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		int userID = Integer.parseInt(request.getParameter("userID"));
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String type[] = request.getParameter("type").split(";");
		String articleAbstract = request.getParameter("abstract");
		String tag = request.getParameter("tag");
		String cover = request.getParameter("cover");

		String linkType = null;
		String linkTypeIndex = null;
		if(type.length > 1) {
			linkType = type[0];
			linkTypeIndex = type[1];
		}else{
			linkType = "";
			linkTypeIndex = "";
		}

		linkType = DealUtil.strTrim(linkType);
		linkTypeIndex = DealUtil.strTrim(linkTypeIndex);
		tag = DealUtil.strTrim(tag);
		cover = cover.substring(cover.lastIndexOf(File.separator));


		JSONObject jsonObject = new JSONObject();
		jsonObject.put("code","200");
		jsonObject.put("status","OK");

		if(articleService.publishArticleService(userID, title, content, articleAbstract, linkType, linkTypeIndex, tag, cover)){
			jsonObject.put("success","true");
		}else{
			jsonObject.put("success","false");
		}

		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 修改文章
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-11
	*/
	@RequestMapping(value = "/update.map")
	public void updateArticle(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type", "text/json;charset=UTF-8");
		String token = null;
		String tempUserId = request.getParameter("userID");
		int userId = 0;
		JSONObject jsonObject = null;

		//解析用户ID
		if(!"".equals(userId)){
			userId = Integer.parseInt(tempUserId);
		}else{
			System.out.println("操作出现错误，权限错误");
			jsonObject = DealUtil.getFailJson();
			try{
				response.getOutputStream().write(jsonObject.toJSONString().getBytes());
			}catch (IOException e){
				e.printStackTrace();
			}
		}

		//token解码
		try{
			token = URLDecoder.decode(request.getParameter("token"), "UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}
		//	权限判定
		if(!(token.equals(articleService.getTokenByUserId(userId)))){
			System.out.println("操作权限错误");
			jsonObject = DealUtil.getFailJson();
			try{
				response.getOutputStream().write(jsonObject.toJSONString().getBytes());
			}catch (IOException e){
				e.printStackTrace();
			}
		}else{
			int articleId = Integer.parseInt(request.getParameter("id"));
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			String type = request.getParameter("type");
			String articleAbstract = request.getParameter("abstract");
			String tag = request.getParameter("tag");
			String cover = request.getParameter("cover");

			type = DealUtil.strTrim(type);
			tag = DealUtil.strTrim(tag);
			cover = cover.substring(cover.lastIndexOf(File.separator));


			if(articleService.updateArticleService(articleId, title, content, articleAbstract, type, tag, cover)){
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
	}

	/**
	 *@description 根据文章ID删除文章
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-11
	*/
	@RequestMapping(value = "/deletearticle.map")
	public void deleteArticle(HttpServletResponse response, HttpServletRequest request){
		response.setHeader("Content-type", "text/json;charset=UTF-8");

		String token = null;
		String acc = request.getParameter("acc");
		JSONObject jsonObject = null;

		//token解码
		try{
			token = URLDecoder.decode(request.getParameter("token"),"UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}

		//	验证身份
		if(token.equals(articleService.getTokenByUserAcc(acc))){
			int articleId = Integer.parseInt(request.getParameter("articleId"));
			if(articleService.deleteArticleService(articleId)){
				jsonObject = DealUtil.getSuccessJson();
			}else{
				jsonObject = DealUtil.getFailJson();
			}
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
	 *@description 根据文章标题查询文章
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-11
	*/
	@RequestMapping(value = "/search.map")
	public void searchBlog(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type", "text/json;charset=UTF-8");

		String title = request.getParameter("title");
		JSONObject jsonObject = null;

		if(title == null || "".equals(title)){
			jsonObject = DealUtil.getFailJson();
		}else{
			jsonObject = DealUtil.getSuccessJson();
			jsonObject.put("data", articleService.getArticleByTitleService(title));
		}

		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 根据文章ID获取文章数据，并返回作者信息
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-9
	*/
	@RequestMapping(value = "articleDetail.map")
	public void getArticleDetail(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type", "text/json;charset=UTF-8");

		int articleId = 0;
		try {
			String id = URLDecoder.decode(request.getParameter("id"), "UTF-8");
			articleId = Integer.parseInt(id);
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}

		JSONObject jsonObject = DealUtil.getSuccessJson();

		jsonObject.put("data", articleService.getArticleById(articleId));

		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 文章点赞
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-12
	*/
	@RequestMapping(value = "/like.map")
	public void likeArticle(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type", "text/json;charset=UTF-8");

		String userId = null;
		String token = null;
		String articleId = request.getParameter("articleId");
		JSONObject jsonObject = null;

		Cookie cookies[] = request.getCookies();
		for(Cookie cookie:cookies) {
			if("token".equals(cookie.getName())){
				token = cookie.getValue();
			}
			if("id".equals(cookie.getName())){
				userId = cookie.getValue();
			}
		}

		//cookie解码
		try{
			userId = URLDecoder.decode(userId, "UTF-8");
			token = URLDecoder.decode(token, "UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}

		//身份验证


		if("".equals(articleId)){
			jsonObject = DealUtil.getFailJson();
		}else {
			//修改文章点赞并整合到用户的点赞数量（+1操作）
			if (articleService.likeArticleService(articleId,userId)){
				jsonObject = DealUtil.getSuccessJson();
			}else {
				jsonObject = DealUtil.getFailJson();
			}
		}

		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 获取所有评论列表
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-15
	 */
	@RequestMapping(value = "/allComment.map")
	public void getAllCommentList(HttpServletResponse response, HttpServletRequest request){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String userId = null;
		String token = null;

		JSONObject jsonObject = null;

		Cookie cookies[] = request.getCookies();
		for(Cookie cookie:cookies) {
			if("token".equals(cookie.getName())){
				token = cookie.getValue();
			}else if("id".equals(cookie.getName())){
				userId = cookie.getValue();
			}
		}

		//cookie解码
		try{
			userId = URLDecoder.decode(userId, "UTF-8");
			token = URLDecoder.decode(token, "UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}

		//身份验证
		if(!(token.equals(articleService.getTokenByUserId(Integer.parseInt(userId))))){
			jsonObject = DealUtil.getFailJson();
		}else {
			jsonObject = DealUtil.getSuccessJson();
			jsonObject.put("data",articleService.getAllCommentListService());
		}

		//返回
		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 根据文章ID获取评论列表
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-15
	*/
	@RequestMapping(value = "/comment.map")
	public void getCommentList(HttpServletResponse response, HttpServletRequest request){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String articleId = request.getParameter("articleId");
		JSONObject jsonObject = null;

		if("".equals(articleId) || articleId == null){
			jsonObject = DealUtil.getFailJson();
		}else{
			int id = Integer.parseInt(articleId);
			jsonObject = DealUtil.getSuccessJson();
			jsonObject.put("articleId",id);
			jsonObject.put("data",articleService.getCommentListService(id));
		}

		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 新增评论
 	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-15
	*/
	@RequestMapping(value = "/addComment.map")
	public void addCommentById(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String userId = null;
		String token = null;
		String articleId = request.getParameter("articleId");
		String commentContent = request.getParameter("commentContent");
		JSONObject jsonObject = null;

		Cookie cookies[] = request.getCookies();
		for(Cookie cookie:cookies) {
			if("token".equals(cookie.getName())){
				token = cookie.getValue();
			}else if("id".equals(cookie.getName())){
				userId = cookie.getValue();
			}else{

			}
		}

		//cookie解码
		try{
			userId = URLDecoder.decode(userId, "UTF-8");
			token = URLDecoder.decode(token, "UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}

		//身份验证
		if("".equals(articleId) || articleId==null || commentContent==null){
			jsonObject = DealUtil.getFailJson();
		}else {
			int id = Integer.parseInt(articleId);
			//修改文章点赞并整合到用户的点赞数量（+1操作）
			if (articleService.addCommentService(id, Integer.parseInt(userId), commentContent)){
				jsonObject = DealUtil.getSuccessJson();
			}else {
				jsonObject = DealUtil.getFailJson();
			}
		}

		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 回复评论--添加子评论
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-15
	*/
	@RequestMapping(value = "/replyComment.map")
	public void replyComment(HttpServletResponse response, HttpServletRequest request){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String userId = null;
		String token = null;
		String articleId = request.getParameter("articleId");
		String replyTo = request.getParameter("replyTo");
		String linkComment = request.getParameter("linkComment");
		String commentContent = request.getParameter("commentContent");
		JSONObject jsonObject = null;

		Cookie cookies[] = request.getCookies();
		for(Cookie cookie:cookies) {
			if("token".equals(cookie.getName())){
				token = cookie.getValue();
			}else if("id".equals(cookie.getName())){
				userId = cookie.getValue();
			}else{

			}
		}

		//cookie解码
		try{
			userId = URLDecoder.decode(userId, "UTF-8");
			token = URLDecoder.decode(token, "UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}

		//身份验证
		if("".equals(articleId) || articleId==null || commentContent==null || replyTo==null){
			jsonObject = DealUtil.getFailJson();
		}else {
			int linkArticleId = Integer.parseInt(articleId);
			int linkCommentId = Integer.parseInt(linkComment);
			int replyToId = Integer.parseInt(replyTo);
			//修改文章点赞并整合到用户的点赞数量（+1操作）
			if (articleService.replyCommentService(linkArticleId, Integer.parseInt(userId), linkCommentId,replyToId, commentContent)){
				jsonObject = DealUtil.getSuccessJson();
			}else {
				jsonObject = DealUtil.getFailJson();
			}
		}

		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 获取文章的三级分类
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-16
	*/
	@RequestMapping(value = "/blogSort.map")
	public void getBlogSort(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");
		String userId = null;
		String token = null;

		JSONObject jsonObject = null;

		Cookie cookies[] = request.getCookies();
		for(Cookie cookie:cookies) {
			if("token".equals(cookie.getName())){
				token = cookie.getValue();
			}else if("id".equals(cookie.getName())){
				userId = cookie.getValue();
			}
		}

		//身份验证

		jsonObject = DealUtil.getSuccessJson();
		jsonObject.put("data",articleService.getBlogSortService());

		//返回
		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 添加新的分类
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-17
	*/
	@RequestMapping(value = "/newSort.map")
	public void addNewsort(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String userId = null;
		String token = null;
		String newSort = request.getParameter("newSort");

		JSONObject jsonObject = null;

		Cookie cookies[] = request.getCookies();
		for(Cookie cookie:cookies) {
			if("token".equals(cookie.getName())){
				token = cookie.getValue();
			}else if("id".equals(cookie.getName())){
				userId = cookie.getValue();
			}
		}

		//cookie解码
		try{
			userId = URLDecoder.decode(userId, "UTF-8");
			token = URLDecoder.decode(token, "UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}

		//身份验证
		if(!(token.equals(articleService.getTokenByUserId(Integer.parseInt(userId))))){
			jsonObject = DealUtil.getFailJson();
		}else {
			if(articleService.addNewSortService(newSort, userId)) {
				jsonObject = DealUtil.getSuccessJson();
			}else{
				jsonObject = DealUtil.getFailJson();
			}
		}

		//返回
		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 根据ID删除分类
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-17
	*/
	@RequestMapping(value = "/deleteSort.map")
	public void deleteSortController(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String userId = null;
		String token = null;
		String deleteSort = request.getParameter("deleteObj");
		deleteSort = DealUtil.strTrim(deleteSort);

		JSONObject jsonObject = null;

		Cookie cookies[] = request.getCookies();
		for(Cookie cookie:cookies) {
			if("token".equals(cookie.getName())){
				token = cookie.getValue();
			}else if("id".equals(cookie.getName())){
				userId = cookie.getValue();
			}
		}
		//cookie解码
		try{
			userId = URLDecoder.decode(userId, "UTF-8");
			token = URLDecoder.decode(token, "UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}

		//身份验证
		if(!(token.equals(articleService.getTokenByUserId(Integer.parseInt(userId))))){
			jsonObject = DealUtil.getFailJson();
		}else {
			if(articleService.deleteSortService(deleteSort)) {
				jsonObject = DealUtil.getSuccessJson();
			}else{
				jsonObject = DealUtil.getFailJson();
			}
		}

		//返回
		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 根据ID修改分类名称
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-17
	*/
	@RequestMapping(value = "/updateSort.map")
	public void updateSortController(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String userId = null;
		String token = null;
		String updateSortID = request.getParameter("updateId");
		String updateName = request.getParameter("updateName");

		JSONObject jsonObject = null;

		Cookie cookies[] = request.getCookies();
		for(Cookie cookie:cookies) {
			if("token".equals(cookie.getName())){
				token = cookie.getValue();
			}else if("id".equals(cookie.getName())){
				userId = cookie.getValue();
			}
		}

		//cookie解码
		try{
			userId = URLDecoder.decode(userId, "UTF-8");
			token = URLDecoder.decode(token, "UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}

		//身份验证
		if(!(token.equals(articleService.getTokenByUserId(Integer.parseInt(userId)))) ||
				"".equals(updateSortID) || "".equals(updateName)){
			jsonObject = DealUtil.getFailJson();
		}else {
			if(articleService.updateSortService(updateSortID, updateName)) {
				jsonObject = DealUtil.getSuccessJson();
			}else{
				jsonObject = DealUtil.getFailJson();
			}
		}

		//返回
		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 根据评论ID删除评论
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-18
	*/
	@RequestMapping(value = "/deleteComment.map")
	public void deleteCommentController(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		String userId = null;
		String token = null;
		String deleteKey = request.getParameter("commentKey");

		JSONObject jsonObject = null;

		Cookie cookies[] = request.getCookies();
		for(Cookie cookie:cookies) {
			if("token".equals(cookie.getName())){
				token = cookie.getValue();
			}else if("id".equals(cookie.getName())){
				userId = cookie.getValue();
			}
		}
		//cookie解码
		try{
			userId = URLDecoder.decode(userId, "UTF-8");
			token = URLDecoder.decode(token, "UTF-8");
		}catch (UnsupportedEncodingException e){
			e.printStackTrace();
		}

		//身份验证
		if(!(token.equals(articleService.getTokenByUserId(Integer.parseInt(userId)))) ||
				"".equals(deleteKey)){
			jsonObject = DealUtil.getFailJson();
		}else {
			if(articleService.deleteCommentService(deleteKey)) {
				jsonObject = DealUtil.getSuccessJson();
			}else{
				jsonObject = DealUtil.getFailJson();
			}
		}

		//返回
		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 获取浏览量前十排名的文章
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-19
	*/
	@RequestMapping(value = "/articletop.map")
	public void getTopArticle(HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		JSONObject jsonObject = null;

		jsonObject = DealUtil.getSuccessJson();
		jsonObject.put("data",articleService.getTopArticleService());

		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}
}
