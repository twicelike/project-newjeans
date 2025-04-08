package hoangvacban.demo.project_newjeans.config;

import nl.basjes.parse.useragent.UserAgentAnalyzer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

import java.util.Properties;

import static nl.basjes.parse.useragent.UserAgent.AGENT_NAME;
import static nl.basjes.parse.useragent.UserAgent.OPERATING_SYSTEM_NAME;

@Configuration
public class DependencyConfig {

    private final String email;
    private final String password;

    public DependencyConfig(@Value("${mail.username}") String email,
                            @Value("${mail.password}") String password
    ) {
        this.email = email;
        this.password = password;
    }

    @Bean
    public MultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }

    @Bean
    public UserAgentAnalyzer userAgentAnalyzer() {
        return UserAgentAnalyzer
                .newBuilder()
                .withoutCache()
                .withField(OPERATING_SYSTEM_NAME)
                .withField(AGENT_NAME)
                .build();
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

        return mailSender;
    }

}
