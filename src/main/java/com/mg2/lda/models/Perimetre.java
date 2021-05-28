package com.mg2.lda.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.print.Doc;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Perimetre implements Serializable{

	
	@Id @GeneratedValue
	private Integer id; 
	private String perimetre; 
	
	@ManyToOne
	@JoinColumn
	private Area PerimetreArea;
	
	@JsonIgnore
	@OneToMany(mappedBy="DocumentPerimetre",fetch=FetchType.LAZY)
	private List<Document>documentsList; 
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPerimetre() {
		return perimetre;
	}

	public void setPerimetre(String perimetre) {
		this.perimetre = perimetre;
	}


	public List<Document> getDocumentsList() {
		return documentsList;
	}

	public void setDocumentsList(List<Document> documentsList) {
		this.documentsList = documentsList;
	}

	public Area getPerimetreArea() {
		return PerimetreArea;
	}

	public void setPerimetreArea(Area perimetreArea) {
		PerimetreArea = perimetreArea;
	}

	@Override
	public String toString() {
		return "Perimetre [id=" + id + ", perimetre=" + perimetre + ", PerimetreArea=" + PerimetreArea
				+ ", documentsList=" + documentsList + "]";
	}

	

}
