package com.insurai.platform.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Configuration
public class RecommendationConfig {

    @Value("${recommendation.service-url}")
    private String recommendationServiceUrl;

    @Bean
    public RestClient recommendationRestClient() {
        // Using SimpleClientHttpRequestFactory (java.net.HttpURLConnection-based)
        // instead of the default JDK HttpClient, which attempts HTTP/2 upgrade
        // negotiation that uvicorn's HTTP/1.1-only dev server doesn't handle
        // correctly — causing the request body to silently not be sent.
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(5000);
        factory.setReadTimeout(10000);

        return RestClient.builder()
                .baseUrl(recommendationServiceUrl)
                .requestFactory(factory)
                .build();
    }
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}