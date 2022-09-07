package com.mes.bf.rsc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.rsc.vo.RscOrderVO;

@Mapper
public interface RscOrderMapper {
	
	//발주 리스트 조회
	List<RscOrderVO> orderDetailList(String rscOrderCode);
	
	//헤더, 디테일 insert
	Integer orderInsert(RscOrderVO vo);
	Integer orderDtInsert(RscOrderVO vo);
	
	//수정
	Integer orderHdUpdate(RscOrderVO vo); //헤더 업데이트
	Integer orderDtDelete(String RscOrderCode); //디테일 내용 삭제
	Integer orderDtReInsert(RscOrderVO vo); //디테일 내용 재insert
	
	//조회페이지 출력
	List<RscOrderVO> orderList(String rscOrderCode, String rscCdCode, String vendCdCode, String rscOrderSDate, String rscOrderEDate);
}
