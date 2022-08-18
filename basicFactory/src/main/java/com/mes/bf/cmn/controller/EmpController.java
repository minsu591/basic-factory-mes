package com.mes.bf.cmn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cmn")
public class EmpController {
	@RequestMapping("empView")
	public String empViewPage() {
		return "cmn/Emp";
	}
}
