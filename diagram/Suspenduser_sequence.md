```uml
@startuml
actor Admin
participant WebUI
participant UserService
participant Database

Admin ->> WebUI: Enter user search info (email/name)
WebUI ->> UserService: Send search request
UserService ->> Database: Query users from table "User" with (email/name)
Database -->> UserService: Return list of users
UserService -->> WebUI: Return user list
WebUI ->> Admin: Display search results

Admin ->> WebUI: Select user to suspend (send userID)
WebUI ->> UserService: Send suspend request (userID)
UserService ->> Database: Update field `isSuspended = true` in "User" table by userID
Database -->> UserService: Confirm update
UserService -->> WebUI: Return suspend result
WebUI ->> Admin: Display success message
@enduml
```