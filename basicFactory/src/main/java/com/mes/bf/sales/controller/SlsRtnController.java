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
import com.mes.bf.sales.service.SlsRtnService;
import com.mes.bf.sales.vo.SlsRtnDtlVO;
import com.mes.bf.sales.vo.SlsRtnHdDtlVO;

@RestController
@RequestMapping("/sls")
public class SlsRtnController {
	
	@Autowired SlsRtnService service;
	
	//완제품 반품조회 페이지 이동
	@RequestMapping("/rtn")
	public ModelAndView rtn() {
		ModelAndView mav = new ModelAndView("sales/return");
		return mav;
	}
	
	//완제품 반품내역 전체 조회
	@GetMapping("/findAllReturn")
	public List<SlsRtnHdDtlVO> findAllReturn() {
		List<SlsRtnHdDtlVO> list = service.findAllReturn();
		return list;
	}
	
	//완제품 반품내역 단건 조회
	@GetMapping("/findReturn")
	public List<SlsRtnHdDtlVO> findReturn(@RequestParam Map<String, String> param) {
		List<SlsRtnHdDtlVO> list = service.findReturn(param.get("rtnSdate"),
													  param.get("rtnEdate"),
													  param.get("prcCls"),
													  param.get("vendorName"));
		return list;
	}
}
