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

import com.mes.bf.cmn.service.RscCodeService;
import com.mes.bf.cmn.vo.RscCodeVO;
import com.mes.bf.rsc.service.FindRscCodeService;

@Controller
@RequestMapping("/cmn")
public class RscCodeController {
	
	@Autowired RscCodeService service;
	@Autowired FindRscCodeService findRscService;
	
	@RequestMapping("/rscCode")
	public String RscCodePage(Model model) {
		List<RscCodeVO> rscs = service.listRsc(null);
		model.addAttribute("rscs", rscs);
		return "cmn/RscCode";
	}
	
	@GetMapping(value = "/rscCode/findCode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<RscCodeVO>> RscCodeName(@RequestParam Map<String, String> QueryParameters) {
		List<RscCodeVO> rscCd = service.listRsc(QueryParameters.get("rscCode"));
		return new ResponseEntity<List<RscCodeVO>>(rscCd, HttpStatus.OK);
	}
	
	//자재코드 조회(모달창)
	@GetMapping(value="/findResourceCode", produces= { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<RscCodeVO>> findResource(@RequestParam Map<String, String> queryParameters){
		List<RscCodeVO> list = findRscService.rscCodeList(queryParameters.get("rscCdName"), queryParameters.get("rscCdClfy"),
														queryParameters.get("rscCdCode"));
		return new ResponseEntity<List<RscCodeVO>>(list, HttpStatus.OK);
	}

}
