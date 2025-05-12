```uml

@startuml
actor User
participant WebUI
participant UserService
participant EmailService
database "Database\n(table: User)" as Database

== Gửi OTP ==
User -> WebUI: Nhập email + bấm "Gửi OTP"
WebUI -> EmailService: generateOtp(email)
EmailService -> EmailService: Kiểm tra OTP trong cache
alt OTP còn hiệu lực
    EmailService --> WebUI: OTP vẫn còn hiệu lực
else
    EmailService -> EmailService: Tạo OTP mới
    EmailService -> EmailService: Lưu vào cache
    EmailService -> EmailService: Gửi email đến user
    EmailService --> WebUI: OTP đã được gửi
end

== Đăng ký ==
User -> WebUI: Nhập thông tin + OTP + bấm "Đăng ký"
WebUI -> UserService: register(username, email, password, otp)
UserService -> EmailService: Kiểm tra OTP trong cache
alt OTP không hợp lệ
    EmailService --> UserService: OTP sai hoặc hết hạn
    UserService --> WebUI: Thông báo OTP không hợp lệ
else
    EmailService --> UserService: OTP hợp lệ
    UserService -> Database: Truy vấn bảng User (kiểm tra email/username trùng)
    Database --> UserService: Kết quả trùng hay không
    alt Thông tin bị trùng
        UserService --> WebUI: Username hoặc email đã tồn tại
    else
        UserService -> Database: Thêm bản ghi mới vào bảng User
        Database --> UserService: OK
        UserService --> WebUI: Đăng ký thành công
    end
end
@enduml
```