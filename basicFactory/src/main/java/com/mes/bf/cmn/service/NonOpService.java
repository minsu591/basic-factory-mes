package com.mes.bf.cmn.service;

import java.util.List;

import com.mes.bf.cmn.vo.NonOpVO;

public interface NonOpService {
	
	List<NonOpVO> listNonOp(String nonOpName);
	int nonOpDelete(List<String> delList);
	int nonOpUpdate(String priKey, String updCol, String updCont);
	int nonOpInsert(NonOpVO vo);

}
