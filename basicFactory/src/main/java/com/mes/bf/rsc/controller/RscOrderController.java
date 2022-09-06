package com.mes.bf.rsc.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mes.bf.rsc.service.RscOrderService;
import com.mes.bf.rsc.vo.RscOrderVO;
import com.mes.bf.rsc.vo.RscOutVO;

@Controller
@RequestMapping("/rsc")
public class RscOrderController {
	
	@Autowired RscOrderService rscOrderService;

	//발주
	@RequestMapping("/order")
	public String order(Model model) {
		return "rsc/order";
	}
	
	//발주 상세 내역 조회
	@GetMapping(value = "/orderDetailsList")
	@ResponseBody
	public ResponseEntity<List<RscOrderVO>> orderDetailsList(@RequestParam Map<String, String> QueryParameters) {
		List<RscOrderVO> list = rscOrderService.orderDetailList(QueryParameters.get("rscOrderCode"));
		return new ResponseEntity<List<RscOrderVO>>(list, HttpStatus.OK);
	}
	
	@RequestMapping("/orderList")
	public void orderList() {
	}
}
