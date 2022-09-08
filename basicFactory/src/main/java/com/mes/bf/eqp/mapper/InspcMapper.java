package com.mes.bf.eqp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.eqp.vo.InspcVO;

@Mapper
public interface InspcMapper {
	
	//설비점검
	void insertInspc(InspcVO vo);
	
	//설비점검내역(모달창)
	List<InspcVO> findInspcList(String inspcSdate, String inspcEdate);
	//설비점검대상조회(모달창)
	List<InspcVO> findNxtDate();
	
	//설비점검조회
	List<InspcVO> listInspc();
	//설비점검상세조회
	List<InspcVO> findListInspc(String inspcSdate, String inspcEdate, String mchnCode);

}
