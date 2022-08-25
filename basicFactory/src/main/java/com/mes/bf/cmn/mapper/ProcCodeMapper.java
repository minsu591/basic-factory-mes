package com.mes.bf.cmn.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.ProcCodeVO;

@Mapper
public interface ProcCodeMapper {
	List<ProcCodeVO> listProcCode(String procName);
}
