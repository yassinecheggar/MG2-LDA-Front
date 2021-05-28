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
public class User implements Serializable{

	@Id @GeneratedValue
	private  Integer id;
	private  String  nom; 
	private  String  prenom ; 
	private  String  email;
	private  String  pwd;
	private  String prev;
	
	
	
	@JsonIgnore
	@OneToMany(mappedBy="userFeedback",fetch=FetchType.LAZY)
	private  List<Feedback>feedbackslist;
	
	
	@JsonIgnore
	@OneToMany(mappedBy="userBestPractice",fetch=FetchType.LAZY)
	private  List<BestPractice> bestPracticesList;
	
	@JsonIgnore
	@OneToMany(mappedBy="userQuest",fetch=FetchType.LAZY)
	private  List<Question> questionsList;
	
	
	
	 @JsonIgnore
	@OneToMany(mappedBy="userComment",fetch=FetchType.LAZY)
	private  List<Comment> commentsList;
	
	
	@JsonIgnore
	@OneToMany(mappedBy="userMod",fetch=FetchType.LAZY)
	private List<Modif> modificationsList;
	
	

	
	public User() {
		// TODO Auto-generated constructor stub
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


	public String getPwd() {
		return pwd;
	}


	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	
	public List<BestPractice> getBestPracticesList() {
		return bestPracticesList;
	}


	public void setBestPracticesList(List<BestPractice> bestPracticesList) {
		this.bestPracticesList = bestPracticesList;
	}


	public List<Feedback> getFeedbackslist() {
		return feedbackslist;
	}


	public void setFeedbackslist(List<Feedback> feedbackslist) {
		this.feedbackslist = feedbackslist;
	}


	public List<Question> getQuestionsList() {
		return questionsList;
	}


	public void setQuestionsList(List<Question> questionsList) {
		this.questionsList = questionsList;
	}


	@Override
	public String toString() {
		return "User [id=" + id + ", nom=" + nom + ", prenom=" + prenom + ", email=" + email + ", pwd=" + pwd
				+ ", prev=" + prev + ", feedbackslist=" + feedbackslist + ", bestPracticesList=" + bestPracticesList
				+ ", questionsList=" + questionsList + ", commentsList=" + commentsList + ", modificationsList="
				+ modificationsList + "]";
	}


	public List<Comment> getCommentsList() {
		return commentsList;
	}


	public void setCommentsList(List<Comment> commentsList) {
		this.commentsList = commentsList;
	}


	public List<Modif> getModificationsList() {
		return modificationsList;
	}


	public void setModificationsList(List<Modif> modificationsList) {
		this.modificationsList = modificationsList;
	}


	public String getPrev() {
		return prev;
	}


	public void setPrev(String prev) {
		this.prev = prev;
	}

	
	
}
