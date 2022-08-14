package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.prod.mapper.EmpTestMapper;
import com.mes.bf.prod.service.EmpTestService;
import com.mes.bf.prod.vo.EmpTestVO;
@Service
public class EmpTestServiceImpl implements EmpTestService {

	@Autowired EmpTestMapper mapper;
	
	@Override
	public List<EmpTestVO> findAll() {
		return mapper.findAll();
	}

}
