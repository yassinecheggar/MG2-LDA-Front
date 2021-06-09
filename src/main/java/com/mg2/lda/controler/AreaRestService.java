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
import com.mg2.lda.models.Area;
import com.mg2.lda.models.Perimetre;
import com.mg2.lda.repository.ActiviteRepository;
import com.mg2.lda.repository.AreaRepository;

@RestController
@RequestMapping("Area")
@CrossOrigin("*")
public class AreaRestService {

	

	@Autowired
	AreaRepository repo;
	
	
	 @GetMapping("/GetAll")
		public List<Area> getAll(){
			return repo.findAll();
		}
	 
	 @GetMapping("/GetPerimetre/{id}")
		public List<Perimetre> getperimetre(@PathVariable Integer id){
		 
		 
		 	Area A=  repo.findById(id).get();
		 	if(A!=null) {
		 		return A.getPerimetresList();
		 	}
		 		
			return null ;
		}


		@PostMapping("/Add")
		public boolean add(@RequestBody Area area) {

			if(repo.save(area) != null) {
				return true;
			}
			return false;
		}

		@PutMapping("/Update/{id}")
		public boolean Update(@RequestBody Area area,@PathVariable Integer id) {

			area.setId(id);
			if(repo.save(area) != null) {
				return true;
			}
			return false;
		}

		@DeleteMapping("/Delete/{id}")
		public void delete(@PathVariable Integer id) {
			repo.deleteById(id) ;

		}

}
