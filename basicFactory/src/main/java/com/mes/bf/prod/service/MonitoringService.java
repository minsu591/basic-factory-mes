package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.prod.vo.MonitoringVO;

public interface MonitoringService {
	// 공정 진행상황 조회
	List<MonitoringVO> findMonitoring(String toDay);
}
