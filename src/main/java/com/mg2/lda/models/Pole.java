package com.mg2.lda.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Pole implements Serializable{

	@Id @GeneratedValue
	private  Integer id;
	private  String  pole;
	
	@JsonIgnore
	@OneToMany(mappedBy="documentPole",fetch=FetchType.LAZY)
	private List<Document > documentsList;
	
	
	
	public Pole() {
		// TODO Auto-generated constructor stub
	}



	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public String getPole() {
		return pole;
	}



	public void setPole(String pole) {
		this.pole = pole;
	}



	public List<Document> getDocumentsList() {
		return documentsList;
	}



	public void setDocumentsList(List<Document> documentsList) {
		this.documentsList = documentsList;
	}



	@Override
	public String toString() {
		return "Pole [id=" + id + ", pole=" + pole + ", documentsList=" + documentsList + "]";
	}
	
	

}
