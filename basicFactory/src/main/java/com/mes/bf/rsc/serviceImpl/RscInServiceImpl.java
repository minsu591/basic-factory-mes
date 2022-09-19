package com.mes.bf.rsc.serviceImpl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.common.Criteria;
import com.mes.bf.rsc.mapper.RscInMapper;
import com.mes.bf.rsc.service.RscInService;
import com.mes.bf.rsc.vo.RscInVO;
import com.mes.bf.rsc.vo.RscInspVO;

@Service
public class RscInServiceImpl implements RscInService {

	@Autowired RscInMapper rscInMapper;
	

	@Override
	public List<RscInspVO> inspCompList(Criteria cri) {
		return rscInMapper.inspCompList(cri);
	}
	
	@Override
	public Integer inspCompListCount(Criteria cri) {
		return rscInMapper.inspCompListCount(cri);
	}

	@Override
	public int inInsert(RscInspVO vo) {
		return rscInMapper.inInsert(vo);
	}

	@Override
	public List<RscInVO> inList(Criteria cri) {
		return rscInMapper.inList(cri);
	}

	@Override
	public Integer inListCount(Criteria cri) {
		return rscInMapper.inListCount(cri);
	}

}
