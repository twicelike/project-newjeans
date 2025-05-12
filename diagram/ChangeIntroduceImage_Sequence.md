```uml
@startuml
actor User
participant WebUI
participant UserService
participant UploadService
participant Database

== Change Gallery Images ==
User -> WebUI            : Upload 1–6 file ảnh
WebUI -> UserService     : Gửi các file ảnh
UserService -> UploadService : Yêu cầu xử lý & upload nhiều ảnh
alt ảnh hợp lệ
UploadService --> UserService : Trả về list URL ảnh
UserService -> Database  : Lấy list hiện tại từ Table User_Image với userID
Database --> UserService : Trả về list URL cũ
UserService -> Database  : Cập nhật list URL mới vào Table User_Image
Database --> UserService : Xác nhận cập nhật
UserService --> WebUI    : Trả kết quả thành công + list URL mới
WebUI --> User           : Hiển thị gallery đã cập nhật
note over of UploadService
   File ảnh sẽ được lưu 
   ở trong hệ thống backend
end note
else ảnh không hợp lệ
UploadService --> UserService: không đúng yêu cầu
UserService --> WebUI:ảnh không hợp lệ
end
@enduml
```