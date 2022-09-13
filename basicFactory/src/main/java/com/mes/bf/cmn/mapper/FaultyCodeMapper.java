package com.mes.bf.cmn.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.FaultyCodeVO;

@Mapper
public interface FaultyCodeMapper {
	
	List<FaultyCodeVO> listFltyCode(String faultyName);
	int faultyDelete(List<String> delList);
	int faultyUpdate(String priKey, String updCol, String updCont);
	int faultyInsert(FaultyCodeVO vo);

}
