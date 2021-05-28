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
	private Author Docummentauthor;


	@ManyToOne
	@JoinColumn
	private Direction Documentdirection;

	@ManyToOne
	@JoinColumn
	private Perimetre DocumentPerimetre;



	@ManyToOne
	@JoinColumn
	private Area DocumentArea ; 

	public Document() {

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

	public List<Comment> getCommentsList() {
		return commentsList;
	}

	public void setCommentsList(List<Comment> commentsList) {
		this.commentsList = commentsList;
	}

	public List<Modif> getModification() {
		return modification;
	}

	public void setModification(List<Modif> modification) {
		this.modification = modification;
	}

	public Type getTypeDocument() {
		return typeDocument;
	}

	public void setTypeDocument(Type typeDocument) {
		this.typeDocument = typeDocument;
	}

	public Zone getDocumentZon() {
		return documentZon;
	}

	public void setDocumentZon(Zone documentZon) {
		this.documentZon = documentZon;
	}

	public Pole getDocumentPole() {
		return documentPole;
	}

	public void setDocumentPole(Pole documentPole) {
		this.documentPole = documentPole;
	}

	public Author getDocummentauthor() {
		return Docummentauthor;
	}

	public void setDocummentauthor(Author docummentauthor) {
		Docummentauthor = docummentauthor;
	}

	public Direction getDocumentdirection() {
		return Documentdirection;
	}

	public void setDocumentdirection(Direction documentdirection) {
		Documentdirection = documentdirection;
	}

	public Perimetre getDocumentPerimetre() {
		return DocumentPerimetre;
	}

	public void setDocumentPerimetre(Perimetre documentPerimetre) {
		DocumentPerimetre = documentPerimetre;
	}

	public Area getDocumentArea() {
		return DocumentArea;
	}

	public void setDocumentArea(Area documentArea) {
		DocumentArea = documentArea;
	}

	public Document(Integer id, String nom, String ref, String langue, String trainning, int version, String status,
			String lien, Date pubDate, String valideur, List<Comment> commentsList, List<Modif> modification,
			Type typeDocument, Zone documentZon, Pole documentPole, Author docummentauthor, Direction documentdirection,
			Perimetre documentPerimetre, Area documentArea) {
		super();
		this.id = id;
		this.nom = nom;
		Ref = ref;
		this.langue = langue;
		this.trainning = trainning;
		this.version = version;
		this.status = status;
		this.lien = lien;
		PubDate = pubDate;
		Valideur = valideur;
		this.commentsList = commentsList;
		this.modification = modification;
		this.typeDocument = typeDocument;
		this.documentZon = documentZon;
		this.documentPole = documentPole;
		Docummentauthor = docummentauthor;
		Documentdirection = documentdirection;
		DocumentPerimetre = documentPerimetre;
		DocumentArea = documentArea;
	}

	@Override
	public String toString() {
		return "Document [id=" + id + ", nom=" + nom + ", Ref=" + Ref + ", langue=" + langue + ", trainning="
				+ trainning + ", version=" + version + ", status=" + status + ", lien=" + lien + ", PubDate=" + PubDate
				+ ", Valideur=" + Valideur + ", commentsList=" + commentsList + ", modification=" + modification
				+ ", typeDocument=" + typeDocument + ", documentZon=" + documentZon + ", documentPole=" + documentPole
				+ ", Docummentauthor=" + Docummentauthor + ", Documentdirection=" + Documentdirection
				+ ", DocumentPerimetre=" + DocumentPerimetre + ", DocumentArea=" + DocumentArea + "]";
	}





}
