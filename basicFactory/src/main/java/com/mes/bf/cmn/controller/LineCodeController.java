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

import com.mes.bf.cmn.service.LineService;
import com.mes.bf.cmn.vo.LineCodeHdVO;
import com.mes.bf.cmn.vo.LineCodeVO;

@Controller
@RequestMapping("/cmn")
public class LineCodeController {
	@Autowired LineService service;
	@RequestMapping("/lineCode")
	public String lineCodePage(Model model) {
		List<LineCodeHdVO> lines = service.listLineCodeHd(null);
		model.addAttribute("lines",lines);
		return "cmn/LineCode";
	}
	
	//라인 조건 조회
	@GetMapping(value="/lineCode/name", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<LineCodeHdVO>> lineCodeName(@RequestParam Map<String, String> QueryParameters){
		List<LineCodeHdVO> lines = service.listLineCodeHd(QueryParameters.get("lineName"));
		return new ResponseEntity<List<LineCodeHdVO>>(lines,HttpStatus.OK);
	}
	
	//라인 조건 조회
	@GetMapping(value="/lineCode/dtl", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<LineCodeVO>> lineCodeDtl(@RequestParam Map<String, String> QueryParameters){
		List<LineCodeVO> lines = service.listLineCode(QueryParameters.get("lineCode"));
		return new ResponseEntity<List<LineCodeVO>>(lines,HttpStatus.OK);
	}
}
