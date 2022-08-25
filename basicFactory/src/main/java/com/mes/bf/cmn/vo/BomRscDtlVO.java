package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("bomRscDtl")
public class BomRscDtlVO {
	private BomRscVO bomRscVO;
	private LineCodeVO lineCodeVO;
}
