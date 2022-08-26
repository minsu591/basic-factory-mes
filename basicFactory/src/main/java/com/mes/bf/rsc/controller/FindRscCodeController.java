package com.mes.bf.rsc.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mes.bf.cmn.vo.RscCodeVO;
import com.mes.bf.rsc.service.FindRscCodeService;
import com.mes.bf.rsc.vo.RscStockVO;
@Controller
@RequestMapping("/rsc")
public class FindRscCodeController {
	
	@Autowired FindRscCodeService findRscService;
	
	//자재코드 조회
	@GetMapping(value="/findResourceCode", produces= { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<RscCodeVO>> findResource(@RequestParam Map<String, String> queryParameters){
		System.out.println("hi");
		List<RscCodeVO> list = findRscService.rscCodeList(queryParameters.get("rscCdName"), queryParameters.get("rscCdClfy"));
		System.out.println(list);
		return new ResponseEntity<List<RscCodeVO>>(list, HttpStatus.OK);
	}
	
	//자재코드LOT조회
	@GetMapping(value="/findRscLot", produces= { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<RscStockVO>> findRscLot(@RequestParam Map<String, String> queryParameters){
		System.out.println("hihi");
		System.out.println(queryParameters.get("rscCdName"));
		List<RscStockVO> list = findRscService.rscLotNoList(queryParameters.get("rscCdName"));
		System.out.println(list);
		return new ResponseEntity<List<RscStockVO>>(list, HttpStatus.OK);
	}
}
