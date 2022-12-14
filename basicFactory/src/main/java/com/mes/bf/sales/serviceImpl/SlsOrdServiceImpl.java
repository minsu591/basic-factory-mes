package com.mes.bf.sales.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.common.Criteria;
import com.mes.bf.sales.mapper.SlsOrdMapper;
import com.mes.bf.sales.service.SlsOrdService;
import com.mes.bf.sales.vo.SlsOrdDtlVO;
import com.mes.bf.sales.vo.SlsOrdHdDtlVO;
import com.mes.bf.sales.vo.SlsOrdHdVO;

@Service
public class SlsOrdServiceImpl implements SlsOrdService{

	@Autowired SlsOrdMapper mapper;
	
	@Override
	public List<SlsOrdHdDtlVO> findAllOrder() {
		return mapper.findAllOrder();
	}
	

	@Override
	public List<SlsOrdHdVO> findOrderModal(String ordSdate, String ordEdate) {
		return mapper.findOrderModal(ordSdate, ordEdate);
	}
	
	@Override
	public List<SlsOrdHdDtlVO> findDtlOrder(String slsOrdHdNo) {
		return mapper.findDtlOrder(slsOrdHdNo);
	}
	
	@Override
	public List<SlsOrdHdVO> findOrderForPlan(String ordSdate, String ordEdate) {
		return mapper.findOrderForPlan(ordSdate, ordEdate);
	}

	@Override
	public void orderHdUpdate(String priKey, String updCol, String updCont) {
		mapper.orderHdUpdate(priKey, updCol, updCont);
	}
	
	@Override
	public void orderUpdate(String priKey, String updCol, String updCont) {
		mapper.orderUpdate(priKey, updCol, updCont);
		
	}

	@Override
	public void orderDelete(List<String> delList) {
		mapper.orderDelete(delList);
	}

	@Override
	public void orderInsertHd(SlsOrdHdVO vo) {
		mapper.orderInsertHd(vo);
	}

	@Override
	public void orderInsertDtl(SlsOrdDtlVO ordDtlVO) {
		mapper.orderInsertDtl(ordDtlVO);
		
	}

	@Override
	public void orderDtlAddInsert(SlsOrdDtlVO vo) {
		mapper.orderDtlAddInsert(vo);
	}

	@Override
	public List<SlsOrdDtlVO> findOrderForPlanDtl(String slsOrdHdNo) {
		return mapper.findOrderForPlanDtl(slsOrdHdNo);
	}

	@Override
	public void orderHdDelete(String slsOrdHdNo) {
		mapper.orderHdDelete(slsOrdHdNo);
	}

	@Override
	public List<SlsOrdHdDtlVO> findOrder(Criteria cri) {
		return mapper.findOrder(cri);
	}

	@Override
	public Integer findOrderCount(Criteria cri) {
		return mapper.findOrderCount(cri);
	}

}
