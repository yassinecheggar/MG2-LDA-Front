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

import com.mg2.lda.models.Comment;
import com.mg2.lda.models.Zone;
import com.mg2.lda.repository.ActiviteRepository;
import com.mg2.lda.repository.CommentRepository;

@RestController
@RequestMapping("Comment")
@CrossOrigin("*")
public class CommentRestService {

	

	@Autowired
	CommentRepository repo;
	
	@GetMapping("/GetAll")
	public List<Comment> getAll(){
		return repo.findAll();
	}


	@PostMapping("/Add")
	public boolean add(@RequestBody Comment comment) {

		if(repo.save(comment) != null) {
			return true;
		}
		return false;
	}

	@PutMapping("/Update/{id}")
	public boolean Update(@RequestBody Comment comment,@PathVariable Integer id) {

		comment.setId(id);
		if(repo.save(comment) != null) {
			return true;
		}
		return false;
	}

	@DeleteMapping("/Delete/{id}")
	public void delete(@PathVariable Integer id) {
		repo.deleteById(id) ;

	}

	

}
