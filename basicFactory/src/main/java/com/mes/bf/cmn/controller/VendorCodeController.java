package com.mes.bf.cmn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.cmn.service.VendorService;
import com.mes.bf.cmn.vo.VendorCodeVO;

@Controller
@RequestMapping("/cmn")
public class VendorCodeController {
	@Autowired VendorService vendService;
	
	@RequestMapping("vendorCode")
	public String vendorCodePage(Model model) {
		List<VendorCodeVO> vendors = vendService.listVendor();
		model.addAttribute("vendors",vendors);
		return "cmn/VendorCode";
	}
}
