```uml
@startuml
actor "Admin/User" as Actor
participant WebUI
participant SessionRepository
participant Database

== Logout Sequence ==
Actor -> WebUI                   : Click "Logout" button
activate WebUI

note right of WebUI
  Spring MVC invokes LogoutFilter
  and routes to /logout endpoint
end note

WebUI -> SessionRepository       : deleteById(sessionId)
activate SessionRepository

note right of SessionRepository
  Tác động vào bảng SPRING_SESSION
  (tự động tạo bởi Spring Session)
end note

SessionRepository -> Database    : Xoá bản ghi session từ SPRING_SESSION
activate Database
Database --> SessionRepository   : Acknowledge deletion
deactivate Database

SessionRepository --> WebUI      : Xác nhận xoá session
deactivate SessionRepository

WebUI -> WebUI                   : Invalidate HTTP session
WebUI --> Actor                  : Redirect đến /login (đã đăng xuất)
deactivate WebUI
@enduml
```