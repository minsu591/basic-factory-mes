package com.mes.bf.cmn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.cmn.service.FaultyCodeService;
import com.mes.bf.cmn.vo.FaultyCodeVO;

@Controller
@RequestMapping("/cmn")
public class FaultyCodeController {
	
	@Autowired FaultyCodeService service;
	
	@RequestMapping("/faultyCode")
	public String FltyCodePage(Model model) {
		List<FaultyCodeVO> fltys = service.listFltyCode();
		model.addAttribute("fltys", fltys);
		System.out.println(fltys);
		return "cmn/FaultyCode";
	}

}
