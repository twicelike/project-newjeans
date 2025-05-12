@startuml
actor Admin
participant WebUI
participant ReportService
participant Database

== Admin lấy tất cả Report/Feedback ==
Admin -> WebUI : Gửi yêu cầu lấy tất cả
WebUI -> ReportService : Gửi request getAll
ReportService -> Database : Truy vấn tất cả từ Table Report/Feedback
Database --> ReportService : Trả danh sách reports/feedbacks
ReportService --> WebUI : Trả kết quả
WebUI --> Admin : Hiển thị danh sách

== Admin xử lý Report/Feedback ==
Admin -> WebUI : Gửi yêu cầu resolve (id)
WebUI -> ReportService : Gửi id để cập nhật isResolved = true
ReportService -> Database : Cập nhật field isResolved = true\nvới report/feedback id
Database --> ReportService : Xác nhận cập nhật
ReportService --> WebUI : Trả kết quả thành công
WebUI --> Admin : Hiển thị trạng thái đã xử lý
@enduml