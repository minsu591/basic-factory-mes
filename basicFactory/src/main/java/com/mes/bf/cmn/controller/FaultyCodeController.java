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

import com.mes.bf.cmn.service.FaultyCodeService;
import com.mes.bf.cmn.vo.FaultyCodeVO;

@Controller
@RequestMapping("/cmn")
public class FaultyCodeController {
	
	@Autowired FaultyCodeService service;
	
	@RequestMapping("/faultyCode")
	public String FltyCodePage(Model model) {
		List<FaultyCodeVO> fltys = service.listFltyCode(null);
		model.addAttribute("fltys", fltys);
		return "cmn/FaultyCode";
	}
	
	@GetMapping(value = "/faultyCode/findName", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FaultyCodeVO>> faultyCodeName(@RequestParam Map<String, String> QueryParameters){
		List<FaultyCodeVO> faultyNm = service.listFltyCode(QueryParameters.get("faultyName"));
		return new ResponseEntity<List<FaultyCodeVO>>(faultyNm, HttpStatus.OK);
	}
	
	@GetMapping(value = "/faultyCode/delete")
	public ResponseEntity<Integer> faultyDelete(@RequestParam(value="delList[]") List<String> delList) {
		int result = service.faultyDelete(delList);
		return new ResponseEntity<Integer>(result, HttpStatus.OK);
	}
	
	@PostMapping(value = "/faultyCode/insert", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> faultyInsert(@ModelAttribute FaultyCodeVO vo){
		int result = service.faultyInsert(vo);
		return new ResponseEntity<Integer>(result, HttpStatus.OK);
	}
	
	@PostMapping(value = "/faultyCode/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> faultyUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.faultyUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result, HttpStatus.OK);
	}

}
