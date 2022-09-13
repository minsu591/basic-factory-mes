package com.mes.bf.rsc.controller;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.rsc.service.RscReturnService;
import com.mes.bf.rsc.vo.RscOutVO;
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
	
	//반품관리 수정리스트 불러오기
	@RequestMapping(value="/returnUpList", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public ResponseEntity<List<RscReturnVO>> outUpList(@RequestBody List<RscReturnVO> list) {
		RscReturnVO result = new RscReturnVO();
		List<RscReturnVO> rtnList = new ArrayList<RscReturnVO>();
		for (int i = 0; i < list.size() ; i++) {
			result = rscReturnService.loadReturn(list.get(i).getRscReturnCode());
			rtnList.add(i,result);
		}
		return new ResponseEntity<List<RscReturnVO>>(rtnList, HttpStatus.OK);
	}
	
	//반품 등록 & 수정
	@RequestMapping(value="/ReturnInAndUp", method = RequestMethod.POST)
	@ResponseBody
	public String outInAndUp(@RequestBody List<RscReturnVO> list) {
		int insert = 0;
		int update = 0;
		int result = 0;
		System.out.println(list);
		System.out.println(list.get(0));
		for(int i = 0; i < list.size() ; i++) {
			if(list.get(i).getRscReturnCode() == null) {
				rscReturnService.returnInsert(list.get(i));	
				insert++;
			}else {
				rscReturnService.returnUpdate(list.get(i));
				result = rscReturnService.returnUpdate(list.get(i));
				update++;
			}
		}
		System.out.println("insert"+ insert + "update" + update);
		return "rsc/return";
	}
	
	@RequestMapping("/returnList")
	public void returnList(Model model) {
		List<RscReturnVO> rList = rscReturnService.returnList(null, null, null, null);
		model.addAttribute("rList", rList);
	}
	
	@RequestMapping(value = "/returnListTable", produces = { MediaType.APPLICATION_JSON_VALUE })
	public String returnListTable(@RequestParam Map<String,String> QueryParameters, Model model) {
		List<RscReturnVO> rList = rscReturnService.returnList(QueryParameters.get("rscReturnCode"), QueryParameters.get("vendor"), 
								QueryParameters.get("rscReturnSDate"), QueryParameters.get("rscReturnEDate"));
		model.addAttribute("rList", rList);
		return "rsc/table/returnListTable";
	}
	
	//거래처 전체조회
	@GetMapping(value = "/findvendorcode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VendorCodeVO>> findAllVInstruction(@RequestParam Map<String,String> queryParameters) {
		List<VendorCodeVO> list = instService.findVendorCode(queryParameters.get("vendorCode"),queryParameters.get("vendCdClfy"));
		return new ResponseEntity<List<VendorCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
}
