package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.vo.FaultyCodeVO;
import com.mes.bf.prod.mapper.FltyPrcsMapper;
import com.mes.bf.prod.service.FltyPrcsService;
import com.mes.bf.prod.vo.FindProcFltyVO;
import com.mes.bf.prod.vo.FltyPrcsVO;

@Service
public class FltyPrcsServiceImpl implements FltyPrcsService{
	
	@Autowired FltyPrcsMapper mapper;
	
	//불량처리목록
	@Override
	public List<FltyPrcsVO> findlistFltyPrcs(String fltyPrcsSdate, String fltyPrcsEdate) {
		return mapper.findlistFltyPrcs(fltyPrcsSdate, fltyPrcsEdate);
	}
	//생산중불량조회
	@Override
	public List<FindProcFltyVO> procFlty() {
		return mapper.procFlty();
	}
	@Override
	public int fltyPrcsInsert(FltyPrcsVO vo) {
		return mapper.fltyPrcsInsert(vo);
	}
	@Override
	public int fltyPrcsUpdate(String prikey, String updCol, String updCont) {
		return mapper.fltyPrcsUpdate(prikey, updCol, updCont);
	}
	//불량코드 조회
	@Override
	public List<FaultyCodeVO> findFltyCode(String faultyCode) {
		return mapper.findFltyCode(faultyCode);
	}
	
	
	//불량처리조회
	@Override
	public List<FltyPrcsVO> listFltyPrcs() {
		return mapper.listFltyPrcs();
	}
	//불량처리상세조회
	@Override
	public List<FltyPrcsVO> findFltyPrcs(String fltyPrcsSdate, String fltyPrcsEdate, String finPrdCdName) {
		return mapper.findFltyPrcs(fltyPrcsSdate, fltyPrcsEdate, finPrdCdName);
	}
	
}
