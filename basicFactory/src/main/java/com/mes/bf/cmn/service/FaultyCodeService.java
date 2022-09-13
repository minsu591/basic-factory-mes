package com.mes.bf.cmn.service;

import java.util.List;

import com.mes.bf.cmn.vo.FaultyCodeVO;

public interface FaultyCodeService {
	
	List<FaultyCodeVO> listFltyCode(String faultyName);
	int faultyDelete(List<String> delList);
	int faultyUpdate(String priKey, String updCol, String updCont);
	int faultyInsert(FaultyCodeVO vo);
	
}
