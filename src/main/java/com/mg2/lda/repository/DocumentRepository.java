package com.mg2.lda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mg2.lda.models.Document;

@Repository
public interface DocumentRepository  extends JpaRepository<Document, Integer>{

	

}
