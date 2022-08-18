package com.mes.bf.cmn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cmn")
public class LineCodeController {
	@RequestMapping("/lineCode")
	public String lineCodePage() {
		return "cmn/LineCode";
	}
}
