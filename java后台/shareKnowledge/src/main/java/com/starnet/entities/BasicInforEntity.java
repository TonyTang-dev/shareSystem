package com.starnet.entities;

public class BasicInforEntity {
	private int id;
	private int totalUser;
	private int totalArticle;
	private int dayRegister;
	private int dayAccess;
	private int commonUser;
	private int commonAdmin;
	private int superAdmin;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTotalUser() {
		return totalUser;
	}

	public void setTotalUser(int totalUser) {
		this.totalUser = totalUser;
	}

	public int getTotalArticle() {
		return totalArticle;
	}

	public void setTotalArticle(int totalArticle) {
		this.totalArticle = totalArticle;
	}

	public int getDayRegister() {
		return dayRegister;
	}

	public void setDayRegister(int dayRegister) {
		this.dayRegister = dayRegister;
	}

	public int getDayAccess() {
		return dayAccess;
	}

	public void setDayAccess(int dayAccess) {
		this.dayAccess = dayAccess;
	}

	public int getCommonUser() {
		return commonUser;
	}

	public void setCommonUser(int commonUser) {
		this.commonUser = commonUser;
	}

	public int getCommonAdmin() {
		return commonAdmin;
	}

	public void setCommonAdmin(int commonAdmin) {
		this.commonAdmin = commonAdmin;
	}

	public int getSuperAdmin() {
		return superAdmin;
	}

	public void setSuperAdmin(int superAdmin) {
		this.superAdmin = superAdmin;
	}
}
