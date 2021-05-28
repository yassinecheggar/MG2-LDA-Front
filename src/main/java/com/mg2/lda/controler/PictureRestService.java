package com.mg2.lda.controler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mg2.lda.models.Feedback;
import com.mg2.lda.models.Picture;
import com.mg2.lda.repository.ActiviteRepository;
import com.mg2.lda.repository.FeedbackRepository;
import com.mg2.lda.repository.PictureRepository;

@RestController
@RequestMapping("Picture")
@CrossOrigin("*")
public class PictureRestService {

	

	@Autowired
	PictureRepository repo;
	

	
	@GetMapping("/GetAll")
	public List<Picture> getAll(){
		return repo.findAll();
	}


	@PostMapping("/Add")
	public boolean add(@RequestBody Picture picture) {

		if(repo.save(picture) != null) {
			return true;
		}
		return false;
	}

	@PutMapping("/Update/{id}")
	public boolean Update(@RequestBody Picture picture ,@PathVariable Integer id) {

		picture.setId(id);
		if(repo.save(picture) != null) {
			return true;
		}
		return false;
	}

}
