package com.mes.bf.eqp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.eqp.vo.MchnVO;

@Mapper
public interface MchnMapper {
	
	List<MchnVO> findMchnName(String mchnName);
	int mchnInsert(MchnVO vo);
	int mchnUpdate(String prikey, String updCol, String updCont);
	int mchnDelete(List<String> delList);
	
	//설비조회
	List<MchnVO> listMchn(String mchnName);

}
