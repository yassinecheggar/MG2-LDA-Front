package com.mg2.lda.models;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Modif implements Serializable{

	@Id @GeneratedValue
	private Integer id; 
	
	@Temporal(TemporalType.DATE)
	private Date dateModification ; 

	@ManyToOne
	@JoinColumn
	private  User userMod;
	
	@ManyToOne
	@JoinColumn
	private  Document documentMod;
	
	
	
	public Modif() {
		
	}


	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public Date getDateModification() {
		return dateModification;
	}



	public void setDateModification(Date dateModification) {
		this.dateModification = dateModification;
	}



	public User getUserMod() {
		return userMod;
	}



	public void setUserMod(User userMod) {
		this.userMod = userMod;
	}



	public Document getDocumentMod() {
		return documentMod;
	}



	public void setDocumentMod(Document documentMod) {
		this.documentMod = documentMod;
	}



	@Override
	public String toString() {
		return "Modif [id=" + id + ", dateModification=" + dateModification + ", userMod=" + userMod + ", documentMod="
				+ documentMod + "]";
	}

	

}
