package com.mes.bf.prod.controller;

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
import org.springframework.http.MediaType;
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

	// 생산 지시 조회페이지 이동
	@RequestMapping("/inst")
	public ModelAndView inst() {
		ModelAndView mav = new ModelAndView("prod/Instruction");
		return mav;
	}

	// 생산 지시 관리페이지 이동
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

	// 조회 => Get
	@GetMapping(value = "/findemp", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FindEmpVO>> findEmp(@RequestParam Map<String, String> QueryParameters) {
		List<FindEmpVO> list = service.findEmp(QueryParameters.get("empName"));
		return new ResponseEntity<List<FindEmpVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	@GetMapping("/findProdName/{prodCode}")
	public VFindProdAndLineVO findProdName(@PathVariable String prodCode) {
		return service.findProdName(prodCode);
	}

	// 완제품 조회
	@GetMapping(value = "/findproduct", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FinProdCodeVO>> findProduct(@RequestParam Map<String, String> QueryParameters) {
		List<FinProdCodeVO> list = service.findProduct(QueryParameters.get("prdCdCode"),
				QueryParameters.get("prdCdName"));
		return new ResponseEntity<List<FinProdCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 생산지시조회
	@GetMapping(value = "/findvinst", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VInstructionVO>> findVInstruction(@RequestParam Map<String, String> queryParameters) {
		List<VInstructionVO> list = service.findVInstruction(queryParameters.get("instSdate"),
				queryParameters.get("instEdate"), queryParameters.get("vendorName"), queryParameters.get("productName"),
				queryParameters.get("workScope"));
		return new ResponseEntity<List<VInstructionVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 거래처 조회
	@GetMapping(value = "/findvendorcode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VendorCodeVO>> findAllVInstruction(@RequestParam Map<String, String> queryParameters) {
		List<VendorCodeVO> list = service.findVendorCode(queryParameters.get("vendorCode"),
				queryParameters.get("vendCdClfy"));
		return new ResponseEntity<List<VendorCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 공정상태 조회
	@GetMapping(value = "/findprocstatus")
	public ResponseEntity<List<FindProcStatusVO>> findProcStatus(
			@RequestParam(value = "lineName[]") List<String> lineName) {
		System.out.println(lineName);
		List<FindProcStatusVO> list = service.findProcStatus(lineName);

		return new ResponseEntity<List<FindProcStatusVO>>(list, HttpStatus.OK);

	}

	// 제품별 자재 소요 예상량 조회
	@GetMapping("/findvrscneedqty")
	public ResponseEntity<List<VRscNeedQtyVO>> findVRscNeedQty(
			@RequestParam(value = "finPrdCdCode[]") List<String> finPrdCdCode) {
		List<VRscNeedQtyVO> list = service.findVRscNeedQty(finPrdCdCode);
		return new ResponseEntity<List<VRscNeedQtyVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 생산지시 등록 통합
	@PostMapping("/insertinstanddetail")
	public void insertInstAndDetail(@RequestBody InstAndDetailVO vo) {
		service.insertInstAndDetail(vo);
	}

	// 자재소요예상량 업데이트
	@PutMapping("/updateneedqty") // 파라미터가 JSON이라 파싱필요
	public void todoUpdate(@RequestBody Map<String, String> needQty) {
		System.out.println(needQty.get("needQty"));
		System.out.println(needQty.get("rscCdCode"));
		service.updateNeedQty(needQty.get("needQty"), needQty.get("rscCdCode"));
	}

	// 생산 지시 헤더 조회
	@GetMapping("/getinst/{instNO}")
	public InstructionVO getInst(@PathVariable int instNO) {
		return service.getInst(instNO);
	}

	// 직원 이이디로 직원 이름 찾기
	@GetMapping("/getempname/{empId}")
	public EmpVO getEmpName(@PathVariable String empId) {
		return service.getEmpName(empId);
	}

	// 생산지시 전체 수정
	@PutMapping("/updateinst")
	public void updateInstruction(@RequestBody InstAndDetailVO vo) {
		service.updateInstruction(vo);
	}

	// 생산지시 삭제
	@DeleteMapping("/deleteinst")
	public void deleteInst(@RequestBody InstructionDetailVO vo) {

		service.deleteInst(vo);
	}

	// 생산지시 전체조회
	@GetMapping("/findinst")
	public List<InstructionVO> findInst(@RequestParam Map<String, String> QueryParameters) {
		List<InstructionVO> list = service.findInst(QueryParameters.get("instSdate"),QueryParameters.get("instEdate"));
		// System.out.println(list.toString());
		return list;
	}

	// 진행전 생산지시 조회
	@GetMapping("findnotprocinst")
	public List<NotInProcInstVO> findNotInProcInst(@RequestParam int instNo) {
		System.out.println(instNo);
		List<NotInProcInstVO> list = service.findNotInProcInst(instNo);
		return list;
	}

	// 생산지시 삭제
	@DeleteMapping("/deleteinsthd")
	public void deleteInst(@RequestBody InstructionVO vo) {
		service.deleteInstHd(vo);
	}
	
	
	@Autowired
	DataSource datasource;
	@RequestMapping("/report.do")
	public void report(HttpServletRequest request, HttpServletResponse response) throws Exception {
	Connection conn = datasource.getConnection();
	// 소스 컴파일 jrxml -> jasper
	InputStream stream1 = getClass().getResourceAsStream("/reports/Instruction.jrxml");
	InputStream stream2 = getClass().getResourceAsStream("/reports/subreports.jrxml");
	
	//파라미터 맵
//	System.out.println("====================================================");
//	System.out.println(request.getParameter("instNo"));
//	System.out.println("====================================================");
	HashMap<String,Object> map = new HashMap<>();
	map.put("instNo", request.getParameter("instNo"));
	
	JasperReport jasperReport = JasperCompileManager.compileReport(stream1);
	JasperReport subReport = JasperCompileManager.compileReport(stream2);
	map.put("subReport",subReport);
	
	JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, map, conn);
	
	JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
	
	}
	
}
