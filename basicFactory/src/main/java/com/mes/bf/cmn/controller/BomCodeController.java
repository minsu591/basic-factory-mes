package com.mes.bf.cmn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cmn")
public class BomCodeController {
	@RequestMapping("/bomCode")
	public String bomCodePage() {
		return "cmn/BomCode";
	}
}
