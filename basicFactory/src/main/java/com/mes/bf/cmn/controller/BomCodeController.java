package com.mes.bf.cmn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.cmn.service.BomService;
import com.mes.bf.cmn.vo.BomVO;

@Controller
@RequestMapping("/cmn")
public class BomCodeController {
	@Autowired BomService service;
	@RequestMapping("/bomCode")
	public String bomCodePage(Model model) {
		List<BomVO> boms = service.listBom();
		model.addAttribute("boms",boms);
		return "cmn/BomCode";
	}
}
