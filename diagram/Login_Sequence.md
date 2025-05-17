```uml
@startuml
actor "Admin/User" as User
participant WebUI
participant UserService
participant Database

User -> WebUI : Enter login information (email, password)
WebUI -> UserService : Send login info (email, password)
UserService -> Database : Get User by email from table User
Database -> UserService : Return result

alt User exists
    alt Password matches
        UserService -> WebUI : Redirect to /home
    else Password does not match
        UserService -> WebUI : Return error message (invalid credentials)
    end
else User does not exist
    UserService -> WebUI : Return error message (user does not exist)
end
@enduml
```