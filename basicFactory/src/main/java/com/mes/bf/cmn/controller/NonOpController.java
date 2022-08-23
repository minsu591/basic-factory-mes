package com.mes.bf.cmn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.cmn.service.NonOpService;
import com.mes.bf.cmn.vo.NonOpVO;

@Controller
@RequestMapping("/cmn")
public class NonOpController {
	
	@Autowired NonOpService service;
	
	@RequestMapping("/nonOpCode")
	public String nonOpCodePage(Model model) {
		List<NonOpVO> nonOp = service.listNonOp();
		model.addAttribute("nonOp", nonOp);
		return "cmn/NonOpCode";
	}

}
