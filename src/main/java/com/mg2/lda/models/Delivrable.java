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
public class Delivrable implements Serializable{

	@Id @GeneratedValue
	private  Integer  id;  
	private String delivrable;
	
	@JsonIgnore
	@OneToMany(mappedBy="delivrableFeed",fetch=FetchType.LAZY)
	private List<Feedback> feedbacksList;
	
	
	@JsonIgnore
	@OneToMany(mappedBy="delivrableBest",fetch=FetchType.LAZY)
	private List<BestPractice>bestPracticeslist;
	
	@JsonIgnore
	@OneToMany(mappedBy="delivrableQuest",fetch=FetchType.LAZY)
	private List<Question> questionsList;
	
	public Delivrable() {
		// TODO Auto-generated constructor stub
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getDelivrable() {
		return delivrable;
	}


	public void setDelivrable(String delivrable) {
		this.delivrable = delivrable;
	}


	public List<BestPractice> getBestPracticeslist() {
		return bestPracticeslist;
	}


	public void setBestPracticeslist(List<BestPractice> bestPracticeslist) {
		this.bestPracticeslist = bestPracticeslist;
	}
	
		public void setFeedbacksList(List<Feedback> feedbacksList) {
		this.feedbacksList = feedbacksList;
	}


	public List<Question> getQuestionsList() {
		return questionsList;
	}


	public void setQuestionsList(List<Question> questionsList) {
		this.questionsList = questionsList;
	}


	public List<Feedback> getFeedbacksList() {
		return feedbacksList;
	}


	@Override
	public String toString() {
		return "Delivrable [id=" + id + ", delivrable=" + delivrable + ", feedbacksList=" + feedbacksList
				+ ", bestPracticeslist=" + bestPracticeslist + ", questionsList=" + questionsList + "]";
	}




	

}
