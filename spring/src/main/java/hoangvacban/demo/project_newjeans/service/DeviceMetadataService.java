package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.domain.DeviceMetadata;
import hoangvacban.demo.project_newjeans.domain.User;
import hoangvacban.demo.project_newjeans.domain.response.IpInfo;
import hoangvacban.demo.project_newjeans.repository.DeviceMetadataRepository;
import nl.basjes.parse.useragent.UserAgent;
import nl.basjes.parse.useragent.UserAgentAnalyzer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.Optional;

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
            @Value("${ip.api.url}") String IP_API_URL
    ) {
        this.userService = userService;
        this.metadataRepository = metadataRepository;
        this.userAgentAnalyzer = userAgentAnalyzer;
        this.webClient = builder.baseUrl(IP_API_URL).build();
    }

    @Async
    public void verify(String userAgentFromRequest, String ipAddress, String email) {
        Optional<User> user = userService.getUserByEmail(email);
        user.ifPresent(existedUser -> getIpInfo(ipAddress)
                .subscribe(res -> {
                    DeviceMetadata deviceMetadata = new DeviceMetadata();

                    UserAgent userAgent = userAgentAnalyzer.parse(userAgentFromRequest);

                    deviceMetadata.setUser(existedUser);
                    deviceMetadata.setIpAddress(ipAddress);
                    deviceMetadata.setOsName(userAgent.getValue(OPERATING_SYSTEM_NAME));
                    deviceMetadata.setAgentName(userAgent.getValue(AGENT_NAME));
                    deviceMetadata.setCity(res.getCity());
                    deviceMetadata.setCountry(res.getCountry());
                    deviceMetadata.setLastLoggedIn(LocalDateTime.now());
                    metadataRepository.save(deviceMetadata);


                }, err -> log.error("Failed to fetch IP info for {}: {}", ipAddress, err.getMessage()
                )));

    }

    private Mono<IpInfo> getIpInfo(String ipAddress) {
        return this.webClient.get().uri("/json/{ipAddress}", ipAddress)
                .retrieve().bodyToMono(IpInfo.class);
    }

}
