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

import com.mg2.lda.models.Author;
import com.mg2.lda.models.Pole;
import com.mg2.lda.repository.ActiviteRepository;
import com.mg2.lda.repository.AuthorRepository;

@RestController
@RequestMapping("Author")
@CrossOrigin("*")
public class AuthorRestService {

	

	@Autowired
	AuthorRepository repo;
	
	@GetMapping("/GetAll")
	public List<Author> getAll(){
		return repo.findAll();
	}


	@PostMapping("/Add")
	public boolean add(@RequestBody Author author) {

		if(repo.save(author) != null) {
			return true;
		}
		return false;
	}

	@PutMapping("/Update/{id}")
	public boolean Update(@RequestBody Author author,@PathVariable Integer id) {

		author.setId(id);
		if(repo.save(author) != null) {
			return true;
		}
		return false;
	}

	@DeleteMapping("/Delete/{id}")
	public void delete(@PathVariable Integer id) {
		repo.deleteById(id) ;

	}

}
