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

import com.mes.bf.cmn.service.BomService;
import com.mes.bf.cmn.vo.BomRscDtlVO;
import com.mes.bf.cmn.vo.BomVO;

@Controller
@RequestMapping("/cmn")
public class BomCodeController {
	@Autowired BomService service;
	
	//페이지 호출
	@RequestMapping("/bomCode")
	public String bomCodePage(Model model) {
		List<BomVO> boms = service.listBom(null);
		model.addAttribute("boms",boms);
		return "cmn/BomCode";
	}
	
	//bom 조건 조회
	@GetMapping(value="/bomCode/name", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<BomVO>> bomCodeName(@RequestParam Map<String, String> QueryParameters){
		List<BomVO> boms = service.listBom(QueryParameters.get("finName"));
		return new ResponseEntity<List<BomVO>>(boms,HttpStatus.OK);
	}
	
	//bom 자재 조회
	@GetMapping(value="/bomRsc", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<BomRscDtlVO>> findBomRsc(@RequestParam Map<String, String> QueryParameters){
		List<BomRscDtlVO> boms = service.findBomRsc(QueryParameters.get("bomCode"));
		return new ResponseEntity<List<BomRscDtlVO>>(boms,HttpStatus.OK);
	}
	
}
