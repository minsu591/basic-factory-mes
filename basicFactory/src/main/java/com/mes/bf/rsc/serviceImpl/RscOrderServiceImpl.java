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

}
