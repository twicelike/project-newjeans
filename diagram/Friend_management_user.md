![alt text](img/image1.png)

# add friend
```uml
@startuml
actor User
participant WebUI
participant FriendService
participant Database

== Gửi lời mời kết bạn ==
User -> WebUI : Chọn người muốn kết bạn
WebUI -> FriendService : Gửi userSenderId, userReceiverId
FriendService -> Database : Kiểm tra trong Table Friends có tồn tại không
alt Đã tồn tại
    FriendService --> WebUI : Trả về "Đã gửi lời mời hoặc đã là bạn"
else Chưa tồn tại
    FriendService -> Database : Lưu vào Table Friends\nstatus = pending
    Database --> FriendService : OK
    FriendService --> WebUI : Trả kết quả thành công
end
WebUI --> User : Hiển thị kết quả
@enduml
```

# accept
```uml
@startuml
actor User
participant WebUI
participant FriendService
participant Database

== Chấp nhận lời mời kết bạn ==
User -> WebUI : Chọn người muốn chấp nhận
WebUI -> FriendService : Gửi userSenderId, userReceiverId
FriendService -> Database : Cập nhật Table Friends\nset status = accepted
Database --> FriendService : OK
FriendService --> WebUI : Trả kết quả
WebUI --> User : Hiển thị chấp nhận thành công
@enduml
```

# reject
```uml
@startuml
actor User
participant WebUI
participant FriendService
participant Database

== Từ chối lời mời kết bạn ==
User -> WebUI : Chọn người muốn từ chối
WebUI -> FriendService : Gửi userSenderId, userReceiverId
FriendService -> Database : Cập nhật Table Friends\nset status = rejected
Database --> FriendService : OK
FriendService --> WebUI : Trả kết quả
WebUI --> User : Hiển thị từ chối thành công
@enduml
```

# unfriend
```uml
@startuml
actor User
participant WebUI
participant FriendService
participant Database

== Huỷ kết bạn ==
User -> WebUI : Chọn người muốn huỷ kết bạn
WebUI -> FriendService : Gửi userSenderId, userReceiverId
FriendService -> Database : Xoá record trong Table Friends\ntheo 2 user ID
Database --> FriendService : OK
FriendService --> WebUI : Trả kết quả
WebUI --> User : Hiển thị huỷ kết bạn thành công
@enduml
```