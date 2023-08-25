package geo.geopoints.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Gns {
    private int id;
    private String name;
    private String index;
    private String mark;
    private String sighType;
    private String centerType;
    private String mainGeographyFeature;
    private String msk;
    private String regions_ref;
    private double latitude;
    private double longitude;
}

