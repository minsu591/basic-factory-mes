package com.mes.bf.prod.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.eqp.vo.VfindMchnVO;
import com.mes.bf.prod.service.ProcService;
import com.mes.bf.prod.vo.InstructionDetailVO;
import com.mes.bf.prod.vo.ProcManageVO;
import com.mes.bf.prod.vo.ProcessPerformVO;
import com.mes.bf.prod.vo.ProcessVO;
import com.mes.bf.prod.vo.ProdRscOutVO;
import com.mes.bf.prod.vo.VFindProcPerformVO;

@RestController
@RequestMapping("/prod")
public class ProcController {

	@Autowired
	ProcService service;

	// 공정실적 조회페이지 이동
	@RequestMapping("/proc")
	public ModelAndView proc() {
		ModelAndView mav = new ModelAndView("prod/Proc");
		return mav;
	}

	// 공정실적 관리페이지 이동
	@RequestMapping("/procManage")
	public ModelAndView procManage() {
		ModelAndView mav = new ModelAndView("prod/ProcManage");
		return mav;
	}

	// 공정모니터링 페이지 이동
	@RequestMapping("/monitoring")
	public ModelAndView monitoring() {
		ModelAndView mav = new ModelAndView("prod/Monitoring");
		return mav;
	}

	// 포장관리 페이지 이동
	@RequestMapping("/packing")
	public ModelAndView packing() {
		ModelAndView mav = new ModelAndView("prod/PackingManage");
		return mav;
	}

	// 설비명 조회
	@GetMapping(value = "/findmchn", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VfindMchnVO>> findEmp(@RequestParam Map<String, String> QueryParameters) {
		List<VfindMchnVO> list = service.findMchn(QueryParameters.get("mchnCode"), QueryParameters.get("mchnName"));
		return new ResponseEntity<List<VfindMchnVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 공정명 조회
	@GetMapping(value = "/findproccode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<ProcCodeVO>> findProcCode(@RequestParam Map<String, String> QueryParameters) {
		List<ProcCodeVO> list = service.findProcCode(QueryParameters.get("procCdCode"),
				QueryParameters.get("procCdName"));
		return new ResponseEntity<List<ProcCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 공정실적 전체조회
	@GetMapping(value = "/findprocperform", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VFindProcPerformVO>> findProcPerform(@RequestParam Map<String, String> QueryParameters) {
		List<VFindProcPerformVO> list = service.findProcPerform(QueryParameters.get("workSdate"),
				QueryParameters.get("workEdate"), QueryParameters.get("procCdName"), QueryParameters.get("mchnName"),
				QueryParameters.get("empId"));
		return new ResponseEntity<List<VFindProcPerformVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 공정실적관리 테이블 조회
	@GetMapping(value = "/findprocmanage", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<ProcManageVO>> findProcManage(@RequestParam Map<String, String> QueryParameters) {
		List<ProcManageVO> list = service.findProcManage(QueryParameters.get("finPrdCdName"),
				QueryParameters.get("workDate"));
		return new ResponseEntity<List<ProcManageVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 공정테이블 조회
	@GetMapping("/findprocess/{instProdNo}")
	public ResponseEntity<List<ProcessVO>> findProcess(@PathVariable int instProdNo) {
		List<ProcessVO> list = service.findProcess(instProdNo);
		return new ResponseEntity<List<ProcessVO>>(list, HttpStatus.OK);
	}

	// 설비명,상태 조회
	@GetMapping("/selectmchn/{finPrdCdCode}")
	public ResponseEntity<List<MchnVO>> selectMchn(@PathVariable String finPrdCdCode) {
		List<MchnVO> list = service.selectMchn(finPrdCdCode);
		return new ResponseEntity<List<MchnVO>>(list, HttpStatus.OK);
	}

	// 실적량 업데이트
	@PutMapping("/updateprodvol") // 파라미터가 JSON이라 파싱필요
	public void updateProcVol(@RequestBody ProcessVO vo) {
		System.out.println(vo);
		service.updateProcVol(vo);
	}

	// 공정테이블 불량수정
	@PutMapping("/updatefltyvol")
	public void updateFltyVol(@RequestBody ProcessVO vo) {
		service.updateFltyVol(vo);
	}

	// 설비상태 업데이트
	@PutMapping("/updatemchnstts")
	public void updateMchnStts(@RequestBody MchnVO vo) {
		service.updateMchnStts(vo);
	}

	// 공정테이블 완료 여부 업데이트
	@PutMapping("/updateproccheck")
	public void updateProcCheck(@RequestBody ProcessVO vo) {
		service.updateProcCheck(vo);
	}

	// 달성률 업데이트
	@PutMapping("/updateachierate")
	public void update(@RequestBody ProcessVO vo) {
		service.updateachieRate(vo);
	}

	// 공정 실적 등록
	@PostMapping("/insertprocperform")
	public void insertProcPerform(@RequestBody ProcessPerformVO vo) {
		System.out.println(vo);
		service.insertProcPerform(vo);
	}

	// 공정 완료 후 다음공정 입고량 업데이트
	@PutMapping("/updateprocindtlvol")
	public void updateProcInDtlVol(@RequestBody ProcessVO vo) {
		System.out.println(vo);
		service.updateProcInDtlVol(vo);
	}

	// 공정 실적 테이블 단건 검색
	@GetMapping(value = "/getprocperform/{processNo}")
	public ResponseEntity<ProcessPerformVO> getProcPerform(@PathVariable int processNo) {
		ProcessPerformVO vo = service.getProcPerform(processNo);
		return new ResponseEntity<ProcessPerformVO>(vo, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

//	// 제품명으로 자재 사용량 및 재고량 조
//	@GetMapping("/findrscvo/{finPrdCdCode}")
//	public ResponseEntity<List<FindRscVO>> findRscVO(@PathVariable String finPrdCdCode) {
//		List<FindRscVO> list = service.findRscVO(finPrdCdCode);
//		return new ResponseEntity<List<FindRscVO>>(list, HttpStatus.OK);
//	}

	// 자재 사용량 출고내역 등록
	@PostMapping("/insertrscout")
	public void insertRscOut(@RequestBody ProdRscOutVO vo) {
		System.out.println(vo);
		service.insertRscOut(vo);
	}

	// 작업구분 업데이트
	@PutMapping("/updateworkscope")
	public void updateWorkScope(@RequestBody InstructionDetailVO vo) {
		System.out.println(vo);
		service.updateWorkScope(vo);
	}


}
