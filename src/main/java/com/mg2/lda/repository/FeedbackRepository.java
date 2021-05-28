package com.mg2.lda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mg2.lda.models.Feedback;

@Repository
public interface FeedbackRepository  extends JpaRepository<Feedback, Integer>{

	
}
