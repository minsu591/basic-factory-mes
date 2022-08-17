package com.mes.bf.prod.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/prod")
public class PlanController {
	
	@RequestMapping("/content")
	public String test() {
		return "prod/content";
	}
	
	@RequestMapping("/prod")
	public String test2() {
		return "prod/prod";
	}
}
