package com.mes.bf.rsc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.common.Criteria;
import com.mes.bf.rsc.mapper.RscOutMapper;
import com.mes.bf.rsc.service.RscOutService;
import com.mes.bf.rsc.vo.RscOutVO;

@Service
public class RscOutServiceImpl implements RscOutService {

	@Autowired RscOutMapper rscOutMapper;

	@Override
	public RscOutVO exceptOut(String rscOutCode) {
		return rscOutMapper.exceptOut(rscOutCode);
	}
	
	@Override
	public int OutInsert(RscOutVO vo) {
		return rscOutMapper.OutInsert(vo);
		
	}

	@Override
	public int OutUpdate(RscOutVO vo) {
		return rscOutMapper.OutUpdate(vo);
	}

	@Override
	public List<RscOutVO> normalOutList(Criteria cri) {
		return rscOutMapper.normalOutList(cri);
	}

	@Override
	public List<RscOutVO> exceptOutList(Criteria cri) {
		return rscOutMapper.exceptOutList(cri);
	}

	@Override
	public Integer outNListCount(Criteria cri) {
		return rscOutMapper.outNListCount(cri);
	}

	@Override
	public Integer outEListCount(Criteria cri) {
		return rscOutMapper.outEListCount(cri);
	}


}
