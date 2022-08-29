package com.mes.bf.rsc.serviceImpl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.rsc.mapper.RscInMapper;
import com.mes.bf.rsc.service.RscInService;
import com.mes.bf.rsc.vo.RscInVO;
import com.mes.bf.rsc.vo.RscInspVO;

@Service
public class RscInServiceImpl implements RscInService {

	@Autowired RscInMapper rscInMapper;
	
	@Override
	public List<RscInVO> inList(String rscInCode, String rscCdCode, String rscInSDate, String rscInEDate) {
		return rscInMapper.inList(rscInCode, rscCdCode, rscInSDate, rscInEDate);
	}

	@Override
	public List<RscInspVO> inspCompList(String rscCdCode, String inspDate) {
		return rscInMapper.inspCompList(rscCdCode, inspDate);
	}

	@Override
	public int inInsert(RscInspVO vo) {
		return rscInMapper.inInsert(vo);
	}

}
