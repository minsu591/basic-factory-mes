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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mes.bf.cmn.service.ProcCodeService;
import com.mes.bf.cmn.vo.ProcCodeVO;

@Controller
@RequestMapping("/cmn")
public class ProcCodeController {
	@Autowired ProcCodeService service;
	
	@RequestMapping("/procCode")
	public String procCodePage(Model model) {
		List<ProcCodeVO> procs = service.listProcCode(null);
		model.addAttribute("procs",procs);
		return "cmn/ProcCode";
	}
	
	@GetMapping(value = "/procCode/name", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<ProcCodeVO>> procCodeName(@RequestParam Map<String, String> QueryParameters){
		List<ProcCodeVO> finProds = service.listProcCode(QueryParameters.get("procName"));
		return new ResponseEntity<List<ProcCodeVO>>(finProds, HttpStatus.OK);
	}
	
	@PostMapping(value = "/procCode/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> procCodeUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.procCodeUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/procCode/insert", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> procCodeInsert(@RequestParam Map<String, String> QueryParameters) {
		int result = service.procCodeInsert(QueryParameters.get("procName"), QueryParameters.get("procRemk"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/procCode/delete", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> procCodeDelete(@RequestParam Map<String, String> QueryParameters) {
		int result = service.procCodeDelete(QueryParameters.get("priKey"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
}
