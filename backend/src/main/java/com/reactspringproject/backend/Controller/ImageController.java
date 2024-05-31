package com.reactspringproject.backend.Controller;


import com.reactspringproject.backend.Service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class ImageController
{

    private final ImageService imageService;

    @PostMapping("/addimg")
    public ResponseEntity<?> uploadImage(@RequestBody MultipartFile image, Principal principal) throws IOException {

        String username=principal.getName();
        String uploadImage = imageService.uploadImage(image,username);
        return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
    }

    @GetMapping("/getImage")
    public ResponseEntity<?> downloadImage(Principal principal) {
        System.out.println("hiiiiiiiiiii this is image file................");
        String username=principal.getName();
        String fileName= imageService.getfilenameByusename(username);

        byte[] imageData = imageService.downloadImage(fileName,username);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf(IMAGE_PNG_VALUE))
                .body(imageData);
    }
}
