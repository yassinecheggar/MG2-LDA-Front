package com.mg2.lda.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;


@Entity
public class Zone implements Serializable{



	@Id @GeneratedValue
	private Integer  id;
	private String zone;
	
	
	@OneToMany(mappedBy="documentZon",fetch=FetchType.LAZY)
	private List<Document > documentsList;
	
	
	
	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public String getZone() {
		return zone;
	}


	public List<Document> getDocumentsList() {
		return documentsList;
	}



	public void setDocumentsList(List<Document> documentsList) {
		this.documentsList = documentsList;
	}


	public void setZone(String zone) {
		this.zone = zone;
	}



	@Override
	public String toString() {
		return "Zone [id=" + id + ", zone=" + zone + ", documentsList=" + documentsList + "]";
	}



	public Zone() {
		// TODO Auto-generated constructor stub
	}

}
