package com.mes.bf.rsc.controller;

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

import com.mes.bf.rsc.service.RscStockService;
import com.mes.bf.rsc.vo.RscStockVO;

@Controller
@RequestMapping("/rsc")
public class RscStockController {
	
	@Autowired RscStockService stockService;
	
	//재고 전체조회
	@GetMapping(value = "/stockList")
	public void stockList(Model model) {
		List<RscStockVO> stock = stockService.StockList(null,null);
		model.addAttribute("stock",stock);
	}
	
	//재고검색테이블 replace
	@GetMapping(value = "/stockTable", produces = { MediaType.APPLICATION_JSON_VALUE })
	public String stockTable(@RequestParam Map<String, String> QueryParameters, Model model) {
		List<RscStockVO> stock = stockService.StockList(QueryParameters.get("rscCdCode"),QueryParameters.get("rscLotNo"));
		model.addAttribute("stock",stock);
		return "rsc/table/stockTable";
	}
	
}
