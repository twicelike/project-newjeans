package hoangvacban.demo.project_newjeans.exception;

public class EmailException extends RuntimeException {
    public EmailException() {

    }

    public EmailException(String message) {
        super(message);
    }

    public EmailException(String message, Throwable cause) {
        super(message, cause);
    }
}
