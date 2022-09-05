package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mes.bf.cmn.vo.EmpVO;
import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.prod.mapper.InstructionMapper;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.vo.FindEmpVO;
import com.mes.bf.prod.vo.FindProcStatusVO;
import com.mes.bf.prod.vo.InstAndDetailVO;
import com.mes.bf.prod.vo.InstructionDetailVO;
import com.mes.bf.prod.vo.InstructionVO;
import com.mes.bf.prod.vo.ProcessVO;
import com.mes.bf.prod.vo.VFindProdAndLineVO;
import com.mes.bf.prod.vo.VInstructionVO;
import com.mes.bf.prod.vo.VRscNeedQtyVO;

@Service
public class InstructionServiceImpl implements InstructionService {

	@Autowired
	InstructionMapper mapper;

	@Override
	public List<FinProdCodeVO> findProduct(String prdCdCode, String prdCdName) {
		return mapper.findProduct(prdCdCode, prdCdName);
	}

	@Override
	public List<VInstructionVO> findVInstruction(String instSdate, String instEdate, String vendorName,
			String productName,String workScope) {
		return mapper.findVInstruction(instSdate, instEdate, vendorName, productName,workScope);
	}

	@Override
	public List<FindEmpVO> findEmp(String empName) {
		return mapper.findEmp(empName);
	}

	@Override
	public VFindProdAndLineVO findProdName(String ProdCode) {

		return mapper.findProdName(ProdCode);
	}

	@Override
	public List<VendorCodeVO> findVendorCode(String vendorCode, String vendCdClfy) {
		return mapper.findVendorCode(vendorCode, vendCdClfy);
	}

//	@Override
//	public List<FindProcStatusVO> findProcStatus(String lineName) {
//		return mapper.findProcStatus(lineName);
//	}
	@Override
	public List<FindProcStatusVO> findProcStatus(List<String> lineName) {
		return mapper.findProcStatus(lineName);
	}

//	@Override
//	public List<VRscNeedQtyVO> findVRscNeedQty(String finPrdCdCode) {
//
//		return mapper.findVRscNeedQty(finPrdCdCode);
//	}
	
	@Override
	public List<VRscNeedQtyVO> findVRscNeedQty(List<String> finPrdCdCode) {
		return mapper.findVRscNeedQty(finPrdCdCode);
	}

//	@Override
//	@Transactional
//	public void insertInstruction(InstructionVO vo, InstructionDetailVO detailvo) {
//		mapper.insertInstruction(vo);
//		mapper.insertInstructionDetail(detailvo);
//		mapper.insertNeedQty(detailvo.getFinPrdCdCode());//자재소요예상량입력
//		mapper.insertProc(detailvo.getFinPrdCdCode()); //공정별 데이터 입력
//		mapper.updateinDtlVol(detailvo.getInstProdIndicaVol());//최초공정 입고량 업데이트
//	}

	@Override
	public void updateNeedQty(String needQty, String rscCdCode) {
		mapper.updateNeedQty(needQty, rscCdCode);

	}

	//생산지시 통합입력
	@Override
	@Transactional
	public void insertInstAndDetail(InstAndDetailVO vo) {
		mapper.insertInstruction(vo.getVo());
		for(InstructionDetailVO str : vo.getDetailvo()) {
			mapper.insertInstructionDetailList(str);
			mapper.insertNeedQty(str.getFinPrdCdCode());//자재소요예상량입력
			mapper.insertProc(str.getFinPrdCdCode()); //공정별 데이터 입력
			mapper.updateinDtlVol(str.getInstProdIndicaVol());//최초공정 입고량 업데이트
		}
	}

	@Override
	public void updateInst(VInstructionVO vo) {
		mapper.updateInst(vo);
	}

	@Override
	public InstructionVO getInst(int instNo) {
		return mapper.getInst(instNo);
	}

	@Override
	public EmpVO getEmpName(String empId) {
		return mapper.getEmpName(empId);
	}

	@Override
	@Transactional
	public void updateInstruction(InstAndDetailVO vo) {
		mapper.updateInstHeader(vo.getVo());
		for(InstructionDetailVO str : vo.getDetailvo()) {
			mapper.updateInstDetail(str);
		}
	}
	

}
