package hoangvacban.demo.project_newjeans.service;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import hoangvacban.demo.project_newjeans.dto.OtpCodeDTO;
import hoangvacban.demo.project_newjeans.exception.EmailException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.concurrent.TimeUnit;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;
    private final String mailFrom;
    private static final String OTP_CHARS = "0123456789";
    private static final int OTP_LENGTH = 6;
    private static final SecureRandom secureRandom = new SecureRandom();
    private static final long OTP_EXPIRY_MINUTES = 3 * 60 * 1000; // 3 minutes

    private final Cache<String, OtpCodeDTO> otpCache = Caffeine.newBuilder()
            .expireAfterWrite(3, TimeUnit.MINUTES)
            .build();

    public EmailService(
            JavaMailSender mailSender,
            PasswordEncoder passwordEncoder,
            @Value("${mail}") String mailFrom) {
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
        this.mailFrom = mailFrom;
    }


    // TODO: add logic if new device log in, and create new template
    @Async
    @Transactional
    public void sendNotifyNewDeviceLogIn(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailFrom);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }


    // send otp code to new email to create account
    @Async
    @Transactional
    public void sendOtpToVerifyEmail(String to, String subject) {
        try {
            OtpCodeDTO otp = otpCache.getIfPresent(to);
            if (otp != null) {
                if (getEpochTime() - otp.getTimeStamp() <= OTP_EXPIRY_MINUTES) {
                    // now < expiry time : can't send
                    throw new BadCredentialsException("Otp code is still available");
                } else {
                    // update / recreate a new otp code
                    updateAndResendOtpCode(otp, to, subject);
                }
            } else {
                createOtpCodeAndSendOtpCode(to, subject);
            }
        } catch (MailException e) {
            throw new EmailException("Failed to send OTP email, please try again later", e);
        }
    }

    private void updateAndResendOtpCode(OtpCodeDTO code, String to, String subject) {
        String otpCode = generateOtpCode();

        sendMail(to, subject, otpCode);

        code.setOtpCode(passwordEncoder.encode(otpCode));
        code.setTimeStamp(getEpochTime());

        saveOtpCode(otpCode, code);
    }

    private void createOtpCodeAndSendOtpCode(String to, String subject) {
        String otpCode = generateOtpCode();

        sendMail(to, subject, otpCode);

        OtpCodeDTO otpCodeSave = new OtpCodeDTO(
                passwordEncoder.encode(otpCode),
                getEpochTime()
        );

        saveOtpCode(to, otpCodeSave);
    }

    private void sendMail(String mailTo, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailFrom);
        message.setTo(mailTo);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public boolean verifyEmail(String email, String otpCode) {
        OtpCodeDTO otp = otpCache.getIfPresent(otpCode);
        if (otp != null) {
            if (getEpochTime() - otp.getTimeStamp() <= OTP_EXPIRY_MINUTES) {
                if (passwordEncoder.matches(otpCode, otp.getOtpCode())) {
                    // ok
                    return true;
                } else {
                    throw new BadCredentialsException("Otp code is not match");
                }
            } else {
                // expire
                throw new BadCredentialsException("Otp code expired");
            }
        } else {
            throw new BadCredentialsException("Send OTP code before verify email");
        }
    }

    private long getEpochTime() {
        return Instant.now().getEpochSecond();
    }

    public void saveOtpCode(String to, OtpCodeDTO otpCode) {
        otpCache.put(to, otpCode);
    }

    private String generateOtpCode() {
        StringBuilder otp = new StringBuilder(OTP_LENGTH);
        for (int i = 0; i < OTP_LENGTH; i++) {
            int index = secureRandom.nextInt(OTP_CHARS.length());
            otp.append(OTP_CHARS.charAt(index));
        }
        return otp.toString();
    }
}
