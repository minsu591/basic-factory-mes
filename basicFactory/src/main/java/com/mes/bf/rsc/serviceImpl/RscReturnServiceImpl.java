package com.mes.bf.rsc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.rsc.mapper.RscReturnMapper;
import com.mes.bf.rsc.service.RscReturnService;
import com.mes.bf.rsc.vo.RscReturnVO;

@Service
public class RscReturnServiceImpl implements RscReturnService {

	@Autowired RscReturnMapper rscRetrunMapper;
	
	@Override
	public List<RscReturnVO> returnList(String rscReturnCode, String vendor, String rscReturnSDate, String rscReturnEDate) {
		return rscRetrunMapper.returnList(rscReturnCode, vendor, rscReturnSDate, rscReturnEDate);
	}

}
