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
public class Type implements Serializable{

	@Id @GeneratedValue
	private Integer  id;
	private String  typedoc;
	
	
	
	@JsonIgnore
	@OneToMany(mappedBy="typeDocument",fetch=FetchType.LAZY)
	private List<Document > documentsList;
	
	


	public Type() {
	
	}




	public Integer getId() {
		return id;
	}




	public void setId(Integer id) {
		this.id = id;
	}




	public String getTypedoc() {
		return typedoc;
	}




	public void setTypedoc(String typedoc) {
		this.typedoc = typedoc;
	}




	public List<Document> getDocumentsList() {
		return documentsList;
	}




	public void setDocumentsList(List<Document> documentsList) {
		this.documentsList = documentsList;
	}




	@Override
	public String toString() {
		return "Type [id=" + id + ", typedoc=" + typedoc + ", documentsList=" + documentsList + "]";
	}

	
	
	
}
