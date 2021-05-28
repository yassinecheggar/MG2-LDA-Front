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
public class Activite implements Serializable{

	@Id @GeneratedValue
	private  Integer id;
	private  String  activite;
	
	
	
	@JsonIgnore
	@OneToMany(mappedBy="activiteFeed",fetch=FetchType.LAZY)
	private  List< Feedback> feedbacksList; 
	
	@JsonIgnore
	@OneToMany(mappedBy="activiteBest",fetch=FetchType.LAZY)
	private  List<BestPractice> bestPracticesList;
	
	

	
	@JsonIgnore
	@OneToMany(mappedBy="activiteQuest",fetch=FetchType.LAZY)
	private  List< Question> questionsList; 
	
	
	

	
	public Activite() {
		// TODO Auto-generated constructor stub
	}




	public Integer getId() {
		return id;
	}




	public void setId(Integer id) {
		this.id = id;
	}




	public String getActivite() {
		return activite;
	}




	public void setActivite(String activite) {
		this.activite = activite;
	}




	public List<BestPractice> getBestPracticesList() {
		return bestPracticesList;
	}




	public void setBestPracticesList(List<BestPractice> bestPracticesList) {
		this.bestPracticesList = bestPracticesList;
	}
	
	
		public List<Question> getQuestionsList() {
		return questionsList;
	}




	public void setQuestionsList(List<Question> questionsList) {
		this.questionsList = questionsList;
	}


	
	@Override
	public String toString() {
		return "Activite [id=" + id + ", activite=" + activite + ", bestPracticesList=" + bestPracticesList
				+ ", feedbacksList=" + feedbacksList + ", questionsList=" + questionsList + "]";
	}

	
	
	


	public List<Feedback> getFeedbacksList() {
		return feedbacksList;
	}




	public void setFeedbacksList(List<Feedback> feedbacksList) {
		this.feedbacksList = feedbacksList;
	}







	
}
