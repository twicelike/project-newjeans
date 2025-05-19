export default class AppConfig {
    static BASE_URL = "http://localhost:8080";
    static SEND_OTP_URL = `${this.BASE_URL}/api/send-otp`;
    static UPLOAD_SURVEY = `${this.BASE_URL}/api/upload-survey`;
}
