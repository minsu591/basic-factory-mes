package com.mes.bf.cmn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.cmn.service.FinProdService;
import com.mes.bf.cmn.vo.FinProdCodeVO;

@Controller
@RequestMapping("/cmn")
public class FinProdCodeController {
	@Autowired FinProdService service;
	
	@RequestMapping("finProdCode")
	public String finProdCodePage(Model model) {
		List<FinProdCodeVO> prods = service.listFinProd();
		model.addAttribute("prods",prods);
		return "cmn/FinProdCode";
	}
}
