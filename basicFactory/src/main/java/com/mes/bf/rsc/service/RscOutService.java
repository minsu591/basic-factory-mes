package com.mes.bf.rsc.service;

import java.util.List;

import com.mes.bf.rsc.vo.RscOutVO;

public interface RscOutService {
	List<RscOutVO> normalOutList(String rscOutCode, String rscCdCode, String rscOutSDate, String rscOutEDate);
	List<RscOutVO> exceptOutList(String rscOutCode, String rscCdCode, String rscOutSDate, String rscOutEDate);
	
	RscOutVO exceptOut(String rscOutCode);
	
	int OutInsert(RscOutVO vo);
	int OutUpdate(RscOutVO vo);
}
