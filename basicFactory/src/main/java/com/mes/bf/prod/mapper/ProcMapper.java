package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.eqp.vo.VfindMchnVO;

@Mapper
public interface ProcMapper {

	// 설비전체조회
	List<VfindMchnVO> findAllMchn();
	//공정코드전체조회
	List<ProcCodeVO> findAllProcCode();
}
