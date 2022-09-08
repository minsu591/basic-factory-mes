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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.rsc.service.RscInspService;
import com.mes.bf.rsc.vo.RscInspVO;
import com.mes.bf.rsc.vo.RscOrderDtlVO;
import com.mes.bf.rsc.vo.RscOrderVO;

@Controller
@RequestMapping("/rsc")
public class RscInspController {
	
	@Autowired RscInspService rscInspService;

	//검사
	@RequestMapping("/insp")
	public ModelAndView insp() {
		return new ModelAndView("rsc/insp");
	}
	
	//발주코드 기반 검사등록 리스트 조회
	@GetMapping(value = "/inspListLoad")
	@ResponseBody
	public ResponseEntity<List<RscOrderVO>> inspListLoad(@RequestParam Map<String, String> QueryParameters) {
		List<RscOrderVO> list = rscInspService.inspListLoad(QueryParameters.get("rscOrderCode"), QueryParameters.get("rscOrderTitle"), QueryParameters.get("rscOrderDate"));
		System.out.println(QueryParameters.get("rscOrderCode")+" , " + QueryParameters.get("rscOrderTitle")+ " , " + QueryParameters.get("rscOrderDate"));
		System.out.println(list);
		return new ResponseEntity<List<RscOrderVO>>(list, HttpStatus.OK);
	}
	
	//검사 등록 및 수정
	@PostMapping(value = "/inspInAndUp")
	public ResponseEntity<Integer> orderInAndUp(@RequestBody List<RscInspVO> list){
		
		int insert = 0;
		int update = 0;
		for (int i = 0; i < list.size() ; i++) {
			if(list.get(i).getRscInspCode() == null) {
				rscInspService.inspInsert(list.get(i));
				insert++;
			}else {
				rscInspService.inspUpdate(list.get(i));
				update++;
			}
		}
		System.out.println("insert : " + insert + ", update : " + update);
		int resultSum = insert + update;
		return new ResponseEntity<Integer>(resultSum,HttpStatus.OK);
	}
	
	@RequestMapping("/inspList")
	public void inspList(Model model) {
		List<RscInspVO> inspList = rscInspService.inspList(null, null, null, null);
		model.addAttribute("inspList",inspList);
	}
	
	@RequestMapping(value = "/inspListTable", produces = { MediaType.APPLICATION_JSON_VALUE })
	public String inspListTable(@RequestParam Map<String, String> QueryParameters, Model model) {
		System.out.println(QueryParameters.get("rscCdCode"));
		List<RscInspVO> inspList = rscInspService.inspList(QueryParameters.get("rscInspCode"), QueryParameters.get("rscCdCode"), 
													QueryParameters.get("rscInspSDate"), QueryParameters.get("rscInspEDate"));
		model.addAttribute("inspList",inspList);
		return "rsc/table/inspListTable";
	}
}
