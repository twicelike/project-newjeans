```uml
@startuml
actor Admin
participant WebUI
participant HobbyTagService
participant Database

== Create HobbyTag ==
Admin -> WebUI                     : Nhập thông tin HobbyTag
WebUI -> HobbyTagService           : Gửi dữ liệu HobbyTag mới
HobbyTagService -> Database        : Lưu vào thông tin Table HobbyTag
Database --> HobbyTagService       : Trả kết quả lưu thành công
HobbyTagService --> WebUI          : Hiển thị "Tạo thành công"

== Edit or Delete HobbyTag ==
Admin -> WebUI                     : Yêu cầu danh sách HobbyTag
WebUI -> HobbyTagService           : Gửi request lấy danh sách
HobbyTagService -> Database        : Tìm kiếm trong Table HobbyTag
Database --> HobbyTagService       : Trả về danh sách HobbyTag
HobbyTagService --> WebUI          : Hiển thị danh sách
alt Edit
Admin -> WebUI                     : Chọn HobbyTag và nhập thông tin mới
WebUI -> HobbyTagService           : Gửi id + dữ liệu chỉnh sửa
HobbyTagService -> Database        : Cập nhật HobbyTag theo Id và thông tin trong Table HobbyTag
Database --> HobbyTagService       : Xác nhận cập nhật thành công
HobbyTagService --> WebUI          : Trả về kết quả 
else Delete
Admin -> WebUI                     : Chọn HobbyTag cần xóa (id)
WebUI -> HobbyTagService           : Gửi id cần xóa
HobbyTagService -> Database        : Xóa trong Table HobbyTag
HobbyTagService -> Database        : Xóa liên kết trong Table User_HobbyTag
Database --> HobbyTagService       : Xác nhận xóa thành công
HobbyTagService --> WebUI          : Trả kết quả xóa
end
@enduml
```