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

import com.mes.bf.cmn.service.BomService;
import com.mes.bf.cmn.vo.BomRscDtlVO;
import com.mes.bf.cmn.vo.BomRscVO;
import com.mes.bf.cmn.vo.BomVO;
import com.mes.bf.cmn.vo.LineCodeVO;

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
	
	@GetMapping(value="/bomRsc/proc", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<LineCodeVO>> findProcForLine(@RequestParam String lineCode){
		List<LineCodeVO> procs = service.findProcForLine(lineCode);
		return new ResponseEntity<List<LineCodeVO>>(procs,HttpStatus.OK);
	}
	
	
	//bom insert, delete, update
	@PostMapping(value = "/bomCode/delete", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> bomCodeDelete(@RequestParam Map<String, String> QueryParameters) {
		int result = service.bomCodeDelete(QueryParameters.get("priKey"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}

	@PostMapping(value = "/bomCode/insert", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> bomCodeInsert(@ModelAttribute BomVO bom) {
		int result = service.bomCodeInsert(bom);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/bomCode/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> bomCodeUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.bomCodeUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	//bom rsc insert, delete, update
	@PostMapping(value = "/bomRsc/delete", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> bomRscDelete(@RequestParam Map<String, String> QueryParameters) {
		int result = service.bomRscDelete(QueryParameters.get("priKey"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}

	@PostMapping(value = "/bomRsc/insert", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> bomRscInsert(@ModelAttribute BomRscVO bomRsc) {
		int result = service.bomRscInsert(bomRsc);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/bomRsc/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> bomRscUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.bomRscUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
}
