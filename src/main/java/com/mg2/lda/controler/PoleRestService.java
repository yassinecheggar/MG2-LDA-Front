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

import com.mg2.lda.models.Activite;
import com.mg2.lda.models.Pole;
import com.mg2.lda.models.Zone;
import com.mg2.lda.repository.ActiviteRepository;
import com.mg2.lda.repository.PoleRepository;

@RestController
@RequestMapping("Pole")
@CrossOrigin("*")
public class PoleRestService {

	

	@Autowired
	PoleRepository repo;
	
	@GetMapping("/GetAll")
	public List<Pole> getAll(){
		return repo.findAll();
	}

	
	 
    @GetMapping("/GetById/{id}")
   	public Pole getById(@PathVariable Integer id){
    	
    Pole p =repo.findById(id).get();
    	if(p!=null) {
   		return repo.findById(id).get();}
    	return null;
   	}


	@PostMapping("/Add")
	public boolean add(@RequestBody Pole pole) {

		if(repo.save(pole) != null) {
			return true;
		}
		return false;
	}

	@PutMapping("/Update/{id}")
	public boolean Update(@RequestBody Pole pole,@PathVariable Integer id) {

		pole.setId(id);
		if(repo.save(pole) != null) {
			return true;
		}
		return false;
	}

	@DeleteMapping("/Delete/{id}")
	public void delete(@PathVariable Integer id) {
		repo.deleteById(id) ;

	}
}
