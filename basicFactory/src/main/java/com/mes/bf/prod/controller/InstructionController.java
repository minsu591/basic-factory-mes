package com.mes.bf.prod.controller;

import org.springframework.http.MediaType;
import java.io.InputStream;
import java.sql.Connection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.vo.EmpVO;
import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.vo.FindEmpVO;
import com.mes.bf.prod.vo.FindProcStatusVO;
import com.mes.bf.prod.vo.InstAndDetailVO;
import com.mes.bf.prod.vo.InstructionDetailVO;
import com.mes.bf.prod.vo.InstructionVO;
import com.mes.bf.prod.vo.NotInProcInstVO;
import com.mes.bf.prod.vo.VFindProdAndLineVO;
import com.mes.bf.prod.vo.VInstructionVO;
import com.mes.bf.prod.vo.VRscNeedQtyVO;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;


@RestController
@RequestMapping("/prod")
public class InstructionController {

	@Autowired
	private InstructionService service;

	// ?????? ?????? ??????????????? ??????
	@RequestMapping("/inst")
	public ModelAndView inst() {
		ModelAndView mav = new ModelAndView("prod/Instruction");
		return mav;
	}

	// ?????? ?????? ??????????????? ??????
	@RequestMapping("/instmanagement")
	public ModelAndView instma(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.getAttribute("emp");
		ModelAndView mav = new ModelAndView("prod/InstManage");
		return mav;
	}

	@RequestMapping("rsc/order")
	public ModelAndView order() {
		ModelAndView mav = new ModelAndView("rsc/order");
		return mav;
	}

	// ?????? => Get
	@GetMapping(value = "/findemp", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FindEmpVO>> findEmp(@RequestParam Map<String, String> QueryParameters) {
		List<FindEmpVO> list = service.findEmp(QueryParameters.get("empName"),QueryParameters.get("deptNo"));
		return new ResponseEntity<List<FindEmpVO>>(list, HttpStatus.OK);// ?????????,????????? OK = 200, NOTFOUND = 404
	}

	@GetMapping("/findProdName/{prodCode}")
	public VFindProdAndLineVO findProdName(@PathVariable String prodCode) {
		return service.findProdName(prodCode);
	}

	// ????????? ??????
	@GetMapping(value = "/findproduct", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FinProdCodeVO>> findProduct(@RequestParam Map<String, String> QueryParameters) {
		List<FinProdCodeVO> list = service.findProduct(QueryParameters.get("prdCdCode"),
				QueryParameters.get("prdCdName"));
		return new ResponseEntity<List<FinProdCodeVO>>(list, HttpStatus.OK);// ?????????,????????? OK = 200, NOTFOUND = 404
	}

	// ??????????????????
	@GetMapping(value = "/findvinst", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VInstructionVO>> findVInstruction(@RequestParam Map<String, String> queryParameters) {
		List<VInstructionVO> list = service.findVInstruction(queryParameters.get("instSdate"),
				queryParameters.get("instEdate"), queryParameters.get("vendorName"), queryParameters.get("productName"),
				queryParameters.get("workScope"));
		return new ResponseEntity<List<VInstructionVO>>(list, HttpStatus.OK);// ?????????,????????? OK = 200, NOTFOUND = 404
	}

	// ????????? ??????
	@GetMapping(value = "/findvendorcode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VendorCodeVO>> findAllVInstruction(@RequestParam Map<String, String> queryParameters) {
		List<VendorCodeVO> list = service.findVendorCode(queryParameters.get("vendorCode"),
				queryParameters.get("vendCdClfy"));
		return new ResponseEntity<List<VendorCodeVO>>(list, HttpStatus.OK);// ?????????,????????? OK = 200, NOTFOUND = 404
	}

	// ???????????? ??????
	@GetMapping(value = "/findprocstatus")
	public ResponseEntity<List<FindProcStatusVO>> findProcStatus(
			@RequestParam(value = "lineName[]") List<String> lineName) {
		System.out.println(lineName);
		List<FindProcStatusVO> list = service.findProcStatus(lineName);

		return new ResponseEntity<List<FindProcStatusVO>>(list, HttpStatus.OK);

	}

	// ????????? ?????? ?????? ????????? ??????
	@GetMapping("/findvrscneedqty")
	public ResponseEntity<List<VRscNeedQtyVO>> findVRscNeedQty(
			@RequestParam(value = "finPrdCdCode[]") List<String> finPrdCdCode) {
		List<VRscNeedQtyVO> list = service.findVRscNeedQty(finPrdCdCode);
		return new ResponseEntity<List<VRscNeedQtyVO>>(list, HttpStatus.OK);// ?????????,????????? OK = 200, NOTFOUND = 404
	}

	// ???????????? ?????? ??????
	@PostMapping("/insertinstanddetail")
	public void insertInstAndDetail(@RequestBody InstAndDetailVO vo) {
		service.insertInstAndDetail(vo);
	}

	// ????????????????????? ????????????
	@PutMapping("/updateneedqty") // ??????????????? JSON?????? ????????????
	public void todoUpdate(@RequestBody Map<String, String> needQty) {
		System.out.println(needQty.get("needQty"));
		System.out.println(needQty.get("rscCdCode"));
		service.updateNeedQty(needQty.get("needQty"), needQty.get("rscCdCode"));
	}

	// ?????? ?????? ?????? ??????
	@GetMapping("/getinst/{instNO}")
	public InstructionVO getInst(@PathVariable int instNO) {
		return service.getInst(instNO);
	}

	// ?????? ???????????? ?????? ?????? ??????
	@GetMapping("/getempname/{empId}")
	public EmpVO getEmpName(@PathVariable String empId) {
		return service.getEmpName(empId);
	}

	// ???????????? ?????? ??????
	@PutMapping("/updateinst")
	public void updateInstruction(@RequestBody InstAndDetailVO vo) {
		service.updateInstruction(vo);
	}

	// ???????????? ??????
	@DeleteMapping("/deleteinst")
	public void deleteInst(@RequestBody InstructionDetailVO vo) {

		service.deleteInst(vo);
	}

	// ???????????? ????????????
	@GetMapping("/findinst")
	public List<InstructionVO> findInst(@RequestParam Map<String, String> QueryParameters) {
		List<InstructionVO> list = service.findInst(QueryParameters.get("instSdate"),QueryParameters.get("instEdate"));
		// System.out.println(list.toString());
		return list;
	}

	// ????????? ???????????? ??????
	@GetMapping("findnotprocinst")
	public List<NotInProcInstVO> findNotInProcInst(@RequestParam int instNo) {
		System.out.println(instNo);
		List<NotInProcInstVO> list = service.findNotInProcInst(instNo);
		return list;
	}

	// ???????????? ??????
	@DeleteMapping("/deleteinsthd")
	public void deleteInst(@RequestBody InstructionVO vo) {
		service.deleteInstHd(vo);
	}
	
	
	@Autowired
	DataSource datasource;
	@RequestMapping("/report.do")
	public void report(HttpServletRequest request, HttpServletResponse response) throws Exception {
	Connection conn = datasource.getConnection();
	// ?????? ????????? jrxml -> jasper
	InputStream stream1 = getClass().getResourceAsStream("/reports/Instruction.jrxml");
	InputStream stream2 = getClass().getResourceAsStream("/reports/subreports.jrxml");

	HashMap<String,Object> map = new HashMap<>();
	map.put("instNo", request.getParameter("instNo"));
	JasperReport jasperReport = JasperCompileManager.compileReport(stream1);
	JasperReport subReport = JasperCompileManager.compileReport(stream2);
	map.put("subReport",subReport);
	
	JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, map, conn);
	
	JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
	
	}
	
}
