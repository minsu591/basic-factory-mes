package com.mes.bf.cmn.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.mapper.VendorMapper;
import com.mes.bf.cmn.service.VendorService;
import com.mes.bf.cmn.vo.VendorCodeVO;

@Service
public class VendorServiceImpl implements VendorService {
	
	@Autowired VendorMapper mapper;
	@Override
	public List<VendorCodeVO> listVendor(String vendorName) {
		return mapper.listVendor(vendorName);
	}

}
