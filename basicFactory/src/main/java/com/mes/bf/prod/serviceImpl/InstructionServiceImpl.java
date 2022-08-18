package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.vo.ProductCodeVO;
import com.mes.bf.prod.mapper.InstructionMapper;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.vo.InstructionVO;
import com.mes.bf.prod.vo.VInstructionVO;

@Service 
public class InstructionServiceImpl implements InstructionService {

	@Autowired InstructionMapper instmapper;
	
	@Override
	public InstructionVO getInst() {
		return instmapper.getInst();
	}

	@Override
	public List<ProductCodeVO> findAllProduct() {		
		return instmapper.findAllProduct();
	}

	@Override
	public ProductCodeVO findProduct(String prdCdCode, String prdCdName) {
		return instmapper.findProduct(prdCdCode, prdCdName);
	}

	@Override
	public List<VInstructionVO> findAllvInstruction() {
		return instmapper.findAllvInstruction();
	}

}
