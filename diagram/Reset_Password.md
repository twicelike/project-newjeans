```uml
@startuml
actor "Admin/User" as Actor
participant WebUI
participant UserService
participant EmailService
database "Database\n(table: User)" as Database

== Send OTP ==
Actor -> WebUI          : Click "Forgot Password"\nand enter email
WebUI -> EmailService   : Generate OTP for email
EmailService -> EmailService : Check existing OTP in cache
alt OTP still valid
    EmailService --> WebUI : Inform "OTP still valid"
else
    EmailService -> EmailService : Create new OTP
    EmailService -> EmailService : Store OTP in cache
    EmailService -> EmailService : Send OTP email to user
    EmailService --> WebUI : Inform "OTP sent"
end
WebUI --> Actor        : Display OTP prompt

== Reset Password ==
Actor -> WebUI          : Enter email, OTP\nand click "Verify"
WebUI -> UserService    : Validate OTP for email
UserService -> EmailService : Check OTP in cache
alt OTP invalid or expired
    EmailService --> UserService : Return "OTP invalid/expired"
    UserService --> WebUI       : Display error "Invalid OTP"
    WebUI --> Actor             : Show error message
else OTP valid
    EmailService --> UserService : Return "OTP valid"
    UserService --> WebUI       : Prompt for new password
end

Actor -> WebUI          : Enter new password\nand confirm password
WebUI -> UserService    : Send newPassword, confirmPassword, email
UserService -> UserService : Validate password format\nand match
alt Passwords invalid or mismatch
    UserService --> WebUI : Return error "Invalid format or passwords do not match"
    WebUI --> Actor       : Show error message
else Valid passwords
    UserService -> Database  : Fetch user record by email
    Database --> UserService : Return user record
    UserService -> UserService : Hash new password
    UserService -> Database  : Update User table\nset password = hashed value
    Database --> UserService : Confirm update
    UserService --> WebUI    : Return success "Password reset successful"
    WebUI --> Actor          : Display success message
end
@enduml
```