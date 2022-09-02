package com.mes.bf.cmn.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.VendorCodeVO;

@Mapper
public interface VendorMapper {
	List<VendorCodeVO> listVendor(String vendorName);
	int vendorCodeInsert(VendorCodeVO vendor);
	int vendorCodeDelete(List<String> delList);
	int vendorCodeUpdate(String priKey,String updCol, String updCont);
}
