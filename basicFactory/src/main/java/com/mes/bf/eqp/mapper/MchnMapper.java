package com.mes.bf.eqp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.eqp.vo.MchnVO;

@Mapper
public interface MchnMapper {
	
	//설비등록
	int mchnInsert(MchnVO vo);
	//설비 수정
	int mchnUpdate(String prikey, String updCol, String updCont);
	
	
	//설비조회
	List<MchnVO> listMchn(String mchnCode);

}
