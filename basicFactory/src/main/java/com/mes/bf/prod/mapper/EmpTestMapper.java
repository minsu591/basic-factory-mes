package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.prod.vo.EmpTestVO;

@Mapper
public interface EmpTestMapper {

	List<EmpTestVO> findAll();
}
