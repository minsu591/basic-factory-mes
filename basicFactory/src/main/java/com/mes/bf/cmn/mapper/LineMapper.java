package com.mes.bf.cmn.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.LineCodeHdVO;
import com.mes.bf.cmn.vo.LineCodeVO;

@Mapper
public interface LineMapper {
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
