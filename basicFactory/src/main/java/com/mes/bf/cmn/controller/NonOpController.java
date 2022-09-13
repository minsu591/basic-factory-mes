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

import com.mes.bf.cmn.service.NonOpService;
import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.cmn.vo.NonOpVO;

@Controller
@RequestMapping("/cmn")
public class NonOpController {
	
	@Autowired NonOpService service;
	
	@RequestMapping("/nonOpCode")
	public String nonOpCodePage(Model model) {
		List<NonOpVO> nonOp = service.listNonOp(null);
		model.addAttribute("nonOp", nonOp);
		return "cmn/NonOpCode";
	}
	
	@GetMapping(value = "/nonOpCode/findname", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<NonOpVO>> finCodeName(@RequestParam Map<String, String> QueryParameters){
		List<NonOpVO> nonOpName = service.listNonOp(QueryParameters.get("nonOpName"));
		return new ResponseEntity<List<NonOpVO>>(nonOpName, HttpStatus.OK);
	}
	
	@GetMapping(value = "/nonOpCode/delete")
	public ResponseEntity<Integer> finProdDelete(@RequestParam(value="delList[]") List<String> delList) {
		int result = service.nonOpDelete(delList);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}

	@PostMapping(value = "/nonOpCode/insert", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> deptInsert(@ModelAttribute NonOpVO vo) {
		int result = service.nonOpInsert(vo);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/nonOpCode/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> procCodeUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.nonOpUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}

}
