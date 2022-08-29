package com.mes.bf.rsc.mapper;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.rsc.vo.RscInVO;
import com.mes.bf.rsc.vo.RscInspVO;

@Mapper
public interface RscInMapper {
	List<RscInVO> inList(String rscInCode, String rscCdCode, String rscInSDate, String rscInEDate);
	List<RscInspVO> inspCompList(String rscCdCode, String inspDate);
	
	int inInsert(RscInspVO vo);
}
