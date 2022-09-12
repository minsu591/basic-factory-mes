package com.mes.bf.cmn.service;

import java.util.List;

import com.mes.bf.cmn.vo.LineCodeHdVO;
import com.mes.bf.cmn.vo.LineCodeVO;
import com.mes.bf.cmn.vo.LineInsertVO;
import com.mes.bf.eqp.vo.MchnVO;

public interface LineService {
	List<LineCodeHdVO> listLineCodeHd(String lineName);
	List<LineCodeVO> listLineCode(String lineCode);
	//lineHd insert, update, delete
	int lineCodeHdInsert(String lineName);
	int lineCodeHdUpdate(String priKey,String updCol, String updCont);
	int lineCodeHdDelete(List<String> delList);
	
	int lineCodeInsert(LineCodeVO line);
	int lineCodeAllInsert(LineInsertVO lineInfo);
	int lineCodeUpdate(String priKey,String updCol, String updCont);
	int lineCodeDelete(List<String> delList);
	
	List<MchnVO> listMchn(MchnVO mchn);
}
