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

import com.mg2.lda.models.Delivrable;
import com.mg2.lda.models.Direction;
import com.mg2.lda.repository.ActiviteRepository;
import com.mg2.lda.repository.DelivrableRepository;

@RestController
@RequestMapping("Delivrable")
@CrossOrigin("*")
public class DelivrableRestService {

	

	@Autowired
	DelivrableRepository repo;
	
	@GetMapping("/GetAll")
	public List<Delivrable> getAll(){
		return repo.findAll();
	}


	@PostMapping("/Add")
	public boolean add(@RequestBody Delivrable delivrable) {

		if(repo.save(delivrable) != null) {
			return true;
		}
		return false;
	}

	@PutMapping("/Update/{id}")
	public boolean Update(@RequestBody Delivrable direction,@PathVariable Integer id) {

		direction.setId(id);
		if(repo.save(direction) != null) {
			return true;
		}
		return false;
	}

	@DeleteMapping("/Delete/{id}")
	public void delete(@PathVariable Integer id) {
		repo.deleteById(id) ;

	}
}
