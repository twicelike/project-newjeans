package hoangvacban.demo.project_newjeans.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(request -> request
                        .requestMatchers("/", "/css/**", "/js/**", "/login", "/register").permitAll()
                        .anyRequest().authenticated()
                ).formLogin(form -> {
                    form
                            .defaultSuccessUrl("/home", true)
                            .permitAll();
                })
                .logout(LogoutConfigurer::permitAll);

        return http.build();
    }


}
