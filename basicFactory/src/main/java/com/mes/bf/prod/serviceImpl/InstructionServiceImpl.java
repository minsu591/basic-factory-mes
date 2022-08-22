package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.prod.mapper.InstructionMapper;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.vo.FindEmpVO;
import com.mes.bf.prod.vo.FindProcStatusVO;
import com.mes.bf.prod.vo.InstructionVO;
import com.mes.bf.prod.vo.VFindProdAndLineVO;
import com.mes.bf.prod.vo.VInstructionVO;
import com.mes.bf.prod.vo.VRscNeedQtyVO;

@Service 
public class InstructionServiceImpl implements InstructionService {

	@Autowired InstructionMapper mapper;
	
	@Override
	public List<FinProdCodeVO> findProduct(String prdCdCode, String prdCdName) {		
		return mapper.findProduct(prdCdCode, prdCdName);
	}

	@Override
	public List<VInstructionVO> findVInstruction(String instSdate,String instEdate,String vendorName,String productName) {
		return mapper.findVInstruction(instSdate,instEdate,vendorName,productName);
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
	public List<VendorCodeVO> findVendorCode(String vendorCode,String vendCdClfy) {
		return mapper.findVendorCode(vendorCode,vendCdClfy);
	}

	@Override
	public List<FindProcStatusVO> findProcStatus(String lineName) {
		return mapper.findProcStatus(lineName);
	}

	@Override
	public List<VRscNeedQtyVO> findVRscNeedQty(String lineCdHdName) {
		
		return mapper.findVRscNeedQty(lineCdHdName);
	}

}
