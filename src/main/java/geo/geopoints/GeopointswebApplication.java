package geo.geopoints;

import geo.geopoints.kafka.KafkaProducer;
import geo.geopoints.util.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GeopointswebApplication {
    private static KafkaProducer kafkaProducer;

    @Autowired
    public GeopointswebApplication(KafkaProducer kafkaProducer) {
        GeopointswebApplication.kafkaProducer = kafkaProducer;
    }

    public static void main(String[] args) {
        SpringApplication.run(GeopointswebApplication.class, args);

        kafkaProducer.ggsRequest(new Request());
        kafkaProducer.gnsRequest(new Request());
        System.out.println("запрос гнс отправлен");

    }

}
