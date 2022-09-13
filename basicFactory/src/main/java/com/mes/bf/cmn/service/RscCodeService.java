package com.mes.bf.cmn.service;

import java.util.List;

import com.mes.bf.cmn.vo.RscCodeVO;

public interface RscCodeService {
	
	List<RscCodeVO> listRsc(String rscCdName);
	int rscDelete(List<String> delList);
	int rscUpdate(String priKey, String updCol, String updCont);
	int rscInsert(RscCodeVO vo);

}
