package com.starnet.service;

import com.starnet.dao.UserDao;
import com.starnet.entities.UserEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("userService")
public class UserService {
	@Resource(name = "userDao")
	private UserDao userDao;


	/**
	 *@description 登录服务验证
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-26
	*/
	public int loginService(String acc, String pass, String token){
		return userDao.loginDao(acc, pass, token);
	}


	/**
	 *@description 退出登录
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-8
	*/
	public boolean loginoutService(String acc){
		return userDao.loginoutDao(acc);
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
	 *@description 注册服务
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-26
	*/
	public boolean registerService(String acc, String pass){
		return userDao.registerDao(acc, pass);
	}

	/**
	 *@description 获取所有用户的数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-2
	*/
	public List<UserEntity> getAllUserService(){
		return userDao.getAllUserDao();
	}


	/**
	 *@description 管理员添加用户
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-3
	*/
	public boolean addUserByManager(String[] parameters){
		UserEntity entity = new UserEntity();

		//设置用户实体
		entity.setAcc(parameters[0]);
		entity.setPass(parameters[1]);
		entity.setGender(parameters[2]);
		entity.setAuthority(parameters[3]);
		entity.setPhone(parameters[4]);
		entity.setEmail(parameters[5]);
		entity.setSign(parameters[6]);
		entity.setExtendMenu(parameters[7]);

		return userDao.addUserByManagerDao(entity);
	}

	/**
	 *@description 管理员修改用户
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-3
	 */
	public boolean updateUserByManager(String[] parameters){
		UserEntity entity = new UserEntity();

		//设置用户实体
		entity.setAcc(parameters[0]);
		entity.setPass(parameters[1]);
		entity.setGender(parameters[2]);
		entity.setAuthority(parameters[3]);
		entity.setPhone(parameters[4]);
		entity.setEmail(parameters[5]);
		entity.setSign(parameters[6]);
		entity.setId(Integer.parseInt(parameters[7]));
		entity.setExtendMenu(parameters[8]);

		return userDao.updateUserByManagerDao(entity);
	}

	/**
	 *@description 根据用户id删除用户数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-3
	*/
	public boolean deleteUserByIdService(String []deleteList){
		return userDao.deleteUserByIdDao(deleteList);
	}

	/**
	 *@description 根据用户名查询用户数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-3
	*/
	public UserEntity queryUserByNameService(String account){
		return userDao.queryUserByNameDao(account);
	}

	/**
	 *@description 根据用户帐号重置密码并返回
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-17
	*/
	public String resetAndGetPassByAccService(String acc){
		return userDao.resetAndGetPassByAccDao(acc);
	}

	/**
	 *@description 重排积分排名
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-19
	*/
	public boolean reRankCredit(){
		return userDao.reRankCredit();
	}

}
