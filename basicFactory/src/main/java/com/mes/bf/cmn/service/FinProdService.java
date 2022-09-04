package com.mes.bf.cmn.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.FinProdCodeVO;

public interface FinProdService {
	List<FinProdCodeVO> listFinProd(String finName);
	int finProdDelete(List<String> delList);
	int finProdUpdate(String priKey, String updCol, String updCont);
	int finProdInsert(FinProdCodeVO finProd);
}
