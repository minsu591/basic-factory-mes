package com.mes.bf.rsc.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mes.bf.cmn.vo.EmpVO;
import com.mes.bf.cmn.vo.RscCodeVO;
import com.mes.bf.rsc.service.FindRscCodeService;
import com.mes.bf.rsc.service.RscOutService;
import com.mes.bf.rsc.vo.RscInspVO;
import com.mes.bf.rsc.vo.RscOrderVO;
import com.mes.bf.rsc.vo.RscOutVO;
import com.mes.bf.rsc.vo.RscReturnVO;
import com.mes.bf.rsc.vo.RscStockVO;
@Controller
@RequestMapping("/rsc")
public class FindRscCodeController {
	
	@Autowired FindRscCodeService findRscService;
	@Autowired RscOutService rscOutService;
	
	//자재코드 조회
	@GetMapping(value="/findResourceCode", produces= { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<RscCodeVO>> findResource(@RequestParam Map<String, String> queryParameters){
		List<RscCodeVO> list = findRscService.rscCodeList(queryParameters.get("rscCdName"), queryParameters.get("rscCdClfy"),
															queryParameters.get("rscCdCode"));
		return new ResponseEntity<List<RscCodeVO>>(list, HttpStatus.OK);
	}
	
	//자재코드LOT조회
	@GetMapping(value="/findRscLot", produces= { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<RscStockVO>> findRscLot(@RequestParam Map<String, String> queryParameters){
		List<RscStockVO> list = findRscService.rscLotNoList(queryParameters.get("rscCdCode"), queryParameters.get("rscCdName"));
		return new ResponseEntity<List<RscStockVO>>(list, HttpStatus.OK);
	}
	
	//재고량이 0인 것을 재외한 자재코드 LOT조회
	@GetMapping(value="/findCanRscLot", produces= { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<RscStockVO>> findCanRscLot(@RequestParam Map<String, String> queryParameters){
		List<RscStockVO> list = findRscService.canRscLotNoList(queryParameters.get("rscCdCode"), queryParameters.get("rscCdName"));
		return new ResponseEntity<List<RscStockVO>>(list, HttpStatus.OK);
	}
	
	//자재발주 조회
	@GetMapping(value="/findRscOrder", produces= { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<RscOrderVO>> findRscOrder(HttpServletRequest request, @RequestParam Map<String, String> queryParameters) throws NoSuchFieldException, SecurityException{
		HttpSession session = request.getSession();
		EmpVO vo = (EmpVO) session.getAttribute("emp");
		List<RscOrderVO> list = findRscService.rscOrderList(queryParameters.get("rscOrderTitle"),queryParameters.get("rscOrderDate"), vo.getEmpId());
		return new ResponseEntity<List<RscOrderVO>>(list, HttpStatus.OK);
	}
	
	//자재검사 조회 modal(발주코드 기반 조회)
	@GetMapping(value="/findRscOrderInsp", produces= { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<RscOrderVO>> findRscOrderInsp(@RequestParam Map<String, String> queryParameters) throws NoSuchFieldException, SecurityException{
		List<RscOrderVO> list = findRscService.rscOrderInspList(queryParameters.get("rscOrderCode"), queryParameters.get("rscOrderTitle"), queryParameters.get("rscOrderDate"));
		return new ResponseEntity<List<RscOrderVO>>(list, HttpStatus.OK);
	}
	
	//이전 검사 조회
	@GetMapping(value="/findRscInsp", produces= { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<RscInspVO>> findRscInsp(@RequestParam Map<String, String> queryParameters) throws NoSuchFieldException, SecurityException{
		List<RscInspVO> list = findRscService.rscInspList(queryParameters.get("rscCdCode"), queryParameters.get("rscCdName"), queryParameters.get("rscInspDate"));
		return new ResponseEntity<List<RscInspVO>>(list, HttpStatus.OK);
	}
	
	//자재출고 조회
	@GetMapping(value="/findRscOut", produces= { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<RscOutVO>> findRscOut(@RequestParam Map<String, String> queryParameters){
		List<RscOutVO> list = findRscService.modalOutList(queryParameters.get("rscOutCode"),queryParameters.get("rscOutDate"));
		return new ResponseEntity<List<RscOutVO>>(list, HttpStatus.OK);
	}
	
	//자재반품 조회
	@GetMapping(value="/findRscReturn", produces= { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<RscReturnVO>> findRscReturn(@RequestParam Map<String, String> queryParameters){
		System.out.println(queryParameters.get("rscReturnCode"));
		List<RscReturnVO> list = findRscService.modalReturnList(queryParameters.get("rscReturnCode"),queryParameters.get("rscReturnDate"));
		return new ResponseEntity<List<RscReturnVO>>(list, HttpStatus.OK);
	}
}
