package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.prod.vo.PackingVO;

@Mapper
public interface PackingMapper {

	
	//포장 공정 조회
	List<PackingVO> findPackingProc();
	//제품코드로 설비명,상태 조회
	MchnVO findMchn(String finPrdCdCode);
	
}
