package com.starnet.entities;

import java.util.List;

public class SecondTypeEntity {
	private int id;
	private String typeName;
	private int num;
	private List<FinalTypeEntity> linkFinalType;

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

	public List<FinalTypeEntity> getLinkFinalType() {
		return linkFinalType;
	}

	public void setLinkFinalType(List<FinalTypeEntity> linkFinalType) {
		this.linkFinalType = linkFinalType;
	}
}
