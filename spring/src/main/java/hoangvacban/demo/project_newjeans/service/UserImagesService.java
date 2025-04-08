package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.entity.UserImage;
import hoangvacban.demo.project_newjeans.repository.UserImagesRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserImagesService {

    private final UserImagesRepository imagesRepository;
    private final UploadService uploadService;

    public UserImagesService(UserImagesRepository imagesRepository, UploadService uploadService) {
        this.imagesRepository = imagesRepository;
        this.uploadService = uploadService;
    }

    public List<UserImage> saveUserImages(MultipartFile[] file, User user) {
        List<UserImage> userImages = new ArrayList<>();
        for (MultipartFile fileImage : file) {
            UserImage userImage = new UserImage();
            userImage.setUser(user);
            userImage.setUrl(uploadService.saveUploadFile(fileImage, "userImages"));
            userImages.add(imagesRepository.save(userImage));
        }
        return userImages;
    }
}
