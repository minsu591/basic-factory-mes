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
import com.mes.bf.sales.service.SlsOrdService;
import com.mes.bf.sales.vo.SlsOrdHdDtlVO;

@RestController
@RequestMapping("/sls")
public class SlsOrdController {
	
	@Autowired SlsOrdService service;
	@Autowired InstructionService instService;
	
	//주문조회 페이지 이동
	@RequestMapping("/ord")
	public ModelAndView order() {
		ModelAndView mav = new ModelAndView("sales/order");
		return mav;
	}

	//주문내역 전체 조회
	@GetMapping("/findAllOrder")
	public List<SlsOrdHdDtlVO> findAllOrder() {
		List<SlsOrdHdDtlVO> list = service.findAllOrder();
		
		return list;
	}
	
	//주문내역 단건 조회
	@GetMapping(value = "/findOrder")
	public List<SlsOrdHdDtlVO> findOrder(@RequestParam Map<String, String> param) {
		List<SlsOrdHdDtlVO> list = service.findOrder(param.get("ordSdate"),
													 param.get("ordEdate"),
													 param.get("vendorName"));
		return list;
	}
	
	//거래처 전체조회
	@GetMapping(value = "/findvendorcode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VendorCodeVO>> findAllVInstruction(@RequestParam Map<String,String> queryParameters) {
		List<VendorCodeVO> list = instService.findVendorCode(queryParameters.get("vendorCode"),queryParameters.get("vendCdClfy"));
		return new ResponseEntity<List<VendorCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
}
