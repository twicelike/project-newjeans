package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.entity.Post;
import hoangvacban.demo.project_newjeans.entity.User;
import hoangvacban.demo.project_newjeans.repository.PostRepository;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UploadService uploadService;
    private final UserRepository userRepository;

    public PostService(
            PostRepository postRepository,
            UploadService uploadService,
            UserRepository userRepository
    ) {
        this.postRepository = postRepository;
        this.uploadService = uploadService;
        this.userRepository = userRepository;
    }

    public void addNewPost(long adminId, String content, MultipartFile image) {
        Optional<User> admin = userRepository.findById(adminId);
        if (admin.isPresent()) {
            Post post = new Post();
            post.setContent(content);
            post.setImage(uploadService.saveUploadFile(image, "post"));
            post.setAdmin(admin.get());
            post.setTimestamp(LocalDateTime.now().toEpochSecond(ZoneOffset.UTC));
            postRepository.save(post);
        }
    }

    public void deletePost(long postId) {
        postRepository.findById(postId).ifPresent(postRepository::delete);
    }

    public void editPost(long postId, String content, MultipartFile image) {
        Optional<Post> post = postRepository.findById(postId);
        post.ifPresent(p -> {
            p.setContent(content);
            if (image != null) {
                p.setImage(uploadService.saveUploadFile(image, "post"));
            }
            p.setTimestamp(LocalDateTime.now().toEpochSecond(ZoneOffset.UTC));
            postRepository.save(p);
        });
    }

    public Page<Post> getPosts(Pageable pageable){
        return postRepository.findAll(pageable);
    }
}
