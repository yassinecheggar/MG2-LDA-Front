package com.mg2.lda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mg2.lda.models.Question;

@Repository
public interface QuestionRepository  extends JpaRepository<Question, Integer>{

	

}
