@startuml
actor User
participant WebUI
participant UserService
participant Database

User -> WebUI : Enter login information (username, password)
WebUI -> UserService : Send login info (username, password)
UserService -> Database : Query User table (username, password)
Database -> UserService : Return result (user exists and password matches)

alt Valid login
    UserService -> WebUI : Redirect to /home
else Invalid login
    UserService -> WebUI : Return error message (invalid credentials)
end
@enduml