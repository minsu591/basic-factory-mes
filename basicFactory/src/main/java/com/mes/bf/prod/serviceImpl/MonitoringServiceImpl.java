package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.prod.mapper.MonitoringMapper;
import com.mes.bf.prod.service.MonitoringService;
import com.mes.bf.prod.vo.MonitoringVO;

@Service
public class MonitoringServiceImpl implements MonitoringService{

	@Autowired MonitoringMapper mapper;

	@Override
	public List<MonitoringVO> findMonitoring(String toDay) {
	
		return mapper.findMonitoring(toDay);
	}

}
