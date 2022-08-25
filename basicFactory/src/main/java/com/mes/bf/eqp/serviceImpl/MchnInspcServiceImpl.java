package com.mes.bf.eqp.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.eqp.mapper.MchnInspcMapper;
import com.mes.bf.eqp.service.MchnInspcService;
import com.mes.bf.eqp.vo.MchnInspcVO;

@Service
public class MchnInspcServiceImpl implements MchnInspcService{
	
	@Autowired MchnInspcMapper mapper;

	@Override
	public List<MchnInspcVO> listInspc() {
		return mapper.listInspc();
	}

}
