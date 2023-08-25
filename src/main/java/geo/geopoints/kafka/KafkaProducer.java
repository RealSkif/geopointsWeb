package geo.geopoints.kafka;

import geo.geopoints.util.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {
    @Autowired
    private KafkaTemplate<String, Request> kafkaTemplate;

    public KafkaProducer(KafkaTemplate<String, Request> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void ggsRequest(Request data) {
        data.setLatitude(52);
        data.setLongitude(85);
        data.setRadius(15);
        System.out.println("Запрос ггс  составляется");
        Message<Request> message = MessageBuilder.withPayload(data)
                .setHeader(KafkaHeaders.TOPIC, "ggsRequest")
                .build();
        kafkaTemplate.send(message);
    }
    public void gnsRequest(Request data) {
        data.setLatitude(52);
        data.setLongitude(85);
        data.setRadius(15);
        System.out.println("Запрос гнс составляется");
        Message<Request> message = MessageBuilder.withPayload(data)
                .setHeader(KafkaHeaders.TOPIC, "gnsRequest")
                .build();
        kafkaTemplate.send(message);
    }
}
