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
import com.mg2.lda.models.Question;
import com.mg2.lda.repository.ActiviteRepository;
import com.mg2.lda.repository.QuestionRepository;

@RestController
@RequestMapping("Question")
@CrossOrigin("*")
public class QuestionRestService {

	
	

	@Autowired
	QuestionRepository repo;
	
	
	 @GetMapping("/GetAll")
		public List<Question> getAll(){
			return repo.findAll();
		}


		@PostMapping("/Add")
		public boolean add(@RequestBody Question question) {

			if(repo.save(question) != null) {
				return true;
			}
			return false;
		}

		@PutMapping("/Update/{id}")
		public boolean Update(@RequestBody Question question,@PathVariable Integer id) {

			question.setId(id);
			if(repo.save(question) != null) {
				return true;
			}
			return false;
		}

		@DeleteMapping("/Delete/{id}")
		public void delete(@PathVariable Integer id) {

			repo.deleteById(id) ;


		}

}
