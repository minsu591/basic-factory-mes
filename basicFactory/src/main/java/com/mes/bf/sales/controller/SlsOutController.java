package com.mes.bf.sales.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.sales.service.SlsOutService;
import com.mes.bf.sales.vo.SlsOrdHdDtlVO;
import com.mes.bf.sales.vo.SlsOrdHdVO;
import com.mes.bf.sales.vo.SlsOutDtlVO;
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
	public List<SlsOutHdDtlVO> findOut(@RequestParam Map<String, String> param){
		List<SlsOutHdDtlVO> list = service.findOut(param.get("outSdate"),
				 								   param.get("outEdate"),
				 								   param.get("vendorName"));
		return list;
	}
	
	//완제품 출고관리 페이지 이동
	@RequestMapping("/outManage")
	public ModelAndView outManage() {
		ModelAndView mav = new ModelAndView("sales/outManage");
		return mav;
	}
	
	//완제품 출고관리에서 미출고된 주문내역 조회 모달창
	@RequestMapping("/NotOutOrderView")
	public List<SlsOrdHdDtlVO> findNotOutOrder(@RequestParam Map<String, String> param){
		System.out.println("접속!!!");
		List<SlsOrdHdDtlVO> list = service.findNotOut(param.get("ordSdate"),
														   param.get("ordEdate"));
		return list;
	}
	
	//출고관리에서 미출고된 주문내역 상세조회
	@RequestMapping("/NotOutOrderView/dtl")
	public List<SlsOutDtlVO> findNotOutDtl(@RequestParam Map<String, String> param){
		List<SlsOutDtlVO> list = service.findNotOutDtl(param.get("slsOrdHdNo"));
		return list;
	}
	
	//출고관리에서 출고내역 조회 모달
	//출고관리에서 출고내역 상세 조회
	
}
