package com.mes.bf.cmn.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.mapper.BomMapper;
import com.mes.bf.cmn.service.BomService;
import com.mes.bf.cmn.vo.BomRscDtlVO;
import com.mes.bf.cmn.vo.BomVO;

@Service
public class BomServiceImpl implements BomService {
	@Autowired BomMapper mapper;
	@Override
	public List<BomVO> listBom(String finName) {
		return mapper.listBom(finName);
	}
	@Override
	public List<BomRscDtlVO> findBomRsc(String bomCode) {
		return mapper.findBomRsc(bomCode);
	}

}
