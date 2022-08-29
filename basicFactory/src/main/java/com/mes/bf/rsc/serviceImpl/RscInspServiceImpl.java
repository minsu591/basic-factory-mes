package com.mes.bf.rsc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.rsc.mapper.RscInspMapper;
import com.mes.bf.rsc.service.RscInspService;
import com.mes.bf.rsc.vo.RscInspVO;

@Service
public class RscInspServiceImpl implements RscInspService {

	@Autowired RscInspMapper rscInspMapper;
	
	@Override
	public List<RscInspVO> inspList(String rscInspCode, String rscCdCode, String rscInspSDate, String rscInspEDate) {
		return rscInspMapper.inspList(rscInspCode, rscCdCode, rscInspSDate, rscInspEDate);
	}

}
