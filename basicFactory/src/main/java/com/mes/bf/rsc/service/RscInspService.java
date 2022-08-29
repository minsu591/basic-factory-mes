package com.mes.bf.rsc.service;

import java.util.List;

import com.mes.bf.rsc.vo.RscInspVO;

public interface RscInspService {
	List<RscInspVO> inspList(String rscInspCode, String rscCdCode, String rscInspSDate, String rscInspEDate);
	
}
