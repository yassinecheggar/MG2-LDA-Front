package com.mg2.lda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mg2.lda.models.Perimetre;
import com.mg2.lda.models.Picture;
import com.mg2.lda.models.Pole;

@Repository
public interface PictureRepository  extends JpaRepository<Picture, Integer>{

	

}
