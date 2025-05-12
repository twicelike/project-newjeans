@startuml
actor User
participant WebUI
participant HobbyTagService
participant Database

== Load Existing HobbyTags ==
User -> WebUI                : Yêu cầu danh sách HobbyTags
WebUI -> HobbyTagService     : Gửi request
HobbyTagService -> Database  : Lấy list từ Table HobbyTag và user’s selections từ Table User_Hobby\ntừ user ID được truyền lên
Database --> HobbyTagService : Trả về list tags & selections
HobbyTagService --> WebUI    : Chuyển kết quả
WebUI --> User               : Hiển thị danh sách & chọn/xoá tags

== Update HobbyTags ==
User -> WebUI                : Gửi list tags mới đã chọn/xoá
WebUI -> HobbyTagService     : Gửi selections update
HobbyTagService -> Database  : Cập nhật Table User_Hobby với userID
Database --> HobbyTagService : Xác nhận cập nhật
HobbyTagService --> WebUI    : Trả kết quả thành công
WebUI --> User               : Hiển thị danh sách tags mới
@enduml