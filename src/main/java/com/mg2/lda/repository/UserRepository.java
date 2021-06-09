package com.mg2.lda.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import com.mg2.lda.models.User;

@Repository
public interface UserRepository  extends JpaRepository<User, Integer>{

	@Query(value = "SELECT * FROM lda.user where prev  = ?1", nativeQuery = true)
	List<User> findAllByPrevilege(String type);

}
