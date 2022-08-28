package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.prod.vo.MonitoringVO;

@Mapper
public interface MonitoringMapper {

	//공정 진행상황 조회
	List<MonitoringVO> findMonitoring(String toDay);
}
