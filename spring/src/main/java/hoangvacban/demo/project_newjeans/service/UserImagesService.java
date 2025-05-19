package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.entity.UserImage;
import hoangvacban.demo.project_newjeans.repository.UserImagesRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserImagesService {

    private final UserImagesRepository imagesRepository;
    private final UploadService uploadService;

    public UserImagesService(UserImagesRepository imagesRepository, UploadService uploadService) {
        this.imagesRepository = imagesRepository;
        this.uploadService = uploadService;
    }

    public void saveUserImages(User user, MultipartFile[] file) {
        for (MultipartFile fileImage : file) {
            UserImage userImage = new UserImage();
            userImage.setUser(user);
            userImage.setUrl(uploadService.saveUploadFile(fileImage, "userImages"));
            imagesRepository.save(userImage);
        }
    }

}
