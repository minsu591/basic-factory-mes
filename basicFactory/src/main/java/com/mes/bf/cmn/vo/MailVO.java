package com.mes.bf.cmn.vo;

import lombok.Data;

@Data
public class MailVO {
	private String fromAddress;
    private String toAddress; //받는 사람
    private String subject; // 제목
    private String content; // 메일 내용
    private boolean isUseHtmlYn; // 메일 형식이 HTML인지 여부(true, false)
}
