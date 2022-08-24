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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mes.bf.cmn.service.FinProdService;
import com.mes.bf.cmn.vo.FinProdCodeVO;

@Controller
@RequestMapping("/cmn")
public class FinProdCodeController {
	@Autowired FinProdService service;
	
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
}
