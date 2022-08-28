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
	public List<RscCodeVO> listRsc(String rscCode) {
		return mapper.listRsc(rscCode);
	}

}
