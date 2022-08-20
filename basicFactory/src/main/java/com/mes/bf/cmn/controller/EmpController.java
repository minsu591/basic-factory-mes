package com.mes.bf.cmn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.cmn.service.EmpDeptService;
import com.mes.bf.cmn.vo.EmpDeptVO;

@Controller
@RequestMapping("/cmn")
public class EmpController {
	@Autowired EmpDeptService service;
	
	@RequestMapping("empView")
	public String empViewPage(Model model) {
		List<EmpDeptVO> listEmp = service.listEmpDept();
		model.addAttribute("emps",listEmp);
		return "cmn/Emp";
	}
}
