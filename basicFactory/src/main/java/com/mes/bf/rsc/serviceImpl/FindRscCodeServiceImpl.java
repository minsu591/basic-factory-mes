package com.mes.bf.rsc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.vo.RscCodeVO;
import com.mes.bf.rsc.mapper.FindRscCodeMapper;
import com.mes.bf.rsc.service.FindRscCodeService;
import com.mes.bf.rsc.vo.RscStockVO;
@Service
public class FindRscCodeServiceImpl implements FindRscCodeService{
	
	@Autowired FindRscCodeMapper rscCodeMapper;
	
	@Override
	public List<RscCodeVO> rscCodeList(String rscCdName, String rscCdClfy) {
		return rscCodeMapper.rscCodeList(rscCdName, rscCdClfy);
	}

	@Override
	public List<RscStockVO> rscLotNoList(String rscCdName) {
		return rscCodeMapper.rscLotNoList(rscCdName);
	}

}
