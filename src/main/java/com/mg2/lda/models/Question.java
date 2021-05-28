package com.mg2.lda.models;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Question implements Serializable{

	@Id @GeneratedValue
	private  Integer   id;
	private  String  decsiption;
	

	@ManyToOne
	@JoinColumn
	private User userQuest ; 
	 
	
	@ManyToOne
	@JoinColumn
	private Delivrable delivrableQuest;
	
	@ManyToOne
	@JoinColumn
	private Activite  activiteQuest ;
	
	
	@OneToMany(mappedBy="questionimage",fetch=FetchType.LAZY)
	private List<Picture> pictureList;
	
	@OneToMany(mappedBy="questionFeed",fetch=FetchType.LAZY)
	private List<Feedback> feedbacksList;
	
	private String ProblemType;
	private  Date date;
	
	private String phase;
	
	private String Status;
	
	public Question() {
		// TODO Auto-generated constructor stub
	}


	
	public List<Feedback> getFeedbacksList() {
		return feedbacksList;
	}



	public void setFeedbacksList(List<Feedback> feedbacksList) {
		this.feedbacksList = feedbacksList;
	}



	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getDecsiption() {
		return decsiption;
	}


	public void setDecsiption(String decsiption) {
		this.decsiption = decsiption;
	}


	public User getUserQuest() {
		return userQuest;
	}


	public void setUserQuest(User userQuest) {
		this.userQuest = userQuest;
	}


	public Delivrable getDelivrableQuest() {
		return delivrableQuest;
	}


	public void setDelivrableQuest(Delivrable delivrableQuest) {
		this.delivrableQuest = delivrableQuest;
	}


	public Activite getActiviteQuest() {
		return activiteQuest;
	}


	public void setActiviteQuest(Activite activiteQuest) {
		this.activiteQuest = activiteQuest;
	}


	public List<Picture> getImagesList() {
		return pictureList;
	}


	public void setImagesList(List<Picture> imagesList) {
		this.pictureList = imagesList;
	}


	public String getProblemType() {
		return ProblemType;
	}


	public void setProblemType(String problemType) {
		ProblemType = problemType;
	}


	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}


	public String getPhase() {
		return phase;
	}



	public void setPhase(String phase) {
		this.phase = phase;
	}


	@Override
	public String toString() {
		return "Question [id=" + id + ", decsiption=" + decsiption + ", userQuest=" + userQuest + ", delivrableQuest="
				+ delivrableQuest + ", activiteQuest=" + activiteQuest + ", pictureList=" + pictureList
				+ ", feedbacksList=" + feedbacksList + ", ProblemType=" + ProblemType + ", date=" + date + ", phase="
				+ phase + ", Status=" + Status + "]";
	}


	public List<Picture> getPictureList() {
		return pictureList;
	}


	public void setPictureList(List<Picture> pictureList) {
		this.pictureList = pictureList;
	}


	public String getStatus() {
		return Status;
	}


	public void setStatus(String status) {
		Status = status;
	}
	
	
	

}
