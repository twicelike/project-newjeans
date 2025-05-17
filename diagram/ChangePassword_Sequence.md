```uml
@startuml
actor "Admin/User" as Actor
participant WebUI
participant UserService
participant Database

== Change Password ==
Actor -> WebUI            : Enter current password & new password
WebUI -> UserService      : Send current password, new password, userID
UserService -> UserService: Validate new password format

alt Invalid format
    UserService --> WebUI: Password does not meet requirements
else Valid format
    UserService -> Database  : Retrieve hashed password from User table by userID
    Database --> UserService : Return hashed password

    alt Password mismatch
        UserService -> WebUI : Return error "Current password is incorrect"
        WebUI --> Actor       : Display error message
    else Password matches
        UserService -> UserService : Hash the new password
        UserService -> Database     : Update the hashed password in User table
        Database --> UserService    : Confirm update
        UserService --> WebUI       : Return success result
        WebUI --> Actor             : Display "Password changed successfully"
    end
end
@enduml
```