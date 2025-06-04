package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.entity.UserImage;
import hoangvacban.demo.project_newjeans.repository.UserImagesRepository;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserImagesService {

    private final UserImagesRepository imagesRepository;
    private final UserRepository userRepository;
    private final UploadService uploadService;

    public UserImagesService(
            UserImagesRepository imagesRepository,
            UserRepository userRepository,
            UploadService uploadService
    ) {
        this.imagesRepository = imagesRepository;
        this.userRepository = userRepository;
        this.uploadService = uploadService;
    }

    public List<String> saveUserImages(User user, List<MultipartFile> files) {
        List<String> images = new ArrayList<>();
        for (MultipartFile fileImage : files) {
            UserImage userImage = new UserImage();
            userImage.setUser(user);
            String url = uploadService.saveUploadFile(fileImage, "userImages");
            userImage.setUrl(url);
            userImage.setCreated(LocalDateTime.now());
            images.add(url);
            imagesRepository.save(userImage);
        }
        return images;
    }

    public void updateAvatar(User user, MultipartFile file) {
        String url = uploadService.saveUploadFile(file, "userImages");
        user.setAvatar(url);
        userRepository.save(user);
    }

    public List<UserImage> getAllUserImages(User user) {
        return imagesRepository.findAllByUser(user);
    }

}
