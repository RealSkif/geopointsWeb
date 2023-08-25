package geo.geopoints.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Ggs {
    @JsonProperty("id")
    private int id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("index")
    private String index;
    @JsonProperty("mark")
    private String mark;
    @JsonProperty("sighType")
    private String sighType;
    @JsonProperty("centerType")
    private String centerType;
    @JsonProperty("msk")
    private String msk;
    @JsonProperty("regions")
    private String regions;
    @JsonProperty("latitude")
    private double latitude;
    @JsonProperty("longitude")
    private double longitude;

}
