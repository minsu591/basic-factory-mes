package com.mes.bf.rsc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.rsc.mapper.RscOutMapper;
import com.mes.bf.rsc.service.RscOutService;
import com.mes.bf.rsc.vo.RscOutVO;

@Service
public class RscOutServiceImpl implements RscOutService {

	@Autowired RscOutMapper rscOutMapper;

	@Override
	public List<RscOutVO> normalOutList(String rscOutCode, String rscCdCode, String rscOutSDate, String rscOutEDate) {
		return rscOutMapper.normalOutList(rscOutCode, rscCdCode, rscOutSDate, rscOutEDate);
	}

	@Override
	public List<RscOutVO> exceptOutList(String rscOutCode, String rscCdCode, String rscOutSDate, String rscOutEDate) {
		return rscOutMapper.exceptOutList(rscOutCode, rscCdCode, rscOutSDate, rscOutEDate);
	}

	@Override
	public int OutInsert(RscOutVO vo) {
		return rscOutMapper.OutInsert(vo);
		
	}

	@Override
	public void OutUpdate(RscOutVO vo) {
		
	}

}
