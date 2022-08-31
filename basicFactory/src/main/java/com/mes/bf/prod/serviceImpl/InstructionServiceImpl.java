package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
			String productName) {
		return mapper.findVInstruction(instSdate, instEdate, vendorName, productName);
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

	@Override
	public List<FindProcStatusVO> findProcStatus(String lineName) {
		return mapper.findProcStatus(lineName);
	}

	@Override
	public List<VRscNeedQtyVO> findVRscNeedQty(String finPrdCdCode) {

		return mapper.findVRscNeedQty(finPrdCdCode);
	}

	@Override
	@Transactional
	public void insertInstruction(InstructionVO vo, InstructionDetailVO detailvo) {
		mapper.insertInstruction(vo);
		//mapper.insertInstructionDetail(detailvo);

	}

	@Override
	public void insertProc(String finPrdCdCode) {
		mapper.insertProc(finPrdCdCode);
	}

	@Override
	public void insertNeedQty(String finPrdCdCode) {
		mapper.insertNeedQty(finPrdCdCode);

	}

	@Override
	public void updateNeedQty(String needQty, String rscCdCode) {
		mapper.updateNeedQty(needQty, rscCdCode);

	}

	@Override
	public void updateinDtlVol(int indicaVol) {
		mapper.updateinDtlVol(indicaVol);
	}

	//생산지시 통합입력
	@Override
	public void insertInstAndDetail(InstAndDetailVO vo) {
		mapper.insertInstruction(vo.getVo());
		mapper.insertInstructionDetail(vo.getDetailvo());
	}

}
