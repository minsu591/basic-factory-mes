package com.mes.bf.cmn.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.mapper.RscCodeMapper;
import com.mes.bf.cmn.service.RscCodeService;
import com.mes.bf.cmn.vo.RscCodeVO;

@Service
public class RscCodeServiceImpl implements RscCodeService {
	
	@Autowired RscCodeMapper mapper;

	@Override
	public List<RscCodeVO> listRsc(String rscCdName) {
		return mapper.listRsc(rscCdName);
	}

	@Override
	public int rscDelete(List<String> delList) {
		return mapper.rscDelete(delList);
	}

	@Override
	public int rscUpdate(String priKey, String updCol, String updCont) {
		return mapper.rscUpdate(priKey, updCol, updCont);
	}

	@Override
	public int rscInsert(RscCodeVO vo) {
		return mapper.rscInsert(vo);
	}

}
