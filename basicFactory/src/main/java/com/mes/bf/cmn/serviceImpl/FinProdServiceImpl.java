package com.mes.bf.cmn.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.mapper.FinProdMapper;
import com.mes.bf.cmn.service.FinProdService;
import com.mes.bf.cmn.vo.FinProdCodeVO;

@Service
public class FinProdServiceImpl implements FinProdService {
	
	@Autowired FinProdMapper mapper;
	@Override
	public List<FinProdCodeVO> listFinProd(String finName) {
		return mapper.listFinProd(finName);
	}
	@Override
	public int finProdDelete(String priKey) {
		return mapper.finProdDelete(priKey);
	}
	@Override
	public int finProdUpdate(String priKey, String updCol, String updCont) {
		return mapper.finProdUpdate(priKey, updCol, updCont);
	}

	@Override
	public int finProdInsert(FinProdCodeVO finProd) {
		return mapper.finProdInsert(finProd);
	}

}
