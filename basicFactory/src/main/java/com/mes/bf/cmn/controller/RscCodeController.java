package com.mes.bf.cmn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.cmn.service.RscCodeService;
import com.mes.bf.cmn.vo.RscCodeVO;

@Controller
@RequestMapping("/cmn")
public class RscCodeController {
	
	@Autowired RscCodeService service;
	
	@RequestMapping("/rscCode")
	public String RscCodePage(Model model) {
		List<RscCodeVO> rscs = service.listRsc();
		model.addAttribute("rscs", rscs);
		return "cmn/RscCode";
	}

}
