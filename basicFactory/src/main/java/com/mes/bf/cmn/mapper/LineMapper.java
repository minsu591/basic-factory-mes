package com.mes.bf.cmn.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.LineCodeHdVO;

@Mapper
public interface LineMapper {
	List<LineCodeHdVO> listLineCodeHd();
}
