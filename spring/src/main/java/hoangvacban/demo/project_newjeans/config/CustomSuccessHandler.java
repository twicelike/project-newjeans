package hoangvacban.demo.project_newjeans.config;

import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.service.DeviceMetadataService;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static hoangvacban.demo.project_newjeans.util.Constants.*;

public class CustomSuccessHandler implements AuthenticationSuccessHandler {

    private static final Logger log = LoggerFactory.getLogger(CustomSuccessHandler.class);
    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
    private final UserService userService;
    private final DeviceMetadataService deviceMetadataService;

    public CustomSuccessHandler(UserService userService, DeviceMetadataService deviceMetadataService) {
        this.userService = userService;
        this.deviceMetadataService = deviceMetadataService;
    }

    protected String determineTargetUrl(final Authentication authentication) {
        Map<String, String> roleTargetUrl = new HashMap<>();
        roleTargetUrl.put(ROLE_USER, "/home");
        roleTargetUrl.put(ROLE_ADMIN, "/admin");

        final Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        for (final GrantedAuthority grantedAuthority : authorities) {
            String authorityName = grantedAuthority.getAuthority();
            if (roleTargetUrl.containsKey(authorityName)) {
                return roleTargetUrl.get(authorityName);
            }
        }
        throw new IllegalStateException();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, Authentication authentication) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return;
        }
        session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
        String email = authentication.getName();
        Optional<User> user = userService.getUserByEmail(email);
        user.ifPresent(value -> session.setAttribute(IS_FINISH_SET_UP_PROFILE_ATTRIBUTE, value.isFinishSetUpProfile()));
    }

    public void loginNotification(Authentication authentication, HttpServletRequest request) {
        try {
            if (authentication.getPrincipal() instanceof org.springframework.security.core.userdetails.User) {
                deviceMetadataService.verify(request, authentication.getName());
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(authentication);
        if (response.isCommitted()) {
            return;
        }
        loginNotification(authentication, request);
        redirectStrategy.sendRedirect(request, response, targetUrl);
        clearAuthenticationAttributes(request, authentication);
    }
}
