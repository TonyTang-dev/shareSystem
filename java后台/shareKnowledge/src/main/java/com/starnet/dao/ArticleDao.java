package com.starnet.dao;


import com.mysql.cj.protocol.ResultsetRow;
import com.starnet.Util.DbUtil;
import com.starnet.Util.DealUtil;
import com.starnet.entities.*;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository("articleDao")
public class ArticleDao {
	@Resource(name = "dbUtil")
	private DbUtil dbUtil;


	/**
	 *@description 获取文章展示列表
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-5
	*/
	public List<ArticleEntity> getArticleListDao(int userId){
		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;

		String sql = "select *,(select id from likes where linkUserId=? and " +
				"linkArticleId=b.id limit 1) isLiked from queryBlogGalaxy b";

		List<ArticleEntity> articleList = new ArrayList<>();

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1, userId);
			rs = pstm.executeQuery();

			while (rs.next()){
				ArticleEntity entity = new ArticleEntity();
				entity.setUserID(rs.getInt("userID"));
				entity.setArticleId(rs.getInt("id"));
				entity.setAcc(rs.getString("acc"));
				entity.setAvatar(rs.getString("avatar"));
				entity.setSign(rs.getString("sign"));
				entity.setTitle(rs.getString("title"));
				entity.setContent(rs.getString("content"));
				entity.setCover(rs.getString("cover"));
				entity.setBeLiked(rs.getInt("beLiked"));
				entity.setBeComment(rs.getInt("beComment"));
				entity.setBeScaned(rs.getInt("beScaned"));
				entity.setArticleType(rs.getString("articleType"));
				entity.setIsLiked(rs.getInt("isLiked"));
				articleList.add(entity);
			}
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
		}

		return articleList;
	}

	/**
	 *@description 根据文章类型调整统计数量
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-9
	*/
	private boolean adjustTypeNum(String []typeIndexs, Connection conn, PreparedStatement pstm){
		if(typeIndexs.length < 1){
			System.out.println("[INFO]--文章类型数量没有更新对象");
			return false;
		}
		if("".equals(typeIndexs[0])) {
			System.out.println("[INFO]--文章类型数量没有更新对象");
			return false;
		}

		//将“I~5”类型的字符串解析为ID，用层级去对应修改的表
		// List<Integer> rootList = new ArrayList<>();
		// List<Integer> secondList = new ArrayList<>();
		// List<Integer> finalList = new ArrayList<>();
		String rootList = "";
		String secondList = "";
		String finalList = "";

		for(String i:typeIndexs){
			String key = i.split("~")[0];
			int id = Integer.parseInt(i.split("~")[1]);
			if("I".equals(key)){
				rootList+=(id+",");
			}else if("II".equals(key)){
				secondList+=(id+",");
			}else{
				finalList+=(id+",");
			}
		}
		//去掉最后一个都好
		rootList = DealUtil.strTrim(rootList);
		secondList = DealUtil.strTrim(secondList);
		finalList = DealUtil.strTrim(finalList);

		rootList = "".equals(rootList)?"''":rootList;
		secondList = "".equals(secondList)?"''":secondList;
		finalList = "".equals(finalList)?"''":finalList;

		//sql操作
		String rootSql = "update rootType set num=num+1 where id in ("+rootList+")";
		String secondSql = "update secondType set num=num+1 where id in ("+secondList+")";
		String finalSql = "update finalType set num=num+1 where id in ("+finalList+")";

		//根据二级、三级结果修改总表数据
		String updateSecond = "update secondType set num=num+1 where id in (select linkSecondId from finalType where id in ("+finalList+"))";
		String updateRoot = "update rootType set num=num+1 where id in (select linkRootId from finalType where id in ("+finalList+"))";


		// System.out.println(rootSql+"\n"+secondSql+"\n"+finalSql+"\n"+updateRoot+"\n"+updateSecond);

		try {
			pstm = conn.prepareStatement(rootSql);
			pstm.executeUpdate();
			pstm = conn.prepareStatement(secondSql);
			pstm.executeUpdate();
			pstm = conn.prepareStatement(finalSql);
			pstm.executeUpdate();
			pstm = conn.prepareStatement(updateSecond);
			pstm.executeUpdate();
			pstm = conn.prepareStatement(updateRoot);
			int rs = pstm.executeUpdate();

			if(rs > 0){
				return true;
			}else{
				return false;
			}
		}catch (SQLException e){
			e.printStackTrace();
		}
		return true;
	}

	/**
	 *@description 发布文章
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-7
	*/
	public boolean publishArticleDao(int userID, String title, String content,
									 String articleAbstract, String linkType, String linkTypeIndex, String tag,String cover){
		String sql = "insert into article(pub,title,content,articleType,articleAbstract,articleTag,cover) values(?,?,?,?,?,?,?)";

		// 判断文章类型
		String[] typeIndexs = linkTypeIndex.split(",");

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		int rs = 0;
		int updateRs = 0;

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1, userID);
			pstm.setString(2, title);
			pstm.setString(3, content);
			pstm.setString(4, "".equals(linkType)?"未分类":linkType);
			pstm.setString(5, articleAbstract);
			pstm.setString(6, "".equals(tag)?"默认":tag);
			pstm.setString(7, cover);

			rs = pstm.executeUpdate();

			// 增加文章数量
			if(typeIndexs.length > 0){
				adjustTypeNum(typeIndexs, conn, pstm);
			}
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}

		if(rs == 0){
			return false;
		}
		return true;
	}

	/**
	 *@description 修改文章
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-7
	 */
	public boolean updateArticleDao(int articleID, String title, String content,
									 String articleAbstract, String type, String tag,String cover){
		String sql = "update article set title=?,content=?,articleType=?,articleAbstract=?,articleTag=?,cover=?" +
				" where id=?";

		// 判断文章类型
		String[] types = type.split(",");

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		int rs = 0;
		int updateRs = 0;

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, title);
			pstm.setString(2, content);
			pstm.setString(3, "".equals(type)?"默认":type);
			pstm.setString(4, articleAbstract);
			pstm.setString(5, "".equals(tag)?"默认":tag);
			pstm.setString(6, cover);
			pstm.setInt(7, articleID);

			rs = pstm.executeUpdate();
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}
		// if(rs == 0){
		// 	return false;
		// }
		//先默认修改成功
		return true;
	}

	/**
	 *@description 删除文章
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-11
	*/
	public boolean deleteArticleDao(int id){
		String sql = "delete from article where id=?";
		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		int rs = 0;

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1, id);
			rs = pstm.executeUpdate();
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}

		if(rs > 0){
			return true;
		}else{
			return false;
		}
	}

	/**
	 *@description 根据文章标题搜索文章
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-11
	*/
	public List<ArticleEntity> getArticleByTitleDao(String title){
		String sql = "select * from queryBlogGalaxy where title like ? or acc like ? or articleType like ?";

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;
		List<ArticleEntity> resultList = new ArrayList<>();

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, "%"+title+"%");
			pstm.setString(2, "%"+title+"%");
			pstm.setString(3, "%"+title+"%");

			rs = pstm.executeQuery();

			while(rs.next()){
				ArticleEntity entity = new ArticleEntity();
				entity.setUserID(rs.getInt("userID"));
				entity.setArticleId(rs.getInt("id"));
				entity.setAcc(rs.getString("acc"));
				entity.setAvatar(rs.getString("avatar"));
				entity.setSign(rs.getString("sign"));
				entity.setTitle(rs.getString("title"));
				entity.setContent(rs.getString("content"));
				entity.setCover(rs.getString("cover"));
				entity.setBeLiked(rs.getInt("beLiked"));
				entity.setBeComment(rs.getInt("beComment"));
				entity.setBeScaned(rs.getInt("beScaned"));
				entity.setArticleType(rs.getString("articleType"));
				resultList.add(entity);
			}
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
		}

		return resultList;
	}

	/**
	 *@description 根据文章ID获取文章数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-9
	*/
	public ArticleEntity getArticleById(int id){
		String sql = "select * from queryArticleById where id=?";

		//默认获取一次文章当作是一次浏览
		String scanSql = "update article set beScaned=beScaned+1 where id=?";

		//文章被浏览一次+2分
		String creditSql = "update credit set totalCredit=totalCredit+2 " +
				"where linkUser=(select pub from article where id="+String.valueOf(id)+")";

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;

		int scanRs = 0;

		int creditRs = 0;

		ArticleEntity articleEntity = new ArticleEntity();
		try{
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1, id);

			rs = pstm.executeQuery();

			if(rs.next()) {
				articleEntity.setArticleId(rs.getInt("id"));
				articleEntity.setUserID(rs.getInt("pub"));
				articleEntity.setAcc(rs.getString("acc"));
				articleEntity.setTitle(rs.getString("title"));
				articleEntity.setCover(rs.getString("cover"));
				articleEntity.setContent(rs.getString("content"));
				articleEntity.setArticleType(rs.getString("articleType"));
				articleEntity.setArticleTag(rs.getString("articleTag"));
				articleEntity.setArticleAbstract(rs.getString("articleAbstract"));
			}

			// 修改浏览数
			pstm = conn.prepareStatement(scanSql);
			pstm.setInt(1, id);
			scanRs = pstm.executeUpdate();

			// 浏览后作者+2分
			pstm = conn.prepareStatement(creditSql);
			creditRs = pstm.executeUpdate();
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
		}

		return articleEntity;
	}

	/**
	 *@description 根据文章ID进行点赞操作
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-12
	*/
	public boolean likeArticleDao(int id, int userId){
		String sql = null;

		String creditSql = null;

		//添加点赞列表
		String queryLike = "select * from likes where linkUserId=? and linkArticleId=?";
		String insertLikeSql = "insert into likes(linkUserId,linkArticleId) values(?,?)";
		//删除点赞
		String deleteLike = "delete from likes where linkUserId=? and linkArticleId=?";

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rsSet = null;
		int rs = 0;
		int creditRs = 0;

		try{
			//查询是否已点赞
			pstm = conn.prepareStatement(queryLike);
			pstm.setInt(1, userId);
			pstm.setInt(2, id);
			rsSet = pstm.executeQuery();
			if(!rsSet.next()) {
				//插入点赞条目
				pstm = conn.prepareStatement(insertLikeSql);
				pstm.setInt(1, userId);
				pstm.setInt(2, id);
				pstm.executeUpdate();

				//生成sql语句
				sql = "update article set beLiked=beLiked+1 where id=?";
				creditSql = "update credit set totalCredit=totalCredit+3 " +
						"where linkUser=(select pub from article where id="+String.valueOf(id)+")";
			}else{
				//插入点赞条目
				pstm = conn.prepareStatement(deleteLike);
				pstm.setInt(1, userId);
				pstm.setInt(2, id);
				pstm.executeUpdate();

				//生成sql语句
				sql = "update article set beLiked=beLiked-1 where id=?";
				creditSql = "update credit set totalCredit=totalCredit-3 " +
						"where linkUser=(select pub from article where id="+String.valueOf(id)+")";
			}

			//操作点赞数量和分数统计
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1, id);

			rs = pstm.executeUpdate();

			pstm = conn.prepareStatement(creditSql);
			creditRs = pstm.executeUpdate();

		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}

		//	判断结果
		if(rs > 0 && creditRs > 0){
			return true;
		}else{
			return false;
		}
	}

	/**
	 *@description 根据文章ID获取评论表
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-15
	 */
	public List<MainCommentEntity> getAllCommentListDao(){
		String mainSql = "select * from mainCommentView";
		String subSql = "select * from subCommentView";

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;

		ResultSet subRs = null;

		//结果
		List<MainCommentEntity> resultList = new ArrayList<>();

		try{
			pstm = conn.prepareStatement(mainSql);
			rs = pstm.executeQuery();

			while(rs.next()){
				MainCommentEntity mainCommentEntity = new MainCommentEntity();
				int mainId = rs.getInt("id");
				mainCommentEntity.setKey("I~"+mainId);
				mainCommentEntity.setLinkUser(rs.getString("acc"));
				mainCommentEntity.setLinkUserId(rs.getInt("linkUserId"));
				mainCommentEntity.setCommentContent(rs.getString("commentContent"));
				mainCommentEntity.setAvatar(rs.getString("avatar"));

				//加入结果集合
				resultList.add(mainCommentEntity);
			}
			pstm = conn.prepareStatement(subSql);
			rs = pstm.executeQuery();

			while(rs.next()){
				MainCommentEntity mainCommentEntity = new MainCommentEntity();
				int mainId = rs.getInt("id");
				mainCommentEntity.setKey("II~"+mainId);
				mainCommentEntity.setLinkUser(rs.getString("linkUser"));
				mainCommentEntity.setLinkUserId(rs.getInt("linkUserId"));
				mainCommentEntity.setCommentContent(rs.getString("commentContent"));
				mainCommentEntity.setAvatar(rs.getString("avatar"));

				//加入结果集合
				resultList.add(mainCommentEntity);
			}
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
			dbUtil.releaseAll(null, null, subRs);
		}

		return resultList;
	}

	/**
	 *@description 根据文章ID获取评论表
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-15
	*/
	public List<MainCommentEntity> getCommentListDao(int id){
		String mainSql = "select * from mainCommentView where linkArticle=?";
		String subSql = "select * from subCommentView where linkComment=?";

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;

		ResultSet subRs = null;

		//结果
		List<MainCommentEntity> resultList = new ArrayList<>();

		try{
			pstm = conn.prepareStatement(mainSql);
			pstm.setInt(1, id);

			rs = pstm.executeQuery();

			while(rs.next()){
				MainCommentEntity mainCommentEntity = new MainCommentEntity();
				int mainId = rs.getInt("id");
				mainCommentEntity.setId(mainId);
				mainCommentEntity.setLinkUser(rs.getString("acc"));
				mainCommentEntity.setLinkUserId(rs.getInt("linkUserId"));
				mainCommentEntity.setCommentContent(rs.getString("commentContent"));
				mainCommentEntity.setAvatar(rs.getString("avatar"));

				List<SubCommentEntity> subList = new ArrayList<>();
				pstm = conn.prepareStatement(subSql);
				pstm.setInt(1, mainId);

				subRs = pstm.executeQuery();

				while(subRs.next()){
					SubCommentEntity subCommentEntity = new SubCommentEntity();
					subCommentEntity.setId(subRs.getInt("id"));
					subCommentEntity.setLinkComment(subRs.getInt("linkComment"));
					subCommentEntity.setLinkUser(subRs.getString("linkUser"));
					subCommentEntity.setLinkUserId(rs.getInt("linkUserId"));
					subCommentEntity.setReplyTo(subRs.getString("replyTo"));
					subCommentEntity.setCommentContent(subRs.getString("commentContent"));
					subCommentEntity.setAvatar(subRs.getString("avatar"));
					subList.add(subCommentEntity);
				}
				mainCommentEntity.setSubCommentList(subList);

				//加入结果集合
				resultList.add(mainCommentEntity);
			}
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
			dbUtil.releaseAll(null, null, subRs);
		}

		return resultList;
	}

	/**
	 *@description 根据文章ID添加评论
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-15
	*/
	public boolean addCommentDao(int articleId, int userId, String commentContent){
		String sql = "insert into mainComment(linkArticle,linkUser,commentContent) values(?,?,?)";

		//被评论一次+1分
		String creditBeCommentSql = "update credit set totalCredit=totalCredit+1 " +
				"where linkUser=(select pub from article where id="+String.valueOf(articleId)+")";
		//评论的人也+1分
		String creditCommentSql = "update credit set totalCredit=totalCredit+1 " +
				"where linkUser="+String.valueOf(userId);

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		int rs = 0;
		int creditBeCommentRs = 0;
		int creditCommentRs = 0;

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1, articleId);
			pstm.setInt(2, userId);
			pstm.setString(3, commentContent);

			rs = pstm.executeUpdate();

			//被评论加分
			pstm=conn.prepareStatement(creditBeCommentSql);
			creditBeCommentRs = pstm.executeUpdate();

			// 评论者加分
			pstm = conn.prepareStatement(creditCommentSql);
			creditCommentRs = pstm.executeUpdate();
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}

		if(rs > 0 && creditBeCommentRs > 0 && creditCommentRs > 0){
			return true;
		}else{
			return false;
		}
	}

	/**
	 *@description 回复评论
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-15
	*/
	public boolean replyCommentDao(int linkArticleId, int userId, int linkCommentId,int replyToId, String commentContent){
		String sql = "insert into subComment(linkArticle,linkUser,linkComment,replyTo,commentContent)" +
				" values(?,?,?,?,?)";
		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		int rs = 0;

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1, linkArticleId);
			pstm.setInt(2, userId);
			pstm.setInt(3, linkCommentId);
			pstm.setInt(4, replyToId);
			pstm.setString(5, commentContent);

			rs = pstm.executeUpdate();
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}

		if(rs > 0){
			return true;
		}else{
			return false;
		}
	}

	/**
	 *@description 获取文章分类
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-16
	*/
	public List<RootTypeEntity> getBlogSortDao(){
		String rootSql = "select * from rootType where id != 5";
		String secondSql = "select * from secondType where linkRootId=?";
		String finalSql = "select * from finalType where linkSecondId=?";

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rootRs = null;
		ResultSet secondRs = null;
		ResultSet finalRs = null;

		List<RootTypeEntity> rootTypeList = new ArrayList<>();

		try{
			//查询主分类
			pstm = conn.prepareStatement(rootSql);
			rootRs = pstm.executeQuery();
			while (rootRs.next()){
				RootTypeEntity rootTypeEntity = new RootTypeEntity();
				rootTypeEntity.setId(rootRs.getInt("id"));
				rootTypeEntity.setNum(rootRs.getInt("num"));
				rootTypeEntity.setTypeName(rootRs.getString("typeName"));

				//添加次级分类
				List<SecondTypeEntity> secondTypeList = new ArrayList<>();
				pstm = conn.prepareStatement(secondSql);
				pstm.setInt(1, rootRs.getInt("id"));
				secondRs = pstm.executeQuery();
				while(secondRs.next()){
					SecondTypeEntity secondTypeEntity = new SecondTypeEntity();
					secondTypeEntity.setId(secondRs.getInt("id"));
					secondTypeEntity.setNum(secondRs.getInt("num"));
					secondTypeEntity.setTypeName(secondRs.getString("typeName"));

					//添加三级分类
					List<FinalTypeEntity> finalTypeList = new ArrayList<>();
					pstm = conn.prepareStatement(finalSql);
					pstm.setInt(1, secondRs.getInt("id"));
					finalRs = pstm.executeQuery();
					while(finalRs.next()){
						FinalTypeEntity finalTypeEntity = new FinalTypeEntity();
						finalTypeEntity.setId(finalRs.getInt("id"));
						finalTypeEntity.setNum(finalRs.getInt("num"));
						finalTypeEntity.setTypeName(finalRs.getString("typeName"));
						finalTypeList.add(finalTypeEntity);
					}
					secondTypeEntity.setLinkFinalType(finalTypeList);
					secondTypeList.add(secondTypeEntity);
				}
				rootTypeEntity.setLinkSecondType(secondTypeList);
				rootTypeList.add(rootTypeEntity);
			}

		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rootRs);
			dbUtil.releaseAll(null, null, secondRs);
			dbUtil.releaseAll(null, null, finalRs);
		}

		return rootTypeList;
	}

	/**
	 *@description 添加新分类
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-17
	*/
	public boolean addNewSortDao(ArticleOperationSortEntity entity, String userId){
		String rootSql = "insert into rootType(typeName) values(?)";
		String secondSql = "insert into secondType(linkRootId,typeName) values(?,?)";
		String finalSql = "insert into finalType(linkRootId,linkSecondId,typeName) values(?,?,?)";

		Connection conn  =dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rootSet = null;
		ResultSet secondSet = null;
		int rootRs = 0;
		int secondRs = 0;
		int finalRs = 0;

		//链接的ID
		int linkRootId = entity.getRootId();
		int linkSecondId =  entity.getSecondId();

		try{
			if(entity.getRootId() < 0) {
				pstm = conn.prepareStatement(rootSql);
				pstm.setString(1,"{\""+userId+System.currentTimeMillis()+"\":\""
						+entity.getRootName()+"\"}");
				rootRs = pstm.executeUpdate();

				//更新rootid值
				rootSet = pstm.executeQuery("select max(id) as id from rootType");
				if(rootSet.next()) {
					linkRootId = rootSet.getInt("id");
				}
			}
			if(entity.getSecondId() < 0){
				pstm = conn.prepareStatement(secondSql);
				pstm.setInt(1, linkRootId);
				pstm.setString(2,"{\""+userId+System.currentTimeMillis()+"\":\""
						+entity.getSecondName()+"\"}");
				secondRs = pstm.executeUpdate();

				//更新rootid值
				secondSet = pstm.executeQuery("select max(id) as id from secondType");
				if(secondSet.next()) {
					linkSecondId = secondSet.getInt("id");
				}
			}
			if(entity.getFinalId() < 0){
				pstm = conn.prepareStatement(finalSql);
				pstm.setInt(1, linkRootId);
				pstm.setInt(2, linkSecondId);
				pstm.setString(3,"{\""+userId+System.currentTimeMillis()+"\":\""
						+entity.getFinalName()+"\"}");
				finalRs = pstm.executeUpdate();
			}
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}

		if(rootRs > 0 || secondRs > 0 || finalRs > 0){
			return true;
		}
		return false;
	}

	/**
	 *@description 根据ID删除分类
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-17
	*/
	public boolean deleteSortDao(String []deleteSort){
		String rootSql = "delete from rootType where id in (";
		String secondSql = "delete from secondType where id in (";
		String finalSql = "delete from finalType where id in (";

		String tempRoot = "";
		String tempSecond = "";
		String tempFinal = "";

		for (String i:deleteSort){
			if("I".equals(i.split("~")[0])){
				tempRoot += (i.split("~")[1]+",");
			}else if("II".equals(i.split("~")[0])){
				tempSecond += (i.split("~")[1]+",");
			}else if("III".equals(i.split("~")[0])){
				tempFinal += (i.split("~")[1]+",");
			}
		}
		//空值检测
		if("".equals(tempRoot)){
			tempRoot = "''";
		}else {
			tempRoot = DealUtil.strTrim(tempRoot);
		}
		if("".equals(tempSecond)){
			tempSecond = "''";
		}else {
			tempSecond = DealUtil.strTrim(tempSecond);
		}
		if("".equals(tempFinal)){
			tempFinal = "''";
		}else {
			tempFinal = DealUtil.strTrim(tempFinal);
		}

		//sql拼接
		rootSql += (tempRoot+")");
		secondSql += (tempSecond+")");
		finalSql += (tempFinal+")");

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		int rootRs = 0;
		int secondRs = 0;
		int finalRs = 0;

		// System.out.println(rootSql+"\n"+secondSql+"\n"+finalSql);

		try{
			pstm = conn.prepareStatement(rootSql);
			rootRs = pstm.executeUpdate();
			pstm = conn.prepareStatement(secondSql);
			secondRs = pstm.executeUpdate();
			pstm = conn.prepareStatement(finalSql);
			finalRs = pstm.executeUpdate();
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, null);
		}

		if(rootRs>0 || secondRs>0 || finalRs>0){
			return true;
		}else{
			return false;
		}
	}

	/**
	 *@description 根据ID修改分类名称
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-17
	*/
	public boolean updateSortDao(String sortKey, String sortId, String newSortName){
		String typeArr[] = sortId.split("~");
		String type = typeArr[0];
		int id = Integer.parseInt(typeArr[1]);

		String sql = null;
		if("I".equals(type)){
			sql = "update rootType set typeName=? where id=?";
		}else if("II".equals(type)){
			sql = "update secondType set typeName=? where id=?";
		}else{
			sql = "update finalType set typeName=? where id=?";
		}

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		int rs = 0;

		try{
			pstm = conn.prepareStatement(sql);
			String param = "{\""+sortKey+"\":\""+newSortName+"\"}";

			pstm.setString(1, param);
			pstm.setInt(2, id);

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
	 *@description 根据评论ID删除评论
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-18
	*/
	public boolean deleteCommentDao(String aspect, String id){
		String sql = null;
		if("I".equals(aspect)){
			sql = "delete from mainComment where id=?";
		}else if("II".equals(aspect)){
			sql = "delete from subComment where id=?";
		}else{
			return false;
		}

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		int rs = 0;

		try{
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1, Integer.parseInt(id));
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
	 *@description 获取前十文章
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-19
	*/
	public List<ArticleEntity> getTopArticleDao(){
		String sql = "select * from articleTopTen";

		Connection conn = dbUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;

		List<ArticleEntity> list = new ArrayList<>();

		try{
			pstm = conn.prepareStatement(sql);
			rs = pstm.executeQuery();

			while(rs.next()){
				ArticleEntity entity = new ArticleEntity();
				entity.setArticleId(rs.getInt("id"));
				entity.setTitle(rs.getString("title"));
				entity.setCover(rs.getString("cover"));
				entity.setAcc(rs.getString("acc"));
				entity.setBeScaned(rs.getInt("beScaned"));
				list.add(entity);
			}
		}catch (SQLException e){
			e.printStackTrace();
		}finally {
			dbUtil.releaseAll(conn, pstm, rs);
		}

		return list;
	}
}