```uml
@startuml
actor User
participant WebUI
participant UserService
participant EmailService
database "Database\n(table: User)" as Database

== Send OTP ==
User -> WebUI: Enter email + click "Send OTP"
WebUI -> EmailService: Generate OTP code for email
EmailService -> EmailService: Check OTP in cache
alt OTP is still valid
    EmailService --> WebUI: OTP is still valid
else
    EmailService -> EmailService: Generate new OTP
    EmailService -> EmailService: Save to cache
    EmailService -> EmailService: Send email to user
    EmailService --> WebUI: OTP has been sent
end

== Register ==
User -> WebUI: Enter info + OTP + click "Register"
WebUI -> UserService: Create account with email, password, otp code
UserService -> EmailService: Validate OTP from cache
alt OTP is invalid
    EmailService --> UserService: OTP is incorrect or expired
    UserService --> WebUI: Notify OTP is invalid
else
    EmailService --> UserService: OTP is valid
    UserService -> Database: Query User table (check email/username uniqueness)
    Database --> UserService: Result whether duplicate or not
    alt Info is duplicate
        UserService --> WebUI: Username or email already exists
    else
        UserService -> Database: Insert new record into User table
        Database --> UserService: OK
        UserService --> WebUI: Registration successful
    end
end
@enduml
```