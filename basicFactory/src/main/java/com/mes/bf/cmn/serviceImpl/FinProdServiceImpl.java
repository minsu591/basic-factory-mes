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
	public List<FinProdCodeVO> listFinProd() {
		return mapper.listFinProd();
	}

}
