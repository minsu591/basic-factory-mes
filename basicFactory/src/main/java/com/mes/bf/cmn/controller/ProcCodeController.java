package com.mes.bf.cmn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.cmn.service.ProcCodeService;
import com.mes.bf.cmn.vo.ProcCodeVO;

@Controller
@RequestMapping("/cmn")
public class ProcCodeController {
	@Autowired ProcCodeService service;
	
	@RequestMapping("/procCode")
	public String procCodePage(Model model) {
		List<ProcCodeVO> procs = service.listProcCode();
		model.addAttribute("procs",procs);
		return "cmn/ProcCode";
	}
}
