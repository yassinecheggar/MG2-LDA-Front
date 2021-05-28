package com.mg2.lda.models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Comment implements Serializable{

	@Id @GeneratedValue
	 private  Integer id;
	 
	 @ManyToOne
	 @JoinColumn
	 private  Document documentComment;
	 
	 private  String  comment; 
	 
	 private  Date dateComment;
	 
	 
	 @ManyToOne
	 @JoinColumn
	 private User userComment ;
	 
	 

	 
	public Integer getId() {
		return id;
	}




	public void setId(Integer id) {
		this.id = id;
	}



	public String getComment() {
		return comment;
	}




	public void setComment(String comment) {
		this.comment = comment;
	}





	@Override
	public String toString() {
		return "Comment [id=" + id + ", documentComment=" + documentComment + ", comment=" + comment + ", dateComment="
				+ dateComment + ", userComment=" + userComment + "]";
	}




	public Document getDocumentComment() {
		return documentComment;
	}




	public void setDocumentComment(Document documentComment) {
		this.documentComment = documentComment;
	}




	public User getUserComment() {
		return userComment;
	}




	public void setUserComment(User userComment) {
		this.userComment = userComment;
	}




	public Comment(Integer id, Document documentComment, String comment, User userComment) {
		super();
		this.id = id;
		this.documentComment = documentComment;
		this.comment = comment;
		this.userComment = userComment;
	}




	public Date getDateComment() {
		return dateComment;
	}




	public void setDateComment(Date dateComment) {
		this.dateComment = dateComment;
	}




	public Comment() {
		// TODO Auto-generated constructor stub
	}
	

}
