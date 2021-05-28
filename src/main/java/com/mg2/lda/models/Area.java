package com.mg2.lda.models;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Area implements Serializable{

	@Override
	public String toString() {
		return "Area [id=" + id + ", areadesc=" + areadesc + ", perimetresList=" + perimetresList + ", documentsList="
				+ documentsList + "]";
	}



	@Id @GeneratedValue
	private Integer id; 
	private String areadesc; 
	
	
	@JsonIgnore
	@OneToMany(mappedBy="PerimetreArea",fetch=FetchType.LAZY)
	private List<Perimetre>perimetresList;

	
	
	@JsonIgnore
	@OneToMany(mappedBy="DocumentArea",fetch=FetchType.LAZY)
	private List<Document>documentsList; 
	
	
	
	
	public Area() {
		// TODO Auto-generated constructor stub
	}



	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}





	public String getAreadesc() {
		return areadesc;
	}



	public void setAreadesc(String areadesc) {
		this.areadesc = areadesc;
	}





	public List<Document> getDocumentsList() {
		return documentsList;
	}



	public void setDocumentsList(List<Document> documentsList) {
		this.documentsList = documentsList;
	}






	



}
