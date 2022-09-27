package com.starnet.entities;

import java.util.List;

public class RootTypeEntity {
	private int id;
	private String typeName;
	private int num;
	private List<SecondTypeEntity> linkSecondType;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public List<SecondTypeEntity> getLinkSecondType() {
		return linkSecondType;
	}

	public void setLinkSecondType(List<SecondTypeEntity> linkSecondType) {
		this.linkSecondType = linkSecondType;
	}
}
