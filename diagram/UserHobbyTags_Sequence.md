```uml
@startuml
actor User
participant WebUI
participant HobbyTagService
participant Database

== Load Existing HobbyTags ==
User -> WebUI                : Request list of HobbyTags
WebUI -> HobbyTagService     : Send request
HobbyTagService -> Database  : Fetch list from HobbyTag table and user’s selections from User_Hobby table\nusing the provided user ID
Database --> HobbyTagService : Return tags & selections list
HobbyTagService --> WebUI    : Return result
WebUI --> User               : Display list & allow selecting/removing tags

== Update HobbyTags ==
User -> WebUI                : Send updated list of selected/removed tags
WebUI -> HobbyTagService     : Send selections update
HobbyTagService -> Database  : Update User_Hobby table using userID
Database --> HobbyTagService : Confirm update
HobbyTagService --> WebUI    : Return success result
WebUI --> User               : Display updated tag list
@enduml
```