package com.mes.bf.eqp.service;

import java.util.List;

import com.mes.bf.common.Criteria;
import com.mes.bf.eqp.vo.InspcVO;
import com.mes.bf.eqp.vo.MchnVO;

public interface InspcService {
	
	//설비점검등록
	int inspcInsert(InspcVO vo);
	//설비점검수정
	int inspcUpdate(String prikey, String updCol, String updCont);
	
	//설비점검내역(모달창)
	List<InspcVO> findInspcList(String inspcSdate, String inspcEdate);
	//설비점검대상조회(모달창)
	List<MchnVO> findNxtDate();
	MchnVO findNxtDate(String mchnCode);
	
	//설비점검조회
	List<InspcVO> listInspc();
	//설비점검상세조회
	List<InspcVO> findListInspc(Criteria cri);
	Integer findListInspcCount(Criteria cri);
}
