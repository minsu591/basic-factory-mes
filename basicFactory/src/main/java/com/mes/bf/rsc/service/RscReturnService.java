package com.mes.bf.rsc.service;

import java.util.List;

import com.mes.bf.rsc.vo.RscReturnVO;

public interface RscReturnService {
	List<RscReturnVO> returnList(String rscReturnCode, String vendor, String rscReturnSDate, String rscReturnEDate);	
}
