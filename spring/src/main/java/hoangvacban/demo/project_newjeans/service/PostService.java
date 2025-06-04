package hoangvacban.demo.project_newjeans.service;

import hoangvacban.demo.project_newjeans.dto.PostDTO;
import hoangvacban.demo.project_newjeans.entity.Post;
import hoangvacban.demo.project_newjeans.repository.PostRepository;
import hoangvacban.demo.project_newjeans.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
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

    public void addNewPost(PostDTO postDTO) {
        Post post = new Post();
        post.setContent(postDTO.getContent());
        post.setAuthor(postDTO.getAuthor());
        post.setCreatedAt(LocalDateTime.now());
        post.setTitle(postDTO.getTitle());
        postRepository.save(post);
    }

    public void deletePost(long postId) {
        postRepository.findById(postId).ifPresent(postRepository::delete);
    }

    public void editPost(long postId, String content, MultipartFile image) {
        Optional<Post> post = postRepository.findById(postId);
        post.ifPresent(p -> {

        });
    }

    public Page<Post> getPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }
}
