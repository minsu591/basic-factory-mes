package com.mes.bf.rsc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.rsc.mapper.RscInMapper;
import com.mes.bf.rsc.service.RscInService;
import com.mes.bf.rsc.vo.RscInVO;

@Service
public class RscInServiceImpl implements RscInService {

	@Autowired RscInMapper rscInMapper;
	
	@Override
	public List<RscInVO> inList() {
		return rscInMapper.inList();
	}

}
