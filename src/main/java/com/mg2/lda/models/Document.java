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
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Document implements Serializable{

	@Id @GeneratedValue
	private Integer id;
	private String nom;
	private String Ref; 


	private  String langue;

	private   String trainning;
	private int version;

	private  String status ;  
	private  String lien ;

	private Date PubDate;

	private String Valideur ; 

	@JsonIgnore
	@OneToMany(mappedBy="documentComment",fetch=FetchType.LAZY)
	private List<Comment>commentsList;


	@JsonIgnore
	@OneToMany(mappedBy="documentMod",fetch=FetchType.LAZY)
	private List<Modif > modification;

	@ManyToOne
	@JoinColumn
	private Type typeDocument;


	@ManyToOne
	@JoinColumn
	private Zone documentZon;


	@ManyToOne
	@JoinColumn
	private Pole documentPole;


	@ManyToOne
	@JoinColumn
	private Author docummentauthor;


	@ManyToOne
	@JoinColumn
	private Direction documentdirection;

	@ManyToOne
	@JoinColumn
	private Perimetre DocumentPerimetre;
	@ManyToOne
	@JoinColumn
	private Activite documentActivite;


	@ManyToOne
	@JoinColumn
	private Area DocumentArea ;



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



	public String getRef() {
		return Ref;
	}



	public void setRef(String ref) {
		Ref = ref;
	}



	public String getLangue() {
		return langue;
	}



	public void setLangue(String langue) {
		this.langue = langue;
	}



	public String getTrainning() {
		return trainning;
	}



	public void setTrainning(String trainning) {
		this.trainning = trainning;
	}



	public int getVersion() {
		return version;
	}



	public void setVersion(int version) {
		this.version = version;
	}



	public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
	}



	public String getLien() {
		return lien;
	}



	public void setLien(String lien) {
		this.lien = lien;
	}



	public Date getPubDate() {
		return PubDate;
	}



	public void setPubDate(Date pubDate) {
		PubDate = pubDate;
	}



	public String getValideur() {
		return Valideur;
	}



	public void setValideur(String valideur) {
		Valideur = valideur;
	}



	public Type getTypeDocument() {
		return typeDocument;
	}



	public void setTypeDocument(Type typeDocument) {
		this.typeDocument = typeDocument;
	}





	public Activite getDocumentActivite() {
		return documentActivite;
	}



	public void setDocumentActivite(Activite documentActivite) {
		this.documentActivite = documentActivite;
	}



	public Direction getDocumentdirection() {
		return documentdirection;
	}



	public void setDocumentdirection(Direction documentdirection) {
		this.documentdirection = documentdirection;
	}



	public Pole getDocumentPole() {
		return documentPole;
	}



	public void setDocumentPole(Pole documentPole) {
		this.documentPole = documentPole;
	}



	public Perimetre getDocumentPerimetre() {
		return DocumentPerimetre;
	}



	public void setDocumentPerimetre(Perimetre documentPerimetre) {
		DocumentPerimetre = documentPerimetre;
	}



	public List<Modif> getModification() {
		return modification;
	}



	public void setModification(List<Modif> modification) {
		this.modification = modification;
	}



	public List<Comment> getCommentsList() {
		return commentsList;
	}



	public void setCommentsList(List<Comment> commentsList) {
		this.commentsList = commentsList;
	}



	public Author getDocummentauthor() {
		return docummentauthor;
	}



	public void setDocummentauthor(Author docummentauthor) {
		this.docummentauthor = docummentauthor;
	}




	
	
}
