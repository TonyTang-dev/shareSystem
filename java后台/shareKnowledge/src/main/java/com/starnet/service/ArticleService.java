package com.starnet.service;

import com.alibaba.fastjson.JSONObject;
import com.starnet.dao.ArticleDao;
import com.starnet.dao.UserDao;
import com.starnet.entities.ArticleEntity;
import com.starnet.entities.ArticleOperationSortEntity;
import com.starnet.entities.MainCommentEntity;
import com.starnet.entities.RootTypeEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("articleService")
public class ArticleService {
	@Resource(name = "articleDao")
	private ArticleDao articleDao;

	@Resource(name = "userDao")
	private UserDao userDao;


	/**
	 *@description 获取文章列表
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-5
	*/
	public List<ArticleEntity> getArticleListService(int userId){
		return articleDao.getArticleListDao(userId);
	}

	/**
	 *@description 发布文章的service
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-7
	*/
	public boolean publishArticleService(int userID, String title, String content,
										 String articleAbstract, String linkType, String linkTypeIndex, String tag,String cover){
		return articleDao.publishArticleDao(userID, title, content, articleAbstract, linkType, linkTypeIndex, tag,cover);
	}

	/**
	 *@description 发布文章的service
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-7
	 */
	public boolean updateArticleService(int articleId, String title, String content,
										 String articleAbstract, String type, String tag,String cover){
		return articleDao.updateArticleDao(articleId, title, content, articleAbstract, type, tag,cover);
	}

	/**
	 *@description 根据文章ID获取文章数据
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-9
	*/
	public ArticleEntity getArticleById(int id){
		return articleDao.getArticleById(id);
	}

	/**
	 *@description 根据文章ID删除文章内容
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-11
	*/
	public boolean deleteArticleService(int id){
		return articleDao.deleteArticleDao(id);
	}

	/**
	 *@description 根据文章标题搜索文章
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-11
	*/
	public List<ArticleEntity> getArticleByTitleService(String title){
		return articleDao.getArticleByTitleDao(title);
	}

	/**
	 *@description 验证操作者身份
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-11
	*/
	public String getTokenByUserId(int id){
		return userDao.getTokenByIdDao(id);
	}
	/**
	 *@description 验证操作者身份
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-11
	 */
	public String getTokenByUserAcc(String acc){
		return userDao.getTokenByAccDao(acc);
	}

	/**
	 *@description 根据文章ID进行点赞
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-12
	*/
	public boolean likeArticleService(String articleId, String userId){
		int id = Integer.parseInt(articleId);
		int user = Integer.parseInt(userId);
		return articleDao.likeArticleDao(id, user);
	}

	/**
	 *@description 获取评论表
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-15
	*/
	public List<MainCommentEntity> getAllCommentListService(){
		return articleDao.getAllCommentListDao();
	}

	/**
	 *@description 根据文章ID获取评论表
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-15
	 */
	public List<MainCommentEntity> getCommentListService(int id){
		return articleDao.getCommentListDao(id);
	}

	/**
	 *@description 按照文章ID添加评论
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-15
	*/
	public boolean addCommentService(int articleId, int userId, String commentContent){
		return articleDao.addCommentDao(articleId, userId, commentContent);
	}

	/**
	 *@description 回复评论
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-15
	*/
	public boolean replyCommentService(int linkArticleId, int userId, int linkCommentId,int replyToId, String commentContent){
		return articleDao.replyCommentDao(linkArticleId, userId, linkCommentId,replyToId, commentContent);
	}

	/**
	 *@description 获取所有文章分类
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-16
	*/
	public List<RootTypeEntity> getBlogSortService(){
		return articleDao.getBlogSortDao();
	}

	/**
	 *@description 添加新的文章分类
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-17
	*/
	public boolean addNewSortService(String newSort, String userId){
		JSONObject jsonObject = JSONObject.parseObject(newSort);
		// System.out.println(jsonObject);

		String root[] = jsonObject.get("root").toString().split(";");
		String second[] = jsonObject.get("second").toString().split(";");
		String finalSort[] = jsonObject.get("final").toString().split(";");

		//分类实例
		ArticleOperationSortEntity entity = new ArticleOperationSortEntity();
		if(root.length > 1){
			entity.setRootId(Integer.parseInt(root[0].split("~")[1]));
			entity.setRootName(root[1]);
		}else{
			entity.setRootId(0);
		}
		if(second.length > 1){
			entity.setSecondId(Integer.parseInt(second[0].split("~")[1]));
			entity.setSecondName(second[1]);
		}else{
			entity.setSecondId(0);
		}
		if(finalSort.length > 1){
			entity.setFinalId(Integer.parseInt(finalSort[0].split("~")[1]));
			entity.setFinalName(finalSort[1]);
		}else{
			entity.setFinalId(0);
		}

		//只有是新分类的时候才进行添加
		if(entity.isNew()){
			return articleDao.addNewSortDao(entity, userId);
		}else{
			return false;
		}
	}

	/**
	 *@description 根据ID删除分类
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-17
	*/
	public boolean deleteSortService(String deleteSort){
		return articleDao.deleteSortDao(deleteSort.split(","));
	}

	/**
	 *@description 根据ID修改分类名称
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-17
	*/
	public boolean updateSortService(String updateId, String updateName){
		String temp[] = updateId.split("-");
		return articleDao.updateSortDao(temp[0], temp[1],updateName);
	}

	/**
	 *@description 根据评论ID删除评论
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-18
	*/
	public boolean deleteCommentService(String deleteKey){
		String temp[] = deleteKey.split("~");
		if(temp.length < 2){
			return false;
		}
		String aspect = temp[0];
		String id = temp[1];

		return articleDao.deleteCommentDao(aspect, id);
	}

	/**
	 *@description 获取前十文章
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-19
	 */
	public List<ArticleEntity> getTopArticleService(){
		return articleDao.getTopArticleDao();
	}
}
