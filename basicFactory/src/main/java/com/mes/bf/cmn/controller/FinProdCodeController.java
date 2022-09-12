package com.mes.bf.cmn.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mes.bf.cmn.service.FinProdService;
import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.vo.FindEmpVO;

@Controller
@RequestMapping("/cmn")
public class FinProdCodeController {
	@Autowired FinProdService service;
	@Autowired InstructionService instService;
	
	@RequestMapping("finProdCode")
	public String finProdCodePage(Model model) {
		List<FinProdCodeVO> prods = service.listFinProd(null);
		model.addAttribute("prods",prods);
		return "cmn/FinProdCode";
	}
	@GetMapping(value = "/finProdCode/name", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FinProdCodeVO>> finCodeName(@RequestParam Map<String, String> QueryParameters){
		List<FinProdCodeVO> finProds = service.listFinProd(QueryParameters.get("finName"));
		return new ResponseEntity<List<FinProdCodeVO>>(finProds, HttpStatus.OK);
	}
	
	//insert, modify, update
	@GetMapping(value = "/finProdCode/delete")
	public ResponseEntity<Integer> finProdDelete(@RequestParam(value="delList[]") List<String> delList) {
		int result = service.finProdDelete(delList);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}

	@PostMapping(value = "/finProdCode/insert", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> deptInsert(@ModelAttribute FinProdCodeVO finProd) {
		int result = service.finProdInsert(finProd);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/finProdCode/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> procCodeUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.finProdUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	// findemp 조회
	@GetMapping(value = "/findemp", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FindEmpVO>> findEmp(@RequestParam Map<String, String> QueryParameters) {
		List<FindEmpVO> list = instService.findEmp(QueryParameters.get("empName"));
		return new ResponseEntity<List<FindEmpVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
}
