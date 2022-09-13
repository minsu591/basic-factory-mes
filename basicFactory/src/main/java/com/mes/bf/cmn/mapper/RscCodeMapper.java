package com.mes.bf.cmn.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.RscCodeVO;

@Mapper
public interface RscCodeMapper {
	
	List<RscCodeVO> listRsc(String rscCdName);
	int rscDelete(List<String> delList);
	int rscUpdate(String priKey, String updCol, String updCont);
	int rscInsert(RscCodeVO vo);
}
