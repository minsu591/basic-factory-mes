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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mes.bf.common.Criteria;
import com.mes.bf.common.PageDTO;
import com.mes.bf.rsc.service.RscOrderService;
import com.mes.bf.rsc.vo.RscOrderDtlVO;
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
	
	//발주 헤더 insert, 디테일 리스트 insert
	@PostMapping(value = "/orderInsert")
	public ResponseEntity<Integer> orderInsert(@RequestBody RscOrderDtlVO vo){
		List<RscOrderVO> orders = vo.getOrders();
		System.out.println(vo.getRscOrderVO());
		//헤더 정보를 insert
		int result = rscOrderService.orderInsert(vo.getRscOrderVO());
		System.out.println(result);
		int resultSum = 0;
		if (result == 1) {
			for (int i = 0; i < orders.size() ; i++) {
				int resultDtl = rscOrderService.orderDtInsert(orders.get(i));
				if (resultDtl == 1) {
					resultSum ++;
				}
			}
		}
		//디테일 정보를 insert
		return new ResponseEntity<Integer>(resultSum,HttpStatus.OK);
	}
	
	//발주 헤더 존재 : 수정 >> 세부내역 전부 delete 후 insert
	@PostMapping(value = "/orderUpdate")
	public ResponseEntity<Integer> orderUpdate(@RequestBody RscOrderDtlVO vo){
		List<RscOrderVO> orders = vo.getOrders();
		System.out.println(orders);
		//헤더 정보를 업데이트
		int result = rscOrderService.orderHdUpdate(vo.getRscOrderVO());
		System.out.println("헤더 수정 결과 : " + result);
		int resultSum = 0;
		//디테일 정보를 delete
		if (result == 1) {
			int resultDelete = rscOrderService.orderDtDelete(vo.getRscOrderVO().getRscOrderCode());
			for (int i = 0; i < orders.size(); i++ ) {
				int resultInsert = rscOrderService.orderDtReInsert(orders.get(i));
				if (resultInsert == 1) {
					resultSum ++;
				}
			}
		}
		//새로운 정보를 insert
		return new ResponseEntity<Integer>(resultSum,HttpStatus.OK);
	}
	
	@RequestMapping("/orderList")
	public void orderList(Model model, @ModelAttribute("cri") Criteria cri) {
		int total = rscOrderService.orderListCount(cri);
		cri.setAmount(10); // 한페이지당 10개씩 설정
		PageDTO page = new PageDTO(cri, total);
		model.addAttribute("pageMaker", page);
		List<RscOrderVO> olist = rscOrderService.orderList(cri);
		model.addAttribute("olist",olist);
	}
	
	@RequestMapping(value = "/orderListTable", produces = { MediaType.APPLICATION_JSON_VALUE })
	public String orderTableList(@ModelAttribute("cri") Criteria cri, Model model) {
		int total = rscOrderService.orderListCount(cri);
		cri.setAmount(10); // 한페이지당 10개씩 설정
		PageDTO page = new PageDTO(cri, total);
		model.addAttribute("pageMaker", page);
		System.out.println(page);
		model.addAttribute("olist", rscOrderService.orderList(cri));
		
		return "rsc/table/orderListTable";
	}
}
