package com.mes.bf.sales.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.sales.vo.SlsOrdDtlVO;
import com.mes.bf.sales.vo.SlsOrdHdDtlVO;
import com.mes.bf.sales.vo.SlsOrdHdVO;
import com.mes.bf.sales.vo.SlsOrdPlanVO;

@Mapper
public interface SlsOrdMapper {
	List<SlsOrdHdDtlVO> findAllOrder();
	List<SlsOrdHdDtlVO> findOrder(String ordSdate, String ordEdate, String vendorName);
	List<SlsOrdHdVO> findOrderModal(String ordSdate, String ordEdate);
	List<SlsOrdHdDtlVO> findDtlOrder (String slsOrdHdNo);
	List<SlsOrdHdVO> findOrderForPlan(String ordSdate, String ordEdate);
	List<SlsOrdDtlVO> findOrderForPlanDtl(String slsOrdHdNo);
	void insertOrder(SlsOrdHdVO vo);
}
