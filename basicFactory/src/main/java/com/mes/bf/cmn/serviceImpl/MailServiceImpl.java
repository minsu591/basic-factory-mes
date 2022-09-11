package com.mes.bf.cmn.serviceImpl;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.service.MailService;
import com.mes.bf.cmn.vo.MailVO;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSenderImpl javaMailSender;
    
	@Override
	public void sendMail(MailVO mail) {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8"); // use multipart (true)

            mimeMessageHelper.setSubject(mail.getSubject()); // Base64 encoding
            mimeMessageHelper.setText(mail.getContent(), true); //mail 형식이 html인지 여부
            mimeMessageHelper.setTo(mail.getToAddress());

            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
	}
}
