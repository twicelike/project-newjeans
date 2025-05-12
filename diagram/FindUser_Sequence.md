@startuml
actor "Admin/User" as Actor
participant WebUI
participant UserService
participant Database

== Bắt đầu tìm kiếm User ==
Actor -> WebUI : Nhập từ khoá tìm kiếm (tên, tuổi, trường, ...)
activate WebUI

WebUI -> UserService : Gửi request tìm kiếm với các tiêu chí
activate UserService

UserService -> Database : Tìm kiếm trong Table User\nvới các tiêu chí đã nhập
activate Database
Database --> UserService : Trả về danh sách User (có thể rỗng)
deactivate Database
alt Có kết quả tìm kiếm
    UserService --> WebUI : Trả về danh sách kết quả tìm kiếm
    WebUI --> Actor : Hiển thị danh sách User
else Không có kết quả
    UserService --> WebUI : Trả về danh sách rỗng
    WebUI --> Actor : Hiển thị thông báo "Không tìm thấy người dùng nào phù hợp"
end
deactivate UserService
deactivate WebUI
@enduml