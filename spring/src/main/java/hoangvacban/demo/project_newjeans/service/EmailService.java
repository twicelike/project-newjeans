package hoangvacban.demo.project_newjeans.service;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import hoangvacban.demo.project_newjeans.dto.OtpCodeDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
    private static final long OTP_EXPIRY_MINUTES = 1 * 60; // 1 minutes

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

    // send otp code to new email to create account
    public String sendOtpToVerifyEmail(String to, String subject) {
        try {
            OtpCodeDTO otp = otpCache.getIfPresent(to);
            long currentTime = getEpochTime();

            if (otp != null) {
                long timeElapsed = currentTime - otp.getTimeStamp();

                // Nếu OTP còn trong thời hạn
                if (timeElapsed <= OTP_EXPIRY_MINUTES) {
                    return "Otp code is still available!";
                }

                // Nếu OTP đã hết hạn → tạo mới hoàn toàn
                otpCache.invalidate(to);
                createOtpCodeAndSendOtpCode(to, subject);
                return "OTP expired! A new OTP has been sent.";
            }

            // Chưa từng gửi OTP → gửi mới
            createOtpCodeAndSendOtpCode(to, subject);
            return "OTP sent successfully!";
        } catch (MailException e) {
            // Bắt lỗi gửi mail thất bại
            return "Failed to send OTP email, please try again later!";
        } catch (Exception e) {
            // Bắt lỗi bất ngờ khác (để tránh crash server)
            return "Unexpected error occurred while sending OTP.";
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

        sendMail(to, subject, "Your OTP code is: " + otpCode);

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

    public String verifyEmail(String email, String otpCode) {
        OtpCodeDTO otp = otpCache.getIfPresent(email);
        long currentTime = getEpochTime();

        if (otp == null) {
            return "Send OTP code before verify email!";
        }

        long timeElapsed = currentTime - otp.getTimeStamp();
        if (timeElapsed > OTP_EXPIRY_MINUTES) {
            otpCache.invalidate(email); // xoá luôn OTP hết hạn
            return "Otp code expired!";
        }

        if (passwordEncoder.matches(otpCode, otp.getOtpCode())) {
            otpCache.invalidate(email); // xoá sau khi xác minh thành công
            return "Yes sir";
        } else {
            return "Otp code is not match!";
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
