package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.eqp.vo.VfindMchnVO;
import com.mes.bf.prod.vo.VFindProcPerformVO;

@Mapper
public interface ProcMapper {

	// 설비전체조회
	List<VfindMchnVO> findAllMchn();
	//공정코드전체조회
	List<ProcCodeVO> findAllProcCode();

	// 공정실적 전체조회
	List<VFindProcPerformVO> findAllProcPerform();
}
