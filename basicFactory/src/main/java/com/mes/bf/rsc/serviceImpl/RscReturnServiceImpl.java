package com.mes.bf.rsc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.common.Criteria;
import com.mes.bf.rsc.mapper.RscReturnMapper;
import com.mes.bf.rsc.service.RscReturnService;
import com.mes.bf.rsc.vo.RscReturnVO;

@Service
public class RscReturnServiceImpl implements RscReturnService {

	@Autowired RscReturnMapper rscRetrunMapper;
	
	
	@Override
	public RscReturnVO loadReturn(String rscReturnCode) {
		return rscRetrunMapper.loadReturn(rscReturnCode);
	}

	@Override
	public int returnInsert(RscReturnVO vo) {
		return rscRetrunMapper.returnInsert(vo);
	}

	@Override
	public int returnUpdate(RscReturnVO vo) {
		return rscRetrunMapper.returnUpdate(vo);
	}

	@Override
	public List<RscReturnVO> returnList(Criteria cri) {
		return rscRetrunMapper.returnList(cri);
	}

	@Override
	public Integer returnListCount(Criteria cri) {
		return rscRetrunMapper.returnListCount(cri);
	}

}
