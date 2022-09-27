package com.starnet.service;

import com.starnet.dao.InitAccessDao;
import com.starnet.dao.UserDao;
import com.starnet.entities.ArticleTypeEntity;
import com.starnet.entities.BasicInforEntity;
import com.starnet.entities.UserEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("initAccessService")
public class InitAccessService {
	//初始化数据库操作装配
	@Resource(name = "initAccessDao")
	private InitAccessDao initAccessDao;

	@Resource(name = "userDao")
	private UserDao userDao;

	/**
	 *@description 初期当前用户测试
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-2
	*/
	public UserEntity getMeService(String acc){
		return initAccessDao.getMeDao(acc);
	}


	/**
	 *@description 根据用户名获取token值
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-8
	 */
	public String getTokenByAccService(String acc){
		return userDao.getTokenByAccDao(acc);
	}


	/**
	 *@description 获取文章分类列表
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-26
	*/
	public List<ArticleTypeEntity> getArticleTypeListService(){
		return initAccessDao.getArticleTypeList();
	}


	/**
	 *@description 获取积分前十列表
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-1
	 */
	public List<UserEntity> getCreditTopTen(){
		return initAccessDao.getCreditTopTenDao();
	}

	/**
	 *@description 获取用户管理基本数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-10
	*/
	public BasicInforEntity getManageBasicService(){
		return initAccessDao.getManageBasicDao();
	}
}
