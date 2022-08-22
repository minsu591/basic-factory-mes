package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.eqp.vo.VfindMchnVO;
import com.mes.bf.prod.vo.VFindProcPerformVO;

@Mapper
public interface ProcMapper {

	// 설비 조회
	List<VfindMchnVO> findMchn(String mchnCode, String mchnName);

	// 공정명 조회
	List<ProcCodeVO> findProcCode(String procCdCode, String procCdName);

	// 공정실적 조회
	List<VFindProcPerformVO> findProcPerform(String workSdate,String workEdate,String procCdName,String mchnName,String empId);

}
