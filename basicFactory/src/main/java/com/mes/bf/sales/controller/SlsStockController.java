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

import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.sales.service.SlsStockService;
import com.mes.bf.sales.vo.SlsStockVO;

@RestController
@RequestMapping("/sls")
public class SlsStockController {
	
	@Autowired
	private SlsStockService service;
	
	@Autowired
	private InstructionService instService;
	
	//완제품재고조회 페이지 이동
	@RequestMapping("/stock")
	public ModelAndView stock() {
		ModelAndView mav = new ModelAndView("sales/stock");
		return mav;
	}
	
	//완제품재고 전체 조회
	@GetMapping("/findAllStock")
	public List<SlsStockVO> findAllStock(){
		List<SlsStockVO> list = service.findAllStock();
		return list;
	}
	
	//완제품재고 단건 조회
	@GetMapping("/findStock")
	public List<SlsStockVO> findStock(@RequestParam String prdName, String lotNo){
		List<SlsStockVO> list = service.findStock(prdName, lotNo);
		return list;
	}
	
	// 완제품 조회
	@GetMapping(value = "/findproduct", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FinProdCodeVO>> findProduct(@RequestParam Map<String, String> QueryParameters) {
		List<FinProdCodeVO> list = instService.findProduct(QueryParameters.get("prdCdCode"), QueryParameters.get("prdCdName"));
		return new ResponseEntity<List<FinProdCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
	
}
