package com.mes.bf.rsc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.rsc.mapper.RscOrderMapper;
import com.mes.bf.rsc.service.RscOrderService;
import com.mes.bf.rsc.vo.RscOrderVO;

@Service
public class RscOrderServiceImpl implements RscOrderService {

	@Autowired RscOrderMapper rscOrderMapper;

	@Override
	public List<RscOrderVO> orderDetailList(String rscOrderCode) {
		return rscOrderMapper.orderDetailList(rscOrderCode);
	}

	@Override
	public Integer orderInsert(RscOrderVO vo) {
		return rscOrderMapper.orderInsert(vo);
	}

	@Override
	public Integer orderDtInsert(RscOrderVO vo) {
		return rscOrderMapper.orderDtInsert(vo);
	}

	@Override
	public Integer orderHdUpdate(RscOrderVO vo) {
		return rscOrderMapper.orderHdUpdate(vo);
	}

	@Override
	public Integer orderDtDelete(String RscOrderCode) {
		return rscOrderMapper.orderDtDelete(RscOrderCode);
	}

	@Override
	public Integer orderDtReInsert(RscOrderVO vo) {
		return rscOrderMapper.orderDtInsert(vo);
	}

	@Override
	public List<RscOrderVO> orderList(String rscOrderCode, String rscCdCode,String vendCdCode, String rscOrderSDate, String rscOrderEDate) {
		return rscOrderMapper.orderList(rscOrderCode, rscCdCode, vendCdCode, rscOrderSDate, rscOrderEDate);
	}

}
