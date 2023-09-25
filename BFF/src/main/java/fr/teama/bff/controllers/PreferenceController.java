package fr.teama.bff.controllers;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin
@RequestMapping(path = PreferenceController.BASE_URI, consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
public class PreferenceController {
    public static final String BASE_URI = "/api/preference";

}
