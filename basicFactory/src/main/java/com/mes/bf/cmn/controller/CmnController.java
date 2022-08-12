package com.mes.bf.cmn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CmnController {
	
	@RequestMapping("/test2")
	public String test() {
		return "test/index";
	}
}
