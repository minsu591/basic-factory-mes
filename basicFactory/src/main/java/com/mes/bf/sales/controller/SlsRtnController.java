package com.mes.bf.sales.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.sales.service.SlsRtnService;
import com.mes.bf.sales.vo.SlsRtnHdDtlVO;
import com.mes.bf.sales.vo.SlsRtnHdVO;

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
	
	//완제품 반품관리 페이지 이동
	@RequestMapping("/rtnManage")
	public ModelAndView rtnManage() {
		ModelAndView mav = new ModelAndView("sales/returnManage");
		return mav;
	}
	
	//완제품 반품관리에서 반품내역 조회 모달
	@GetMapping("/returnView")
	public List<SlsRtnHdVO> returnView(@RequestParam Map<String, String> param){
		List<SlsRtnHdVO> list = service.returnView(param.get("rtnSdate"),
												   param.get("rtnEdate"));
		return list;
	}
	
	//완제품 반품관리에서 반품내역 상세조회
	@GetMapping("/returnView/dtl")
	public List<SlsRtnHdDtlVO> returnDtlView(@RequestParam Map<String, String> param){
		List<SlsRtnHdDtlVO> list = service.returnDtlView(param.get("slsRtnHdNo"));
		return list;
	}
}
