package com.starnet.entities;

public class ArticleOperationSortEntity {
	private int rootId;
	private String rootName;
	private int secondId;
	private String secondName;
	private int finalId;
	private String finalName;

	public boolean isNew(){
		if(rootId<0 || secondId<0 || finalId<0){
			return true;
		}else{
			return false;
		}
	}

	public int getRootId() {
		return rootId;
	}

	public void setRootId(int rootId) {
		this.rootId = rootId;
	}

	public String getRootName() {
		return rootName;
	}

	public void setRootName(String rootName) {
		this.rootName = rootName;
	}

	public int getSecondId() {
		return secondId;
	}

	public void setSecondId(int secondId) {
		this.secondId = secondId;
	}

	public String getSecondName() {
		return secondName;
	}

	public void setSecondName(String secondName) {
		this.secondName = secondName;
	}

	public int getFinalId() {
		return finalId;
	}

	public void setFinalId(int finalId) {
		this.finalId = finalId;
	}

	public String getFinalName() {
		return finalName;
	}

	public void setFinalName(String finalName) {
		this.finalName = finalName;
	}
}
