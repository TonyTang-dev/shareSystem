package com.starnet.entities;

import java.util.List;

public class MainCommentEntity {
	private int id;
	private String linkArticle;
	private String linkUser;
	private int linkUserId;
	private String key;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public int getLinkUserId() {
		return linkUserId;
	}

	public void setLinkUserId(int linkUserId) {
		this.linkUserId = linkUserId;
	}

	private String avatar;

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = "/shareArticle/static/avatar/"+avatar;
	}

	private String commentContent;
	private List<SubCommentEntity> SubCommentList;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLinkArticle() {
		return linkArticle;
	}

	public void setLinkArticle(String linkArticle) {
		this.linkArticle = linkArticle;
	}

	public String getLinkUser() {
		return linkUser;
	}

	public void setLinkUser(String linkUser) {
		this.linkUser = linkUser;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	public List<SubCommentEntity> getSubCommentList() {
		return SubCommentList;
	}

	public void setSubCommentList(List<SubCommentEntity> subCommentList) {
		SubCommentList = subCommentList;
	}
}
