```uml
@startuml
actor User
participant WebUI
participant UserService
participant UploadService
participant Database

== Change Gallery Images ==
User -> WebUI            : Upload 1–3 image files
WebUI -> UserService     : Send image files
UserService -> UploadService : Request processing & upload multiple images

alt Valid images
UploadService --> UserService : Return list of image URLs
UserService -> Database  : Save into image fields in talbe User \nand save images into table User_Image
Database --> UserService : Confirm update
UserService --> WebUI    : Return success result + new URL list
WebUI --> User           : Display updated gallery
note over UploadService
   Image files will be stored 
   in the backend system
end note

else Invalid images
UploadService --> UserService: Invalid image(s)
UserService --> WebUI: Image(s) not valid
end
@enduml
```