package com.mes.bf.rsc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.rsc.mapper.RscOutMapper;
import com.mes.bf.rsc.service.RscOutService;
import com.mes.bf.rsc.vo.RscOutVO;

@Service
public class RscOutServiceImpl implements RscOutService {

	@Autowired RscOutMapper rscOutMapper;

	@Override
	public List<RscOutVO> normalOutList() {
		return rscOutMapper.normalOutList();
	}

	@Override
	public List<RscOutVO> exceptOutList() {
		return rscOutMapper.exceptOutList();
	}

}
