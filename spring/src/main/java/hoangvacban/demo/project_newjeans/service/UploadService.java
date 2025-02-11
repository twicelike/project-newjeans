package hoangvacban.demo.project_newjeans.service;

import jakarta.servlet.ServletContext;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Objects;

@Service
public class UploadService {
    private final ServletContext servletContext;

    public UploadService(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    public String saveUploadFile(MultipartFile file, String targetFolder) {
        if (file.isEmpty()) {
            return null;
        }
        String rootPath = servletContext.getRealPath("/resources/images");
        String fileName = "";
        try {
            byte[] bytes = file.getBytes();

            File dir = new File(rootPath + File.separator + targetFolder);

            if (!dir.exists()) {
                dir.mkdirs();
            }

            String originalFileName = Objects.requireNonNull(file.getOriginalFilename()).replaceAll("\\s+", "");
            fileName = System.currentTimeMillis() + "-" + originalFileName;
            File serverFile = new File(dir.getAbsolutePath() + File.separator + fileName);
            BufferedOutputStream steam = new BufferedOutputStream(
                    new FileOutputStream(serverFile)
            );
            steam.write(bytes);
            steam.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return fileName;
    }
}
