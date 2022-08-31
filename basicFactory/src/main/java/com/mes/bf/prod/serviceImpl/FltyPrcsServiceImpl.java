package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.vo.FaultyCodeVO;
import com.mes.bf.prod.mapper.FltyPrcsMapper;
import com.mes.bf.prod.service.FltyPrcsService;
import com.mes.bf.prod.vo.FltyPrcsVO;
import com.mes.bf.prod.vo.VFindProcPerformVO;

@Service
public class FltyPrcsServiceImpl implements FltyPrcsService{
	
	@Autowired FltyPrcsMapper mapper;
	
	@Override
	public List<FltyPrcsVO> findlistFltyPrcs(String fltyPrcsSdate, String fltyPrcsEdate) {
		return mapper.findlistFltyPrcs(fltyPrcsSdate, fltyPrcsEdate);
	}

	@Override
	public List<VFindProcPerformVO> findProcFlty() {
		return mapper.findProcFlty();
	}

	@Override
	public List<FaultyCodeVO> findFltyCode(String faultyCode) {
		return mapper.findFltyCode(faultyCode);
	}

	@Override
	public List<FltyPrcsVO> listFltyPrcs() {
		return mapper.listFltyPrcs();
	}

	@Override
	public List<FltyPrcsVO> findFltyPrcs(String fltyPrcsSdate, String fltyPrcsEdate, String finPrdCdName) {
		return mapper.findFltyPrcs(fltyPrcsSdate, fltyPrcsEdate, finPrdCdName);
	}

	
	
	

}
