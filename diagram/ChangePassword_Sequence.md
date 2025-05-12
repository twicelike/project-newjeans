@startuml
actor User
participant WebUI
participant UserService
participant Database

== Change Password ==
User -> WebUI            : Nhập password cũ & password mới
WebUI -> UserService     : Gửi mật khẩu cũ, mật khẩu mới, userID
UserService -> UserService: kiểm tra mật khẩu mới
alt sai định dạng 
UserService --> WebUI: Mật khẩu không chứa ký tự yêu cầu
else đúng định dạngdạng
UserService -> Database  : Lấy mật khẩu đã mã hoá từ Table User từ userID
end
Database --> UserService : Trả về mật khẩu đã được mã hoá
alt mật khẩu cũ không khớp
    UserService -> WebUI : Trả lỗi "Mật khẩu cũ không đúng"
    WebUI --> User       : Hiển thị thông báo lỗi
else mật khẩu cũ khớp
    UserService -> UserService : Mã hoá mật khẩu mới
    UserService -> Database     : Cập nhật mật khẩu đã được mã hoá vào Table User
    Database --> UserService    : Xác nhận cập nhật
    UserService --> WebUI       : Trả kết quả thành công
    WebUI --> User              : Hiển thị "Đổi mật khẩu thành công"
end
@enduml