package com.mes.bf.cmn.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.BomVO;


public interface BomService {
	List<BomVO> listBom();
}
