package com.starnet.dao;

import com.starnet.Util.DbUtil;
import com.starnet.entities.ArticleTypeEntity;
import com.starnet.entities.BasicInforEntity;
import com.starnet.entities.UserEntity;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository("initAccessDao")
public class InitAccessDao {
	//将数据库实例装配进来
	@Resource(name = "dbUtil")
	private DbUtil dbUtil;


	/**
	 *@description 初期用于当前用户数据测试
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-2
	*/
	public UserEntity getMeDao(String acc){
		String sql = "select * from sysUser where acc=?";
		Connection conn = null;
		conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;
		UserEntity mineEntity = new UserEntity();

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, acc);
			rs = pstm.executeQuery();

			while(rs.next()){
				mineEntity.setId(rs.getInt("id"));
				mineEntity.setAcc(rs.getString("acc"));
				mineEntity.setPass(rs.getString("pass"));
				mineEntity.setGender(rs.getString("gender"));
				mineEntity.setPhone(rs.getString("phone"));
				mineEntity.setEmail(rs.getString("email"));
				mineEntity.setSign(rs.getString("sign"));
				mineEntity.setRanking(rs.getInt("ranking"));
				mineEntity.setComment(rs.getInt("userComment"));
				mineEntity.setBeLiked(rs.getInt("beLiked"));
				mineEntity.setAuthority(rs.getString("authority"));
				mineEntity.setArticleNum(rs.getInt("articleNum"));
				mineEntity.setAvatar(rs.getString("avatar"));
				mineEntity.setExtendMenu(rs.getString("extendMenu"));
			}
		}catch(SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
		}
		return mineEntity;
	}


	/**
	 *@description 获取文章分类列表
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-26
	*/
	public List<ArticleTypeEntity> getArticleTypeList(){
		List<ArticleTypeEntity> typeList = new ArrayList<>();

		String sql = "select * from articleType";
		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;

		try{
			pstm = conn.prepareStatement(sql);
			rs = pstm.executeQuery();

			while(rs.next()){
				ArticleTypeEntity entity = new ArticleTypeEntity();
				entity.setId(rs.getInt("id"));
				entity.setType(rs.getString("type"));
				entity.setNum(rs.getInt("num"));
				typeList.add(entity);
			}
		}catch(SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
		}

		return typeList;
	}


	/**
	 *@description 获取积分前十榜
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-1
	 */
	public List<UserEntity> getCreditTopTenDao(){
		List<UserEntity> topTenList = new ArrayList<>();

		String sql = "select * from queryTopTen";
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
				userEntity.setCredit(rs.getInt("credit"));
				topTenList.add(userEntity);
			}
		}catch(SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
		}

		return topTenList;
	}

	/**
	 *@description 获取用户管理基本信息表数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-10
	*/
	public BasicInforEntity getManageBasicDao(){
		String sql = "select * from basicInfor";
		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;

		BasicInforEntity entity = new BasicInforEntity();

		try{
			pstm = conn.prepareStatement(sql);
			rs = pstm.executeQuery();

			if(rs.next()){
				entity.setId(rs.getInt("id"));
				entity.setTotalUser(rs.getInt("totalUser"));
				entity.setTotalArticle(rs.getInt("totalArticle"));
				entity.setDayRegister(rs.getInt("dayRegister"));
				entity.setDayAccess(rs.getInt("dayAccess"));
				entity.setCommonUser(rs.getInt("commonUser"));
				entity.setCommonAdmin(rs.getInt("commonAdmin"));
				entity.setSuperAdmin(rs.getInt("superAdmin"));
			}
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
		}

		return entity;
	}
}
