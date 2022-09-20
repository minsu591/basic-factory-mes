package com.mes.bf.common.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.common.Criteria;
import com.mes.bf.common.mapper.CommonMapper;
import com.mes.bf.common.service.CommonService;
import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.sales.vo.SlsOutDtlForMainVO;
@Service

public class CommonServiceImpl implements CommonService {
@Autowired CommonMapper mapper;
	@Override
	public int getMchnTotalCount(Criteria cri) {
		return mapper.getMchnTotalCount(cri);
	}
	@Override
	public List<MchnVO> findMchn(Criteria cri) {
		return mapper.findMchn(cri);
	}
	@Override
	public List<SlsOutDtlForMainVO> findOutFinForMain() {
		return mapper.findOutFinForMain();
	}
	@Override
	public Integer findInstOrd() {
		return mapper.findInstOrd();
	}
	@Override
	public Integer findProcPerf() {
		return mapper.findProcPerf();
	}
	@Override
	public Integer findFinOut() {
		return mapper.findFinOut();
	}

}
