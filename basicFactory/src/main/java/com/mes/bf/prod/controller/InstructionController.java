package com.mes.bf.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.vo.ProductCodeVO;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.vo.FindEmpVO;

@RestController
public class InstructionController {

	@Autowired
	private InstructionService service;

	// 생산 지시 조회페이지 이동
	@RequestMapping("/inst")
	public ModelAndView inst() {
		ModelAndView mav = new ModelAndView("prod/Instruction");
		return mav;
	}

	// 생산 지시 관리페이지 이동
	@RequestMapping("/instmanagement")
	public ModelAndView instma() {
		ModelAndView mav = new ModelAndView("prod/InstManage");
		return mav;
	}

	// 완제품전체 조회
	// 조회 => Get
	@GetMapping(value = "/findProduct", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<ProductCodeVO>> findAllProduct(ProductCodeVO vo) {
		List<ProductCodeVO> list = service.findAllProduct();
		return new ResponseEntity<List<ProductCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
	
	//완제품 단건 검색
	// 단건조회 => GET
		@GetMapping(value ={"/findProduct/{prdCdCode}/{prdCdName}",
							"/findProduct/{proCdCode}",
							"/findProduct/name/{prdCdName}"
		})
		public ProductCodeVO findProduct(@PathVariable(required = false) String prdCdCode,
										@PathVariable(required = false) String prdCdName) {

			if(prdCdCode == null) prdCdCode = null;
			if(prdCdName == null) prdCdName = null;
			
			
			return service.findProduct(prdCdCode,prdCdName);
		}
	

	
	
	

}
