package com.starnet.entities;

public class UserEntity {
	private int id;
	private String acc;
	private String pass;
	private String sign;
	private String gender;
	private String phone;
	private String email;
	private int articleNum;
	private int beLiked;
	private int comment;
	private int ranking;
	private String authority;
	private String avatar;
	private String token;
	private String extendMenu;
	private int credit;

	public int getCredit() {
		return credit;
	}

	public void setCredit(int credit) {
		this.credit = credit;
	}

	public String getExtendMenu() {
		return extendMenu;
	}

	public void setExtendMenu(String extendMenu) {
		this.extendMenu = extendMenu;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = "/shareArticle/static/avatar/"+avatar;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAcc() {
		return acc;
	}

	public void setAcc(String acc) {
		this.acc = acc;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = "".equals(sign)?"这个人什么都没有写！":sign;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = "女".equals(gender)?"0":"1";
		this.gender = "0".equals(gender)?"0":"1";
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = "".equals(phone)?"无":phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = "".equals(email)?"无":email;
	}

	public int getArticleNum() {
		return articleNum;
	}

	public void setArticleNum(int articleNum) {
		this.articleNum = articleNum;
	}

	public int getBeLiked() {
		return beLiked;
	}

	public void setBeLiked(int beLiked) {
		this.beLiked = beLiked;
	}

	public int getComment() {
		return comment;
	}

	public void setComment(int comment) {
		this.comment = comment;
	}

	public int getRanking() {
		return ranking;
	}

	public void setRanking(int ranking) {
		this.ranking = ranking;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = "管理员".equals(authority)?"1":"超级管理员".equals(authority)?"2":"0";
		this.authority = "1".equals(authority)?"1":"2".equals(authority)?"2":"0";
	}
}
