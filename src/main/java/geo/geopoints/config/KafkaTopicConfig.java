package geo.geopoints.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {
    @Bean
    public NewTopic ggsTopic(){
        return TopicBuilder.name("ggs")
                .partitions(1)
                .replicas(1).build();
    }
    @Bean
    public NewTopic ggsRequestTopic(){
        return TopicBuilder.name("ggsRequest")
                .partitions(1)
                .replicas(1).build();
    }
    @Bean
    public NewTopic gnsRequestTopic(){
        return TopicBuilder.name("gnsRequest")
                .partitions(1)
                .replicas(1).build();
    }
    @Bean
    public NewTopic gnsTopic(){
        return TopicBuilder.name("gns")
                .partitions(1)
                .replicas(1).build();
    }
}
