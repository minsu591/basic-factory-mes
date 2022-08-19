package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.vo.ProductCodeVO;
import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.prod.mapper.InstructionMapper;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.vo.FindEmpVO;
import com.mes.bf.prod.vo.InstructionVO;
import com.mes.bf.prod.vo.VInstructionVO;

@Service 
public class InstructionServiceImpl implements InstructionService {

	@Autowired InstructionMapper mapper;
	
	@Override
	public InstructionVO getInst() {
		return mapper.getInst();
	}

	@Override
	public List<ProductCodeVO> findAllProduct() {		
		return mapper.findAllProduct();
	}

	@Override
	public ProductCodeVO findProduct(String prdCdCode, String prdCdName) {
		return mapper.findProduct(prdCdCode, prdCdName);
	}

	@Override
	public List<VInstructionVO> findAllvInstruction() {
		return mapper.findAllvInstruction();
	}
	
	@Override
	public List<FindEmpVO> findEmp() {
		return mapper.findEmp();
	}

	@Override
	public FindEmpVO findEmpName(String empName) {
		return mapper.findEmpName(empName);
	}

	@Override
	public ProductCodeVO findProdName(String ProdCode) {

		return mapper.findProdName(ProdCode);
	}

	@Override
	public List<VendorCodeVO> findAllVendorCode() {
		return mapper.findAllVendorCode();
	}

}
