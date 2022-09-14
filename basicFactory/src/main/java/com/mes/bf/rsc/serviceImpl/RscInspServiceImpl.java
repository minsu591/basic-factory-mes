package com.mes.bf.rsc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.rsc.mapper.RscInspMapper;
import com.mes.bf.rsc.service.RscInspService;
import com.mes.bf.rsc.vo.RscInspVO;
import com.mes.bf.rsc.vo.RscOrderVO;

@Service
public class RscInspServiceImpl implements RscInspService {

	@Autowired RscInspMapper rscInspMapper;
	
	@Override
	public List<RscOrderVO> inspListLoad(String rscOrderCode, String rscOrderTitle, String rscOrderDate) {
		return rscInspMapper.inspListLoad(rscOrderCode, rscOrderTitle, rscOrderDate);
	}
	
	@Override
	public RscInspVO inspVoLoad(String rscInspCode) {
		return rscInspMapper.inspVoLoad(rscInspCode);
	}
	
	@Override
	public Integer inspInsert(RscInspVO vo) {
		return rscInspMapper.inspInsert(vo);
	}
	
	@Override
	public Integer inspUpdate(RscInspVO vo) {
		return rscInspMapper.inspUpdate(vo);
	}
	
	@Override
	public List<RscInspVO> inspList(String rscInspCode, String rscCdCode, String rscInspSDate, String rscInspEDate) {
		return rscInspMapper.inspList(rscInspCode, rscCdCode, rscInspSDate, rscInspEDate);
	}


}
