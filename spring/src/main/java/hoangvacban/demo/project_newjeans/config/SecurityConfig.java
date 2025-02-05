package hoangvacban.demo.project_newjeans.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(request -> request
                        .requestMatchers("/", "/css/**", "/js/**", "/login", "/register").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> {
                    oauth2.successHandler((request, response, authentication) -> {
                        redirectStrategy.sendRedirect(request, response, "/set-up-profile");
                    });
                })
                .logout(LogoutConfigurer::permitAll);

        return http.build();
    }

}
