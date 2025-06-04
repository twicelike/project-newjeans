package hoangvacban.demo.project_newjeans.exception;

public class UserExistException extends RuntimeException {
    public UserExistException() {
    }

    public UserExistException(String message) {
        super(message);

    }
}
