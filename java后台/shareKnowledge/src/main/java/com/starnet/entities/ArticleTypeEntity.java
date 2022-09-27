package com.starnet.entities;

/**
 *@description 文章类型实体
 *@className: tang
 *@author: TYF
 *@date: 22-7-26
*/
public class ArticleTypeEntity {
	private int id;
	private String type;
	private int num;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}
}
