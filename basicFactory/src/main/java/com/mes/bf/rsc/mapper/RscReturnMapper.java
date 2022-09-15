package com.mes.bf.rsc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.common.Criteria;
import com.mes.bf.rsc.vo.RscReturnVO;

@Mapper
public interface RscReturnMapper {
	List<RscReturnVO> returnList(Criteria cri);
	Integer returnListCount(Criteria cri);
	//수정할 항목 불러오기
	RscReturnVO loadReturn (String rscReturnCode);
	
	//등록&수정
	int returnInsert(RscReturnVO vo);
	int returnUpdate(RscReturnVO vo);
}
