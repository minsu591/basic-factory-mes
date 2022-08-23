package com.mes.bf.sales.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.sales.vo.SlsOrdHdDtlVO;
import com.mes.bf.sales.vo.SlsOrdPlanVO;

@Mapper
public interface SlsOrdMapper {
	List<SlsOrdHdDtlVO> findAllOrder();
	List<SlsOrdHdDtlVO> findOrder(String ordSdate, String ordEdate, String vendorName);
	List<SlsOrdPlanVO> findOrderForPlan(String ordSdate, String ordEdate);
}
