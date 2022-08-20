package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.prod.vo.FindEmpVO;

@Mapper
public interface EmpTestMapper {

	List<FindEmpVO> findAll();
}
