package com.mes.bf.sales.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.sales.service.SlsRtnService;
import com.mes.bf.sales.vo.SlsRtnDtlVO;
import com.mes.bf.sales.vo.SlsRtnHdDtlVO;
import com.mes.bf.sales.vo.SlsRtnHdVO;
import com.mes.bf.sales.vo.SlsRtnInsertVO;

@RestController
@RequestMapping("/sls")
public class SlsRtnController {
	
	@Autowired SlsRtnService service;
	
	//완제품 반품조회 페이지 이동
	@RequestMapping("/rtn")
	public ModelAndView rtn() {
		ModelAndView mav = new ModelAndView("sales/return");
		return mav;
	}
	
	//완제품 반품내역 전체 조회
	@GetMapping("/findAllReturn")
	public List<SlsRtnHdDtlVO> findAllReturn() {
		List<SlsRtnHdDtlVO> list = service.findAllReturn();
		return list;
	}
	
	//완제품 반품내역 단건 조회
	@GetMapping("/findReturn")
	public List<SlsRtnHdDtlVO> findReturn(@RequestParam Map<String, String> param) {
		System.out.println("들어옴");
		System.out.println(param);
		List<SlsRtnHdDtlVO> list = service.findReturn(param.get("rtnSdate"),
													  param.get("rtnEdate"),
													  param.get("prcCls"),
													  param.get("vendorName"));
		
		return list;
	}
	
	//완제품 반품관리 페이지 이동
	@RequestMapping("/rtnManage")
	public ModelAndView rtnManage() {
		ModelAndView mav = new ModelAndView("sales/returnManage");
		return mav;
	}
	
	//완제품 반품관리에서 반품내역 조회 모달
	@GetMapping("/returnView")
	public List<SlsRtnHdVO> returnView(@RequestParam Map<String, String> param){
		List<SlsRtnHdVO> list = service.returnView(param.get("rtnSdate"),
												   param.get("rtnEdate"));
		return list;
	}
	
	//완제품 반품관리에서 반품내역 상세조회
	@GetMapping("/returnView/dtl")
	public List<SlsRtnHdDtlVO> returnDtlView(@RequestParam Map<String, String> param){
		List<SlsRtnHdDtlVO> list = service.returnDtlView(param.get("slsRtnHdNo"));
		return list;
	}
	
	//완제품 반품관리 등록
	@PostMapping("/rtnManage/hdDtlInsert")
	public void hdDtlInsert(@RequestBody SlsRtnInsertVO vo) {
		//출고 헤더 등록
		service.rtnInsertHd(vo.getSlsRtnHdVO());
		//출고 디테일 등록
		for(SlsRtnDtlVO rtnDtlVO : vo.getSlsRtnDtlVO()) {
			service.rtnInsertDtl(rtnDtlVO);
		}
	}
	
	//완제품 반품관리 수정
	@PutMapping("/rtnManage/update")
	public void rtnUpdate(@RequestParam Map<String, String> params) {
			service.rtnUpdate(params.get("priKey"),
			  		  		  params.get("updCol"),
			  		  		  params.get("updCont"));
	}
	
	//반품관리 헤더 삭제
	@DeleteMapping("/rtnManage/hd/delete")
	public void rtnHdDelete(@RequestBody SlsRtnHdVO vo) {
		//dtl 삭제
		SlsRtnDtlVO dtlVo = new SlsRtnDtlVO();
		dtlVo.setSlsRtnHdNo(vo.getSlsRtnHdNo());
		//반품번호에 해당하는 반품내역번호 조회
		List<SlsRtnDtlVO> slsRtnDtlNo = service.rtnDtlNoSelect(dtlVo);
		for(SlsRtnDtlVO rtnDtlNo : slsRtnDtlNo) {
			service.rtnDelete(rtnDtlNo);
		}
		//header 삭제
		service.rtnHdDelete(vo.getSlsRtnHdNo());
	}
	
	//반품관리 디테일 삭제
	@DeleteMapping("/rtnManage/delete")
	public void rtnDelete(@RequestBody SlsRtnDtlVO vo) {
		service.rtnDelete(vo);
	}
}
