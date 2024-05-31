package com.reactspringproject.backend.Service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.reactspringproject.backend.Dao.ImageRepository;
import com.reactspringproject.backend.Entity.Image;
import com.reactspringproject.backend.Utils.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.exception.ContextedRuntimeException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;
@Service

@RequiredArgsConstructor
public class ImageService
{
    @Value("${upload.folder}")
    private String uploadFolder;
    private final ImageRepository imageRepository;
    private static final Logger logger = LoggerFactory.getLogger(ImageService.class);


    public String uploadImage(MultipartFile imageFile, String username) throws IOException {
        logger.info("Uploading image file: {}", imageFile.getOriginalFilename());

        // Create upload folder if it doesn't exist
        File folder = new File(uploadFolder);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String timeStamp = dateFormat.format(new Date());
        String originalFileName = imageFile.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String newFileName = "image_" + timeStamp + fileExtension;

        // Save the image file to the upload folder with the new filename
        String filePath = uploadFolder + File.separator + newFileName;
        imageFile.transferTo(new File(filePath));

        // Save the file path to the database
        Image image = new Image();
        image.setFileName(newFileName);
        image.setFilePath(filePath);
        imageRepository.save(image);

        logger.info("File uploaded successfully: {}", newFileName);
        return "File uploaded successfully: " + newFileName;
    }
    public byte[] downloadImage(String imageName, String name) {
        logger.info("Downloading image: {}", imageName);
        imageRepository.deleteAllByUsername(name);
        Optional<Image> dbImage = imageRepository.findByName(imageName);
        return dbImage.map(image -> {
            try {
                return ImageUtils.decompressImage(image.getImageData());
            } catch (DataFormatException | IOException exception) {
                throw new ContextedRuntimeException("Error downloading an image", exception)
                        .addContextValue("Image ID", image.getId())
                        .addContextValue("Image name", imageName);
            }
        }).orElse(null);
    }

    public String getfilenameByusename(String name) {
        logger.info("Retrieving filename by username: {}", name);
        return imageRepository.findnamebyusername(name);
    }
}
