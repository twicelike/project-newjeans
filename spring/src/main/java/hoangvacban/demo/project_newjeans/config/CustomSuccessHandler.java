package hoangvacban.demo.project_newjeans.config;

import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
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

    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
    private final UserService userService;

    public CustomSuccessHandler(UserService userService) {
        this.userService = userService;
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

    protected void clearAuthenticationAttributes(
            HttpServletRequest request,
            Authentication authentication,
            HttpServletResponse response,
            String targetUrl
    ) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return;
        }
        session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
        String email = authentication.getName();
        Optional<User> user = userService.getUserByEmail(email);
        boolean isFinishedProfile = false;
        if (user.isPresent()) {
            isFinishedProfile = user.get().isFinishSetUpProfile();
            session.setAttribute(IS_FINISH_SET_UP_PROFILE_ATTRIBUTE, isFinishedProfile);
            session.setAttribute(USER_ID, user.get().getId());
            session.setAttribute("username", user.get().getUsername());
            session.setAttribute("avatar", user.get().getAvatar());
        }

        try {
            if (targetUrl.equals("/home")) {
                if (isFinishedProfile) {
                    redirectStrategy.sendRedirect(request, response, "/main");
                } else {
                    redirectStrategy.sendRedirect(request, response, SET_UP_PROFILE_ENDPOINT);
                }
            } else {
                redirectStrategy.sendRedirect(request, response, targetUrl);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        String targetUrl = determineTargetUrl(authentication);
        if (response.isCommitted()) {
            return;
        }
        clearAuthenticationAttributes(request, authentication, response, targetUrl);
//        redirectStrategy.sendRedirect(request, response, targetUrl);
    }
}
