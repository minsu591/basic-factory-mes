package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.prod.mapper.InstManageMapper;
import com.mes.bf.prod.service.InstManageService;
import com.mes.bf.prod.vo.FindEmpVO;

@Service
public class InstManageServiceImpl implements InstManageService {

	@Autowired
	InstManageMapper mapper;

	@Override
	public List<FindEmpVO> findEmp() {
		return mapper.findEmp();
	}

	@Override
	public FindEmpVO findEmpName(String empName) {
		return mapper.findEmpName(empName);
	}

	@Override
	public FinProdCodeVO findProdName(String ProdCode) {

		return mapper.findProdName(ProdCode);
	}

}