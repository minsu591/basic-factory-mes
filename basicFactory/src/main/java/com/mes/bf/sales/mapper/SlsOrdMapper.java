package com.mes.bf.sales.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.common.Criteria;
import com.mes.bf.sales.vo.SlsOrdDtlVO;
import com.mes.bf.sales.vo.SlsOrdHdDtlVO;
import com.mes.bf.sales.vo.SlsOrdHdVO;

@Mapper
public interface SlsOrdMapper {
	List<SlsOrdHdDtlVO> findAllOrder();
	List<SlsOrdHdDtlVO> findOrder(Criteria cri);
	Integer findOrderCount(Criteria cri);
	
	List<SlsOrdHdVO> findOrderModal(String ordSdate, String ordEdate);
	List<SlsOrdHdDtlVO> findDtlOrder (String slsOrdHdNo);
	List<SlsOrdHdVO> findOrderForPlan(String ordSdate, String ordEdate);
	List<SlsOrdDtlVO> findOrderForPlanDtl(String slsOrdHdNo);
	void orderHdUpdate(String priKey, String updCol, String updCont);
	void orderUpdate(String priKey, String updCol, String updCont);
	void orderHdDelete(String slsOrdHdNo);
	void orderDelete(List<String> delList);
	void orderInsertHd(SlsOrdHdVO vo);
	void orderInsertDtl(SlsOrdDtlVO ordDtlVO);
	void orderDtlAddInsert(SlsOrdDtlVO vo);
}
