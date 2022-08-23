package com.mes.bf.cmn.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.mapper.RscMapper;
import com.mes.bf.cmn.service.RscService;
import com.mes.bf.cmn.vo.RscCodeVO;

@Service
public class RscServiceImpl implements RscService {
	
	@Autowired RscMapper mapper;

	@Override
	public List<RscCodeVO> listRsc() {
		return mapper.listRsc();
	}

}
