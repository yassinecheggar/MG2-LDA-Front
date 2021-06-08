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
public class Author implements Serializable{

	@Id @GeneratedValue
	 private  Integer id;
	
	 private String nom;
	 private String prenom;
	 private String  email;
	 
		
	@JsonIgnore
	@OneToMany(mappedBy="docummentauthor",fetch=FetchType.LAZY)
	 private List<Document>documentList;
	 
	
	
	
	public Author() {

	}




	public Integer getId() {
		return id;
	}




	public void setId(Integer id) {
		this.id = id;
	}




	public String getNom() {
		return nom;
	}




	public void setNom(String nom) {
		this.nom = nom;
	}




	public String getPrenom() {
		return prenom;
	}




	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}




	public String getEmail() {
		return email;
	}




	public void setEmail(String email) {
		this.email = email;
	}




	public List<Document> getDocumentList() {
		return documentList;
	}




	public void setDocumentList(List<Document> documentList) {
		this.documentList = documentList;
	}




	
}
