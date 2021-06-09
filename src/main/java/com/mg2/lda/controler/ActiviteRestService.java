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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import com.mg2.lda.models.Activite;
import com.mg2.lda.repository.ActiviteRepository;

@RestController
@RequestMapping("Activite")
@CrossOrigin("*")
public class ActiviteRestService {


	@Autowired
	ActiviteRepository repo;


    @GetMapping("/GetAll")
	public List<Activite> getAllBesoinPC(){
		return repo.findAll();
	}
    
    @GetMapping("/GetById/{id}")
   	public Activite getById(@PathVariable Integer id){
   		return repo.findById(id).get();
   	}


	@PostMapping("/Add")
	public boolean addActivite(@RequestBody Activite activite) {

		if(repo.save(activite) != null) {
			return true;
		}
		return false;
	}

	@PutMapping("/Update/{id}")
	public boolean addBesoinPC(@RequestBody Activite activite,@PathVariable Integer id) {

		activite.setId(id);
		if(repo.save(activite) != null) {
			return true;
		}
		return false;
	}

	@DeleteMapping("/Delete/{id}")
	public void delete(@PathVariable Integer id) {

		repo.deleteById(id) ;


	}
}
