package com.mes.bf.cmn.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.ProcCodeVO;

@Mapper
public interface ProcCodeMapper {
	List<ProcCodeVO> listProcCode(String procName);
	int procCodeUpdate(String priKey, String updCol, String updCont);
	int procCodeInsert(String procName, String procRemk);
	int procCodeDelete(String priKey);
}
