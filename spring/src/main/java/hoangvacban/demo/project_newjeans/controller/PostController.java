//package hoangvacban.demo.project_newjeans.controller;
//
//import hoangvacban.demo.project_newjeans.entity.Post;
//import hoangvacban.demo.project_newjeans.service.PostService;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import java.util.List;
//import java.util.Optional;
//
//@Controller
//public class PostController {
//
//    private final PostService postService;
//
//    public PostController(
//            PostService postService
//    ) {
//        this.postService = postService;
//    }
//
//    @GetMapping("/admin/post")
//    public String getPostPage(
//            Model model,
//            @RequestParam("page") Optional<String> pageOptional
//    ) {
//        int page = 1;
//        try {
//            if (pageOptional.isPresent()) {
//                page = Integer.parseInt(pageOptional.get());
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        Pageable pageable = PageRequest.of(page - 1, 10);
//        Page<Post> postPage = postService.getPosts(pageable);
//        List<Post> posts = postPage.getContent();
//        model.addAttribute("posts", posts);
//        model.addAttribute("total", postPage.getTotalElements());
//        model.addAttribute("current", page);
//
//        return "admin/post";
//    }
//}
