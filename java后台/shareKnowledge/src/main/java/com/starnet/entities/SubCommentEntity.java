package com.starnet.entities;

public class SubCommentEntity {
	private int id;
	private int linkComment;
	private String linkUser;
	private int linkUserId;

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

	private String replyTo;
	private String commentContent;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getLinkComment() {
		return linkComment;
	}

	public void setLinkComment(int linkComment) {
		this.linkComment = linkComment;
	}

	public String getLinkUser() {
		return linkUser;
	}

	public void setLinkUser(String linkUser) {
		this.linkUser = linkUser;
	}

	public String getReplyTo() {
		return replyTo;
	}

	public void setReplyTo(String replyTo) {
		this.replyTo = replyTo;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}
}
