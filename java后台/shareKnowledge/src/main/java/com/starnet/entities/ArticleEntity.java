package com.starnet.entities;

public class ArticleEntity {
	// 作者id
	private int userID;

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public int getArticleId() {
		return articleId;
	}

	public void setArticleId(int articleId) {
		this.articleId = articleId;
	}

	private String acc;
	private String avatar;
	private String sign;
	private String content;
	private String articleType;
	private String title;
	private int articleId;
	private String cover;
	private String articleTag;
	private String articleAbstract;
	private int isLiked;

	public int getIsLiked() {
		return isLiked;
	}

	public void setIsLiked(int isLiked) {
		this.isLiked = isLiked;
	}

	public String getArticleTag() {
		return articleTag;
	}

	public void setArticleTag(String articleTag) {
		this.articleTag = articleTag;
	}

	public String getArticleAbstract() {
		return articleAbstract;
	}

	public void setArticleAbstract(String articleAbstract) {
		this.articleAbstract = articleAbstract;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = "/shareArticle/static/cover/"+cover;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	private int beScaned;
	private int beLiked;
	private int beComment;

	public String getAcc() {
		return acc;
	}

	public void setAcc(String acc) {
		this.acc = acc;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = "/shareArticle/static/avatar/"+avatar;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getArticleType() {
		return articleType;
	}

	public void setArticleType(String articleType) {
		this.articleType = articleType;
	}

	public int getBeScaned() {
		return beScaned;
	}

	public void setBeScaned(int beScaned) {
		this.beScaned = beScaned;
	}

	public int getBeLiked() {
		return beLiked;
	}

	public void setBeLiked(int beLiked) {
		this.beLiked = beLiked;
	}

	public int getBeComment() {
		return beComment;
	}

	public void setBeComment(int beComment) {
		this.beComment = beComment;
	}
}
