package com.mes.bf.cmn.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.NonOpVO;

@Mapper
public interface NonOpMapper {
	
	List<NonOpVO> listNonOp(String nonOpName);
	int nonOpDelete(List<String> delList);
	int nonOpUpdate(String priKey, String updCol, String updCont);
	int nonOpInsert(NonOpVO vo);

}
