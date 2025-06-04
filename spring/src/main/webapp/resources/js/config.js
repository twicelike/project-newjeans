export default class AppConfig {
    // static BASE_URL = "https://b3e0-2001-ee1-db04-3bf0-a0a7-8b60-512b-bc80.ngrok-free.app";
    static BASE_URL = "http://localhost:8080";
    // static BASE_URL = 'http://26.118.99.74:8080';
    static SEND_OTP_URL = `${this.BASE_URL}/api/send-otp`;
    static UPLOAD_SURVEY = `${this.BASE_URL}/api/upload-survey`;
    static ADD_FRIEND = `${this.BASE_URL}/api/add-friend`;
    static UNFRIEND = `${this.BASE_URL}/api/unfriend`;
    static ACCEPT = `${this.BASE_URL}/api/accept`;
    static DELETE = `${this.BASE_URL}/api/delete`;
    static GET_SURVEY = `${this.BASE_URL}/api/survey`;
    static GET_MESSAGE = `${this.BASE_URL}/api/message`;
    static IS_SURVEY_EXISTS = `${this.BASE_URL}/api/exists-survey`;
    static LEVEL_UP = `${this.BASE_URL}/api/level-up`;
}
