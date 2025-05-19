package hoangvacban.demo.project_newjeans.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

import java.util.Properties;

@Configuration
public class DependencyConfig {

    private final String email;
    private final String password;
    private final boolean mailDebugEnabled;

    public DependencyConfig(@Value("${mail.username}") String email,
                            @Value("${mail.password}") String password,
                            @Value("${mail.debug.enabled:false}") boolean mailDebugEnabled
    ) {
        this.email = email;
        this.password = password;
        this.mailDebugEnabled = mailDebugEnabled;
    }

    @Bean
    public MultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername(email);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");
        props.put("mail.debug", String.valueOf(this.mailDebugEnabled));

        return mailSender;
    }

}
