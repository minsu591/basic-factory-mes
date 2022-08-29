package com.mes.bf.cmn.service;

import java.util.List;

import com.mes.bf.cmn.vo.VendorCodeVO;

public interface VendorService {

	List<VendorCodeVO> listVendor(String vendorName);
	int vendorCodeInsert(VendorCodeVO vendor);
	int vendorCodeDelete(String priKey);
	int vendorCodeUpdate(String priKey,String updCol, String updCont);
}
