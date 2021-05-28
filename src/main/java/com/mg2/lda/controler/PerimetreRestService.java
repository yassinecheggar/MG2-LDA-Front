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

import com.mg2.lda.models.Area;
import com.mg2.lda.models.Delivrable;
import com.mg2.lda.models.Perimetre;
import com.mg2.lda.repository.ActiviteRepository;
import com.mg2.lda.repository.AreaRepository;
import com.mg2.lda.repository.PerimetreRepository;

@RestController
@RequestMapping("Perimetre")
@CrossOrigin("*")
public class PerimetreRestService {

	

	@Autowired
	PerimetreRepository repo;
	
	@Autowired
	AreaRepository repoArea;
	
	@GetMapping("/GetAll")
	public List<Perimetre> getAll(){
		return repo.findAll();
	}


	@PostMapping("/Add")
	public boolean add(@RequestBody Perimetre perimetre) {
		
		Area A= repoArea.findById(perimetre.getPerimetreArea().getId()).get();
		if(A!=null) {
			perimetre.setPerimetreArea(A);
			 if(repo.save(perimetre) != null) {
					return true;
				}
		}
			
		
		return false;
	}

	@PutMapping("/Update/{id}")
	public boolean Update(@RequestBody Perimetre perimetre,@PathVariable Integer id) {

		perimetre.setId(id);
		if(repo.save(perimetre) != null) {
			return true;
		}
		return false;
	}

	@DeleteMapping("/Delete/{id}")
	public void delete(@PathVariable Integer id) {
		repo.deleteById(id) ;

	}
}
