package com.mes.bf.eqp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.NonOpVO;
import com.mes.bf.eqp.vo.VfindMchnVO;

@Mapper
public interface NonOperationMapper {

	// 공정구분검색
	List<VfindMchnVO> findMchn(String procCdName);

	// 비가동코드전체 조회
	List<NonOpVO> findAllNonOp();

	// 비가동코드, 비가동명 검색
	NonOpVO findNonOp(String nonOpCode, String NonOpName);
}
