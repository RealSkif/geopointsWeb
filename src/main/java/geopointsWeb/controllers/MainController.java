package geopointsWeb.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/index")
public class MainController {


    @GetMapping
    public String home() {
        return "index";
    }

    @PostMapping
    public String locate() {

        return "index";
    }
}
