```uml
@startuml
|Admin|
start
:Nhập thông tin tìm kiếm (email/tên);
|WebUI|
:Gửi yêu cầu tìm kiếm;

|System|
:UserService truy vấn danh sách users;
:Database trả về danh sách users;

|WebUI|
:Hiển thị danh sách users;

|Admin|
:Chọn hành động SUSPEND/UNSUSPEND?;

if (Admin chọn "SUSPEND"?) then (Yes)
  |WebUI|
  :Gửi yêu cầu SUSPEND user;
  |System|
  :Cập nhật trạng thái SUSPEND;
  :Database xác nhận cập nhật;
  |WebUI|
  :Hiển thị "Đã SUSPEND thành công";
else (No - chọn "UNSUSPEND")
  |WebUI|
  :Gửi yêu cầu UNSUSPEND user;
  |System|
  :Cập nhật trạng thái UNSUSPEND;
  :Database xác nhận cập nhật;
  |WebUI|
  :Hiển thị "Đã UNSUSPEND thành công";
endif

stop
@enduml
```