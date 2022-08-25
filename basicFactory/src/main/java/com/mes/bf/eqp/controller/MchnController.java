package com.mes.bf.eqp.controller;

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

import com.mes.bf.eqp.service.MchnService;
import com.mes.bf.eqp.vo.MchnVO;

@Controller
@RequestMapping("/eqp")
public class MchnController {
	
	@Autowired MchnService service;
	
	//설비 조회
	@RequestMapping("/mchnList")
	public String mchnListPage(Model model) {
		List<MchnVO> mchns = service.listMchn(null);
		model.addAttribute("mchns", mchns);
		System.out.println(mchns);
		return "eqp/MchnList";
	}
	//설비 코드별 조회
	@GetMapping(value = "/mchnList/mchncode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<MchnVO>> mchnCodePage(@RequestParam Map<String, String> QueryParameters){
		List<MchnVO> mchnCd = service.listMchn(QueryParameters.get("mchnCode"));
		return new ResponseEntity<List<MchnVO>>(mchnCd, HttpStatus.OK);
	}

}
