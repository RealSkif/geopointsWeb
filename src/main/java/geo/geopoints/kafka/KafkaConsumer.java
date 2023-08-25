package geo.geopoints.kafka;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import geo.geopoints.models.Ggs;
import geo.geopoints.models.Gns;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class KafkaConsumer {


    @KafkaListener(topics = "ggs", groupId = "geopoints")
     void consumeGgs(List<Ggs> data) {
        ObjectMapper mapper = new ObjectMapper();
        List<Ggs> ggsList = mapper.convertValue(data, new TypeReference<>() {});
        System.out.println("Список ггс");
        for (Ggs ggs : ggsList) {
            System.out.println(ggs.getName() + ", " + ggs.getLatitude() + ", " + ggs.getLongitude());
        }
    }
    @KafkaListener(topics = "gns", groupId = "geopoints")
     void consumeGns(List<Gns> data) {
        ObjectMapper mapper = new ObjectMapper();
        List<Gns> gnsList = mapper.convertValue(data, new TypeReference<>() {});
        System.out.println("Список гнс");
        for (Gns gns : gnsList) {
            System.out.println(gns.getName() + ", " + gns.getLatitude() + ", " + gns.getLongitude());
        }
    }

}
