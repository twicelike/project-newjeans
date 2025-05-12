```uml
@startuml
actor Admin
participant WebUI
participant PostService
participant Database

== Create Post ==
Admin -> WebUI            : Nhập thông tin Post
WebUI -> PostService      : Gửi dữ liệu Post mới
PostService -> Database   : Lưu vào Table Post
Database --> PostService  : Xác nhận lưu thành công
PostService --> WebUI     : Trả kết quả tạo thành công

== Find Post ==
Admin -> WebUI            : Nhập tên hoặc ngày tạo Post
WebUI -> PostService      : Gửi tiêu chí tìm kiếm (tên hoặc ngày)
PostService -> Database   : Tìm kiếm trong Table Post với tên hoặc ngày tạo
Database --> PostService  : Trả về danh sách Post phù hợp
PostService --> WebUI     : Chuyển danh sách về và hiển thị

== Update or Delete Post ==
Admin -> WebUI            : Yêu cầu danh sách/tìm kiếm Post
WebUI -> PostService      : Gửi request lấy dữ liệu
PostService -> Database   : Tìm kiếm trong Table Post
Database --> PostService  : Trả về danh sách Post
PostService --> WebUI     : Chuyển danh sách về và hiển thị

alt Update
Admin -> WebUI            : Chọn Post và nhập thông tin mới
WebUI -> PostService      : Gửi id + dữ liệu cập nhật
PostService -> Database   : Cập nhật Table Post với id và thông tin mới
Database --> PostService  : Xác nhận cập nhật thành công
PostService --> WebUI     : Trả kết quả cập nhật
else Delete
Admin -> WebUI            : Chọn Post cần xóa (id)
WebUI -> PostService      : Gửi id cần xóa
PostService -> Database   : Xóa trong Table Post với id
Database --> PostService  : Xác nhận xóa thành công
PostService --> WebUI     : Trả kết quả xóa
end
@enduml
```