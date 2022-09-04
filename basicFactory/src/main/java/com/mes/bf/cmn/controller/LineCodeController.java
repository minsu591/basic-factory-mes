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

import com.mes.bf.cmn.service.LineService;
import com.mes.bf.cmn.vo.LineCodeHdVO;
import com.mes.bf.cmn.vo.LineCodeVO;
import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.eqp.vo.VfindMchnVO;
import com.mes.bf.prod.service.ProcService;

@Controller
@RequestMapping("/cmn")
public class LineCodeController {
	@Autowired LineService service;
	@Autowired ProcService procService;
	
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
	
	//라인 헤더 insert, update, delete
	//insert, modify, update

	@PostMapping(value = "/lineCode/hd/delete", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> lineCodeHdDelete(@RequestParam(value="delList[]") List<String> delList) {
		int result = service.lineCodeHdDelete(delList);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}

	@PostMapping(value = "/lineCode/hd/insert", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> lineCodeHdInsert(@RequestParam Map<String, String> QueryParameters) {
		int result = service.lineCodeHdInsert(QueryParameters.get("lineName"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/lineCode/hd/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> lineCodeHdUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.lineCodeHdUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	//라인 insert, modify, update

	@PostMapping(value = "/lineCode/delete", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> lineCodeDelete(@RequestParam(value="delList[]") List<String> delList) {
		int result = service.lineCodeDelete(delList);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	@PostMapping(value = "/lineCode/insert", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> lineCodeInsert(@ModelAttribute LineCodeVO line) {
		int result = service.lineCodeInsert(line);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/lineCode/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> lineCodeUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.lineCodeUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	// 설비명 조회
	@GetMapping(value = "/findmchn", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VfindMchnVO>> findEmp(@RequestParam Map<String, String> QueryParameters) {
		List<VfindMchnVO> list = procService.findMchn(QueryParameters.get("mchnCode"), QueryParameters.get("mchnName"));
		return new ResponseEntity<List<VfindMchnVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 공정명 조회
	@GetMapping(value = "/findproccode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<ProcCodeVO>> findProcCode(@RequestParam Map<String, String> QueryParameters) {
		List<ProcCodeVO> list = procService.findProcCode(QueryParameters.get("procCdCode"),
				QueryParameters.get("procCdName"));
		return new ResponseEntity<List<ProcCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
}
