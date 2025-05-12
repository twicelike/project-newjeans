```uml
@startuml
actor User
participant WebUI
participant UserService
participant UploadService
participant Database

== Change Avatar ==
User -> WebUI            : Upload file ảnh mới
WebUI -> UserService     : Gửi file ảnh
UserService -> UploadService : Yêu cầu xử lý & upload
UploadService --> UserService : Trả về URL của ảnh
UserService -> Database  : Cập nhật avatar URL trong Table User với userID
Database --> UserService : Xác nhận cập nhật
UserService --> WebUI    : Trả kết quả thành công
WebUI --> User           : Hiển thị avatar mới
note over of UploadService
   File ảnh sẽ được lưu 
   ở trong hệ thống backend
end note
@enduml
```