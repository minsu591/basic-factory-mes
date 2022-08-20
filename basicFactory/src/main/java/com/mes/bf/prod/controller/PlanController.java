package com.mes.bf.prod.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/prod")
public class PlanController {
	
	@RequestMapping("/planView")
	public String planViewPage() {
		return "prod/PlanView";
	}
	
	@RequestMapping("/planManage")
	public String planManagePage() {
		return "prod/PlanManage";
	}
}
