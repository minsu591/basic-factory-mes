package com.mes.bf.rsc.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.rsc.service.RscReturnService;
import com.mes.bf.rsc.vo.RscReturnVO;

@Controller
@RequestMapping("/rsc")
public class RscReturnController {
	
	@Autowired RscReturnService rscReturnService;
	@Autowired InstructionService instService;

	//반품
	@RequestMapping("/return")
	public ModelAndView returnPage() {
		return new ModelAndView("rsc/return");
	}
	
	@RequestMapping("/returnList")
	public void returnList(Model model) {
		List<RscReturnVO> rList = rscReturnService.returnList();
		model.addAttribute("rList", rList);
	}
	
	//거래처 전체조회
	@GetMapping(value = "/findvendorcode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VendorCodeVO>> findAllVInstruction(@RequestParam Map<String,String> queryParameters) {
		List<VendorCodeVO> list = instService.findVendorCode(queryParameters.get("vendorCode"),queryParameters.get("vendCdClfy"));
		return new ResponseEntity<List<VendorCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
}
