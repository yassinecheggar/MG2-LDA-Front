package com.mg2.lda.controler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mg2.lda.models.BestPractice;
import com.mg2.lda.models.Feedback;
import com.mg2.lda.repository.ActiviteRepository;
import com.mg2.lda.repository.BestPracticeRepository;

@RestController
@RequestMapping("BestPractice")
@CrossOrigin("*")
public class BestPracticeRestService {

	

	@Autowired
	BestPracticeRepository repo;
	
	@GetMapping("/GetAll")
	public List<BestPractice> getAll(){
		return repo.findAll();
	}


	@PostMapping("/Add")
	public boolean add(@RequestBody BestPractice practice) {

		if(repo.save(practice) != null) {
			return true;
		}
		return false;
	}

	@PutMapping("/Update/{id}")
	public boolean Update(@RequestBody BestPractice bestPractice ,@PathVariable Integer id) {

		bestPractice.setId(id);
		if(repo.save(bestPractice) != null) {
			return true;
		}
		return false;
	}

	
	@DeleteMapping("/Delete/{id}")
	public void delete(@PathVariable Integer id) {

		repo.deleteById(id) ;


	}
}
