package com.mes.bf.cmn.service;

import java.util.List;

import com.mes.bf.cmn.vo.LineCodeHdVO;
import com.mes.bf.cmn.vo.LineCodeVO;

public interface LineService {
	List<LineCodeHdVO> listLineCodeHd(String lineName);
	List<LineCodeVO> listLineCode(String lineCode);
	//lineHd insert, update, delete
	int lineCodeHdInsert(String lineName);
	int lineCodeHdUpdate(String priKey,String updCol, String updCont);
	int lineCodeHdDelete(String priKey);
	
	int lineCodeInsert(LineCodeVO line);
	int lineCodeUpdate(String priKey,String updCol, String updCont);
	int lineCodeDelete(String priKey);
}
