package hoangvacban.demo.project_newjeans.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import static hoangvacban.demo.project_newjeans.util.Constants.IS_FINISH_SET_UP_PROFILE_ATTRIBUTE;
import static hoangvacban.demo.project_newjeans.util.Constants.SET_UP_PROFILE_ENDPOINT;

@Component
public class AuthenticationInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            return false;
        }

        HttpSession session = request.getSession(false);
        if (session == null) {
            return false;
        }

        Boolean isFinishProfile = (Boolean) session.getAttribute(IS_FINISH_SET_UP_PROFILE_ATTRIBUTE);
        if (!Boolean.TRUE.equals(isFinishProfile)) {
            response.sendRedirect(SET_UP_PROFILE_ENDPOINT);
        }

        return true;
    }
}
