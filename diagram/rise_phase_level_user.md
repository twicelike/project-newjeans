# rise
```uml
@startuml
actor User
participant WebUI
participant FriendService
participant Database

User -> WebUI : Chọn bạn cần nâng level
activate WebUI

WebUI -> FriendService : Gửi friendId để rise level
activate FriendService

FriendService -> Database : Lấy phase_id từ bảng friends theo friendId
activate Database
Database --> FriendService : Trả về currentPhaseId
deactivate Database

FriendService -> Database : Lấy max phase từ bảng phase
activate Database
Database --> FriendService : Trả về maxPhaseId (max = 3)
deactivate Database

alt currentPhaseId < maxPhaseId
    FriendService -> Database : Cập nhật friends.phase_id = currentPhaseId + 1
    activate Database
    Database --> FriendService : Cập nhật thành công
    deactivate Database
    FriendService --> WebUI : Trả kết quả thành công
else max level
    FriendService --> WebUI : Trả lỗi "Đã đạt level tối đa"
end

WebUI --> User : Hiển thị thông báo kết quả
deactivate FriendService
deactivate WebUI
@enduml
```