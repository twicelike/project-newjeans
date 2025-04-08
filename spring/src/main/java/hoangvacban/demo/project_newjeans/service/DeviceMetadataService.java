package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.entity.DeviceMetadata;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.dto.response.IpInfo;
import hoangvacban.demo.project_newjeans.repository.DeviceMetadataRepository;
import jakarta.servlet.http.HttpServletRequest;
import nl.basjes.parse.useragent.UserAgent;
import nl.basjes.parse.useragent.UserAgentAnalyzer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

import static hoangvacban.demo.project_newjeans.util.Constants.IP_ADDRESS;
import static hoangvacban.demo.project_newjeans.util.Constants.USER_AGENT;
import static nl.basjes.parse.useragent.UserAgent.AGENT_NAME;
import static nl.basjes.parse.useragent.UserAgent.OPERATING_SYSTEM_NAME;

@Service
public class DeviceMetadataService {

    private static final Logger log = LoggerFactory.getLogger(DeviceMetadataService.class);
    private final UserService userService;
    private final DeviceMetadataRepository metadataRepository;
    private final UserAgentAnalyzer userAgentAnalyzer;
    private final WebClient webClient;

    public DeviceMetadataService(
            UserService userService,
            DeviceMetadataRepository metadataRepository,
            UserAgentAnalyzer userAgentAnalyzer,
            WebClient.Builder builder,
            @Value("${ip.api.url}") String IP_API_URL) {
        this.userService = userService;
        this.metadataRepository = metadataRepository;
        this.userAgentAnalyzer = userAgentAnalyzer;
        this.webClient = builder.baseUrl(IP_API_URL).build();
    }


    @Async
    @Transactional
    public void verify(HttpServletRequest request, String email) {
        Optional<User> user = userService.getUserByEmail(email);

        if (user.isEmpty()) {
            return;
        }

        String userAgentFromRequest = request.getHeader(USER_AGENT);
        String ipAddress = getIpAddress(request);

        processUserLogin(user.get(), userAgentFromRequest, ipAddress);
    }

    private String getIpAddress(HttpServletRequest request) {
        return request.getHeader(IP_ADDRESS) != null
                ? request.getHeader(IP_ADDRESS) : request.getRemoteAddr();
    }

    private void updateExistingMetadata(DeviceMetadata existing, DeviceMetadata current) {
        if (current.equals(existing)) {
            existing.setLastLoggedIn(LocalDateTime.now().toEpochSecond(ZoneOffset.UTC));
            metadataRepository.save(existing);
        } else {
            // send mail
            metadataRepository.save(current);
        }
    }

    private void processUserLogin(User user, String userAgentFromRequest, String ipAddress) {
        getIpInfo(ipAddress).subscribe(res -> {
            UserAgent userAgent = userAgentAnalyzer.parse(userAgentFromRequest);

            DeviceMetadata deviceMetadata = buildDeviceMetadata(user, ipAddress, userAgent, res);

            Optional<DeviceMetadata> existingMetadata = metadataRepository.findTopByUserIdOrderByIdDesc(user.getId());

            if (existingMetadata.isPresent()) {
                updateExistingMetadata(existingMetadata.get(), deviceMetadata);
            } else {
                saveNewMetadata(deviceMetadata);
            }
        }, err -> log.atError().log("Failed to fetch IP info for {}: {}", ipAddress, err.getMessage()));
    }

    private DeviceMetadata buildDeviceMetadata(User user, String ipAddress, UserAgent userAgent, IpInfo ipInfo) {
        DeviceMetadata deviceMetadata = new DeviceMetadata();
        deviceMetadata.setUser(user);
        deviceMetadata.setIpAddress(ipAddress);
        deviceMetadata.setOsName(userAgent.getValue(OPERATING_SYSTEM_NAME));
        deviceMetadata.setAgentName(userAgent.getValue(AGENT_NAME));
        deviceMetadata.setCity(ipInfo.getCity());
        deviceMetadata.setCountry(ipInfo.getCountry());
        deviceMetadata.setLastLoggedIn(LocalDateTime.now().toEpochSecond(ZoneOffset.UTC));
        return deviceMetadata;
    }

    public Mono<IpInfo> getIpInfo(String ipAddress) {
        return this.webClient.get().uri("/json/{ipAddress}", ipAddress)
                .retrieve().bodyToMono(IpInfo.class);
    }

    private void saveNewMetadata(DeviceMetadata metadata) {
        metadataRepository.save(metadata);
    }

}
