package hoangvacban.demo.project_newjeans.dto.response;

import hoangvacban.demo.project_newjeans.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostPageResponse {
    private List<Post> posts;
    private int totalPages;
    private long totalItems;
    private int currentPage;
}
