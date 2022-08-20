package com.mes.bf.cmn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.cmn.service.LineService;
import com.mes.bf.cmn.vo.LineCodeHdVO;

@Controller
@RequestMapping("/cmn")
public class LineCodeController {
	@Autowired LineService service;
	@RequestMapping("/lineCode")
	public String lineCodePage(Model model) {
		List<LineCodeHdVO> lines = service.listLineCodeHd();
		model.addAttribute("lines",lines);
		return "cmn/LineCode";
	}
}
