package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.domain.OtpCode;
import hoangvacban.demo.project_newjeans.exception.EmailException;
import hoangvacban.demo.project_newjeans.repository.OtpCodeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;
    private final OtpCodeRepository otpCodeRepository;
    private final PasswordEncoder passwordEncoder;
    private final String mailFrom;
    private static final String OTP_CHARS = "0123456789";
    private static final int OTP_LENGTH = 6;
    private static final SecureRandom secureRandom = new SecureRandom();
    private static final int OTP_EXPIRY_MINUTES = 5;

    public EmailService(
            JavaMailSender mailSender,
            OtpCodeRepository otpCodeRepository,
            PasswordEncoder passwordEncoder,
            @Value("${mail}") String mailFrom) {
        this.mailSender = mailSender;
        this.otpCodeRepository = otpCodeRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailFrom = mailFrom;
    }

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
            Optional<OtpCode> existedOtpCode = otpCodeRepository.findByEmail(to);
            if (existedOtpCode.isPresent()) {
                if (getEpochTime(LocalDateTime.now()) < existedOtpCode.get().getExpiryTime()) {
                    // now < expiry time : can't send
                    throw new BadCredentialsException("Please try again");
                } else {
                    updateAndResendOtpCode(existedOtpCode.get(), to, subject);
                }
            } else {
                createOtpCode(to, subject);
            }
        } catch (MailException e) {
            throw new EmailException("Failed to send OTP email, please try again later", e);
        }
    }

    private void updateAndResendOtpCode(OtpCode code, String to, String subject) {
        String otpCode = generateOtpCode();

        sendMail(to, subject, otpCode);

        code.setOtpPassword(passwordEncoder.encode(otpCode));
        code.setExpiryTime(getExpireEpochTime(LocalDateTime.now()));

        saveOtpCode(code);
    }

    private void createOtpCode(String to, String subject) {
        String otpCode = generateOtpCode();

        sendMail(to, subject, otpCode);

        OtpCode otpCodeSave = new OtpCode();
        otpCodeSave.setOtpPassword(passwordEncoder.encode(otpCode));
        otpCodeSave.setEmail(to);
        otpCodeSave.setExpiryTime(getExpireEpochTime(LocalDateTime.now()));

        saveOtpCode(otpCodeSave);
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
        Optional<OtpCode> existedOtpCode = otpCodeRepository.findByEmail(email);
        if (
                existedOtpCode.isEmpty() ||
                        getEpochTime(LocalDateTime.now()) > existedOtpCode.get().getExpiryTime() ||
                        !passwordEncoder.matches(otpCode, existedOtpCode.get().getOtpPassword())
        ) {
            throw new BadCredentialsException("Invalid or expired OTP code");
        }
        return true;
    }

    private long getExpireEpochTime(LocalDateTime time) {
        return time.plusMinutes(OTP_EXPIRY_MINUTES)
                .toEpochSecond(ZoneOffset.UTC);
    }

    private long getEpochTime(LocalDateTime time) {
        return time.toEpochSecond(ZoneOffset.UTC);
    }

    public void saveOtpCode(OtpCode otpCode) {
        otpCodeRepository.save(otpCode);
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
