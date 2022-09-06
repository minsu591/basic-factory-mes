package com.mes.bf.cmn.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.LineCodeHdVO;
import com.mes.bf.cmn.vo.LineCodeVO;
import com.mes.bf.cmn.vo.LineInsertVO;

@Mapper
public interface LineMapper {
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
}
