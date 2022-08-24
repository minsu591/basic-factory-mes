package com.mes.bf.sales.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.sales.service.SlsOutService;
import com.mes.bf.sales.vo.SlsOutHdDtlVO;

@RestController
@RequestMapping("/sls")
public class SlsOutController {

	@Autowired SlsOutService service;
	@Autowired InstructionService instService;
	
	//완제품 촐고조회 페이지 이동
	@RequestMapping("/out")
	public ModelAndView out() {
		ModelAndView mav = new ModelAndView("sales/out");
		return mav;
	}
	
	//완제품 출고내역 전체 조회
	@GetMapping("/findAllOut")
	public List<SlsOutHdDtlVO> findAllOut() {
		List<SlsOutHdDtlVO> list = service.findAllOut();
		return list;
	}
	
	//완제품 출고내역 단건 조회
	@GetMapping(value = "/findOut")
	public List<SlsOutHdDtlVO> finOut(@RequestParam Map<String, String> param){
		List<SlsOutHdDtlVO> list = service.findOut(param.get("outSdate"),
				 								   param.get("outEdate"),
				 								   param.get("vendorName"));
		return list;
	}
	
}
