@startuml
actor Admin
    participant WebUI
    participant UserService
    participant Database

    Admin->>WebUI: Nhập thông tin tìm user (email/tên)
    WebUI->>UserService: Gửi search request
    UserService->>Database: Query users from table users with (email/name)
    Database-->>UserService: Trả về danh sách users
    UserService-->>WebUI: Hiển thị danh sách users
    WebUI->>Admin: Hiển thị kết quả tìm kiếm

    Admin->>WebUI: Chọn user cần suspend (gửi userID)
    WebUI->>UserService: Gửi suspend request (userID)
    UserService->>Database: Cập nhật trạng thái (UPDATE users SET isSuspended=true WHERE id=userID)
    Database-->>UserService: Xác nhận cập nhật
    UserService-->>WebUI: Trả về kết quả suspend
    WebUI->>Admin: Hiển thị thông báo thành công
@enduml