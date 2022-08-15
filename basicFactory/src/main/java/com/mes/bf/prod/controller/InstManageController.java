package com.mes.bf.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.mes.bf.prod.service.InstManageService;
import com.mes.bf.prod.vo.FindEmpVO;

@Controller
public class InstManageController {

	@Autowired InstManageService service;
	
	// 조회 => Get
	@GetMapping(value = "/findemp", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FindEmpVO>> findEmp(FindEmpVO vo) {
		// int a = 5/0;
		List<FindEmpVO> list = service.findEmp();
		return new ResponseEntity<List<FindEmpVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

}
