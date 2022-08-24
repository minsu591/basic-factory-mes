package com.mes.bf.rsc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.rsc.service.RscStockService;
import com.mes.bf.rsc.vo.RscStockVO;

@Controller
@RequestMapping("/rsc")
public class RscStockController {
	
	@Autowired RscStockService stockService;
	
	//재고
	@RequestMapping("/stockList")
	public void stockList(Model model) {
		List<RscStockVO> stock = stockService.StockList();
		model.addAttribute("stock",stock);
	}
}
