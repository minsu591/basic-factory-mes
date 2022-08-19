package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("vendorCode")
public class VendorCodeVO {
	private String vendCdCode;
	private String empId;
	private String vendCdClfy;
	private String vendCdNm;
	private String vendCdRegNo;
	private String vendCdPhone;
	private String vendCdAdr;
	private String vendCdRemk;
}
