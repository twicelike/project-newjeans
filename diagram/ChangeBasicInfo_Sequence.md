```uml
@startuml
actor User
participant WebUI
participant UserService
participant Database

== Change Basic Info ==
User -> WebUI            : Nhập thông tin cơ bản mới
WebUI -> UserService     : Gửi data cơ bản + userID
UserService -> Database  : Cập nhật Table User với userID và các trường mới
Database --> UserService : Xác nhận cập nhật
UserService --> WebUI    : Trả kết quả thành công
WebUI --> User           : Hiển thị thông tin mới

note over of User
    Các thông tin cơ bản như là:
    tên, tuổi, quê quán, ...
end note
@enduml
```