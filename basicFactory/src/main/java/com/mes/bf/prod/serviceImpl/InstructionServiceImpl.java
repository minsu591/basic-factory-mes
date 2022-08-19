package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.prod.mapper.InstructionMapper;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.vo.InstructionVO;

@Service 
public class InstructionServiceImpl implements InstructionService {

	@Autowired InstructionMapper instmapper;
	
	@Override
	public InstructionVO getInst() {
		return instmapper.getInst();
	}

	@Override
	public List<FinProdCodeVO> findAllProduct() {		
		return instmapper.findAllProduct();
	}

	@Override
	public FinProdCodeVO findProduct(String prdCdCode, String prdCdName) {
		return instmapper.findProduct(prdCdCode, prdCdName);
	}

}
