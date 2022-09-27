package com.starnet.dao;

import com.starnet.Util.DbUtil;
import com.starnet.entities.UserEntity;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Repository("userDao")
public class UserDao {
	@Resource(name = "dbUtil")
	private DbUtil dbUtil;


	/**
	 *@description 登录验证
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-26
	*/
	public int loginDao(String acc, String pass, String token){
		String sql = "select id from sysUser where acc=? and pass=?";

		//修改token
		String updateToken = "update sysUser set token=? where acc=?";

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;

		try{
			//查询结果
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, acc);
			pstm.setString(2, pass);

			rs = pstm.executeQuery();

			if(rs.next()){
				//修改token
				pstm = conn.prepareStatement(updateToken);
				pstm.setString(1, token);
				pstm.setString(2, acc);
				int addToken = pstm.executeUpdate();

				if(addToken > 0) {
					return rs.getInt("id");
				}
			}
		}catch(SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
		}

		return -1;
	}

	/**
	 *@description 退出登录
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-8
	*/
	public boolean loginoutDao(String acc){
		String sql = "update sysUser set token=? where acc=?";

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		int rs = 0;

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, "");
			pstm.setString(2, acc);

			rs = pstm.executeUpdate();
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}

		if(rs > 0){
			return true;
		}
		return false;
	}


	/**
	 *@description 根据用户名查阅token值
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-8
	*/
	public String getTokenByAccDao(String acc){
		String sql = "select token from sysUser where acc=?";

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;

		String result = "";

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, acc);

			rs = pstm.executeQuery();

			if(rs.next()){
				result = rs.getString("token");
			}
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
		}

		return  result;
	}

	/**
	 *@description 根据用户名查阅token值
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-8
	 */
	public String getTokenByIdDao(int id){
		String sql = "select token from sysUser where id=?";

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;

		String result = "";

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1, id);

			rs = pstm.executeQuery();

			if(rs.next()){
				result = rs.getString("token");
			}
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
		}

		return  result;
	}


	/**
	 *@description 根据用户名去访问用户数据，也用于添加用户判断账户重名
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-26
	*/
	private UserEntity findUserByAccount(String acc){
		String sql = "select * from sysUser where acc=?";
		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, acc);
			rs = pstm.executeQuery();

			if(rs.next()){
				UserEntity userEntity = new UserEntity();
				userEntity.setId(rs.getInt("id"));
				userEntity.setAcc(rs.getString("acc"));
				userEntity.setPass(rs.getString("pass"));
				userEntity.setGender(rs.getString("gender"));
				userEntity.setPhone(rs.getString("phone"));
				userEntity.setEmail(rs.getString("email"));
				userEntity.setSign(rs.getString("sign"));
				userEntity.setRanking(rs.getInt("ranking"));
				userEntity.setComment(rs.getInt("userComment"));
				userEntity.setBeLiked(rs.getInt("beLiked"));
				userEntity.setAuthority(rs.getString("authority"));
				userEntity.setArticleNum(rs.getInt("articleNum"));
				userEntity.setAvatar(rs.getString("avatar"));
				return userEntity;
			}
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
		}

		return null;
	}

	/**
	 *@description 注册持久操作
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-26
	*/
	public boolean registerDao(String acc, String pass){
		//如果账户已经存在，则注册失败
		if(findUserByAccount(acc) != null){
			return false;
		}

		String sql = "insert into sysUser(acc, pass) values(?,?)";
		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, acc);
			pstm.setString(2, pass);
			int rs = pstm.executeUpdate();


			return true;
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}

		return false;
	}

	/**
	 *@description 获取所有的用户数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-2
	*/
	public List<UserEntity> getAllUserDao(){
		List<UserEntity> userList = new ArrayList<>();
		String sql = "select * from sysUser";
		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;

		try{
			pstm = conn.prepareStatement(sql);
			rs = pstm.executeQuery();

			while(rs.next()){
				UserEntity userEntity = new UserEntity();
				userEntity.setId(rs.getInt("id"));
				userEntity.setAcc(rs.getString("acc"));
				userEntity.setPass(rs.getString("pass"));
				userEntity.setGender(rs.getString("gender"));
				userEntity.setPhone(rs.getString("phone"));
				userEntity.setEmail(rs.getString("email"));
				userEntity.setSign(rs.getString("sign"));
				userEntity.setRanking(rs.getInt("ranking"));
				userEntity.setComment(rs.getInt("userComment"));
				userEntity.setBeLiked(rs.getInt("beLiked"));
				userEntity.setAuthority(rs.getString("authority"));
				userEntity.setArticleNum(rs.getInt("articleNum"));
				userEntity.setAvatar(rs.getString("avatar"));
				userEntity.setExtendMenu(rs.getString("extendMenu"));

				userList.add(userEntity);
			}

			return userList;
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
		}
		return null;
	}

	/**
	 *@description 管理员添加用户
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-3
	*/
	public boolean addUserByManagerDao(UserEntity entity){
		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;

		String sql = "insert into sysUser(acc,pass,gender,authority,phone,email,sign,extendMenu) " +
				"values(?,?,?,?,?,?,?,?)";

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, entity.getAcc());
			pstm.setString(2, entity.getPass());
			pstm.setInt(3, Integer.parseInt(entity.getGender()));
			pstm.setInt(4, Integer.parseInt(entity.getAuthority()));
			pstm.setString(5, entity.getPhone());
			pstm.setString(6, entity.getEmail());
			pstm.setString(7, entity.getSign());
			pstm.setString(8, entity.getExtendMenu());

			int rs = pstm.executeUpdate();

			if(rs == 1){
				return true;
			}else{
				return false;
			}
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}

		return false;
	}

	/**
	 *@description 管理员添加用户
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-3
	 */
	public boolean updateUserByManagerDao(UserEntity entity){
		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;

		String sql = "update sysUser set acc=?,pass=?,gender=?,authority=?,phone=?,email=?,sign=?,extendMenu=? " +
				"where id=?";

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, entity.getAcc());
			pstm.setString(2, entity.getPass());
			pstm.setInt(3, Integer.parseInt(entity.getGender()));
			pstm.setInt(4, Integer.parseInt(entity.getAuthority()));
			pstm.setString(5, entity.getPhone());
			pstm.setString(6, entity.getEmail());
			pstm.setString(7, entity.getSign());
			pstm.setString(8, entity.getExtendMenu());
			pstm.setInt(9, entity.getId());

			int rs = pstm.executeUpdate();

			if(rs == 1){
				return true;
			}else{
				return false;
			}
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}

		return false;
	}

	/**
	 *@description 根据用户ID删除数据库中的数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-3
	*/
	public boolean deleteUserByIdDao(String []deleteList){
		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;

		int rs = 0;

		for(String i:deleteList) {
			String sql = "delete from sysUser where id=?";

			try {
				pstm = conn.prepareStatement(sql);
				pstm.setInt(1, Integer.parseInt(i.trim()));

				rs = pstm.executeUpdate();
			}catch (SQLException e){
				e.printStackTrace();
			}
		}

		//释放数据库链接
		dbUtil.releaseAll(conn, pstm, null);

		if(rs == 1){
			return true;
		}else{
			return false;
		}
	}

	/**
	 *@description 根据用户名查询用户数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-3
	*/
	public UserEntity queryUserByNameDao(String account){
		return findUserByAccount(account);
	}

	/**
	 *@description 根据用户账户重置密码并返回（密码用随机10位数字组成）
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-17
	*/
	public String resetAndGetPassByAccDao(String acc){
		String sql = "update sysUser set pass=? where acc=?";

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		int rs = 0;

		//	生成随机密码
		String randomPass = "";
		Random random = new Random();
		for (int i = 0; i < 10; i++) {
			randomPass += String.valueOf(random.nextInt(10));
		}

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, randomPass);
			pstm.setString(2, acc);
			rs = pstm.executeUpdate();
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}

		if(rs > 0){
			return randomPass;
		}else{
			return "";
		}
	}

	/**
	 *@description 重排积分排名
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-19
	*/
	public boolean reRankCredit(){
		String reRankSql = "update credit c set c.ranking=(select d.pm from (select linkUser,@rank:=@rank+1 as pm from credit a,(select @rank:=0) b order by totalCredit desc ) d where c.linkUser=d.linkUser)";
		String assignRankSql = "update sysUser a set ranking=(select ranking from credit b where a.id=b.linkUser)";

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;

		try{
			pstm = conn.prepareStatement(reRankSql);
			pstm.executeUpdate();

			//赋值排名
			pstm = conn.prepareStatement(assignRankSql);
			pstm.executeUpdate();
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}

		return true;
	}
}
