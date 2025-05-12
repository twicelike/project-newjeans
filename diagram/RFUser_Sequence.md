@startuml
actor User
participant WebUI
participant ReportService
participant Database

== User gửi Report ==
User -> WebUI : Gửi form report (gồm senderId,\nreceiverId, nội dung, type="report")
WebUI -> ReportService : Gửi dữ liệu report
ReportService -> Database : Lưu thông tin vào Table Report/Feedback
Database --> ReportService : Xác nhận lưu
ReportService --> WebUI : Trả kết quả thành công
WebUI --> User : Hiển thị thông báo gửi thành công

== User gửi Feedback ==
User -> WebUI : Gửi form feedback (có/không có userId,\nnội dung, type="feedback")
WebUI -> ReportService : Gửi dữ liệu feedback
ReportService -> Database : Lưu thông tin vào Table Report/Feedback
Database --> ReportService : Xác nhận lưu
ReportService --> WebUI : Trả kết quả thành công
WebUI --> User : Hiển thị thông báo gửi thành công
@enduml