package com.starnet.controller;

import com.alibaba.fastjson.JSONObject;
import com.starnet.Util.DealUtil;
import com.starnet.service.ArticleService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping(value = "/file")
public class FileHandleController {
	@Resource(name = "articleService")
	private ArticleService articleService;

	/**
	 *@description 封面图片上传
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-10
	*/
	@RequestMapping(value = "/cover.map")
	public void uploadCover(MultipartFile document, HttpSession session, HttpServletResponse response){
		//最终的图片路径
		String finalPath = null;
		// 返回数据json实体
		JSONObject jsonObject = null;

		//文件必须非空
		if(document == null){
			jsonObject = DealUtil.getFailJson();
		}else {
			String fileName = document.getOriginalFilename();

			//处理文件名，按UUID进行拼接，避免命名冲突
			String suffixName = fileName.substring(fileName.lastIndexOf("."));
			fileName = UUID.randomUUID().toString() + suffixName;

			//服务器中document目录，静态文件夹
			ServletContext servletContext = session.getServletContext();
			String documentPath = servletContext.getRealPath("static/cover");

			//最终路径
			finalPath = documentPath + File.separator + fileName;

			//上传并返回数据
			jsonObject = DealUtil.getSuccessJson();
			jsonObject.put("data", "/shareArticle/static/cover/" + fileName);

			try{
				document.transferTo(new File(finalPath));
			}catch(IOException e){
				e.printStackTrace();
			}
		}

		try{
			//	返回
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 获取封面图片列表
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-12
	*/
	@RequestMapping(value = "/coverList.map")
	public void getCoverList(HttpServletRequest request, HttpServletResponse response){
		response.setHeader("Content-type","text/json;charset=UTF-8");

		List<String> fileList = new ArrayList<>();
		JSONObject jsonObject = null;


		// 1获取子文件和目录
		File dir = new File("./src/main/webapp/static/cover");
		File[] files = dir.listFiles();
		//2遍历
		for (File file : files) {
			//3 判断是否是文件 abc.txt
			if (file.isFile()) {
				fileList.add("/shareArticle/static/cover/"+file.getName());

			} else {

			}
		}

		jsonObject = DealUtil.getSuccessJson();
		jsonObject.put("data", fileList);

		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 *@description 上传广告图片
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-18
	*/
	@RequestMapping(value = "/ad.map")
	public void uploadAdController(MultipartFile[] document, HttpSession session, HttpServletResponse response,
								   HttpServletRequest request){
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
		if(!(token.equals(articleService.getTokenByUserId(Integer.parseInt(userId))))
			|| document.length < 1){
			jsonObject = DealUtil.getFailJson();
		}else {
			jsonObject = DealUtil.getSuccessJson();

			int suffix = 1;

			// 获取上传文件的文件名
			for(MultipartFile obj:document){
				//只要两张
				if(suffix > 2){
					break;
				}
				String fileName = obj.getOriginalFilename();

				//处理文件名
				String suffixName = fileName.substring(fileName.lastIndexOf("."));

				//获取服务器中document目录路径
				ServletContext servletContext = session.getServletContext();
				String documentPath = servletContext.getRealPath("static/ad");

				String finalPath = documentPath+File.separator+"banner"+suffix+suffixName;


				//上传
				try {
					obj.transferTo(new File(finalPath));
				}catch(IOException e){
					e.printStackTrace();
				}
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
	 *@description 删除违规图片
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-18
	 */
	@RequestMapping(value = "/deleteFile.map")
	public void uploadAdController(HttpServletResponse response,
								   HttpSession session,
								   HttpServletRequest request){
		response.setHeader("Content-type","text/json;charset=UTF-8");
		String userId = null;
		String token = null;

		JSONObject jsonObject = null;

		String filePath = request.getParameter("deleteObj");

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

			//删除选中的图片
			String path = filePath.substring(filePath.lastIndexOf(File.separator));

			//获取服务器中document目录路径
			ServletContext servletContext = session.getServletContext();
			String documentPath = servletContext.getRealPath("static/cover");

			File file = new File(documentPath+path);

			//如果存在就把图片删除
			if(file.exists()){
				file.delete();
			}
		}

		//返回
		try{
			response.getOutputStream().write(jsonObject.toJSONString().getBytes());
		}catch (IOException e){
			e.printStackTrace();
		}
	}
}
