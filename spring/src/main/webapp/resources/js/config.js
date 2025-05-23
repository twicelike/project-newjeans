export default class AppConfig {
    // static BASE_URL = "https://b3e0-2001-ee1-db04-3bf0-a0a7-8b60-512b-bc80.ngrok-free.app";
    static BASE_URL = "http://localhost:8080";
    static SEND_OTP_URL = `${this.BASE_URL}/api/send-otp`;
    static UPLOAD_SURVEY = `${this.BASE_URL}/api/upload-survey`;
    static ADD_FRIEND = `${this.BASE_URL}/api/add-friend`;
}
