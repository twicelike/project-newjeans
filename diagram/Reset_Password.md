```uml
@startuml
actor "Admin/User" as Actor
participant WebUI
participant UserService
participant EmailService
database "Database\n(table: User)" as Database

== Request OTP ==
Actor -> WebUI               : Click "Forgot Password" and enter email
WebUI -> EmailService        : Generate OTP for email
EmailService -> EmailService : Check cache for existing OTP
alt OTP still valid
    EmailService --> WebUI   : Inform "OTP still valid"
else
    EmailService -> EmailService : Create new OTP
    EmailService -> EmailService : Store OTP in cache
    EmailService -> EmailService : Send OTP email to user
    EmailService --> WebUI   : Inform "OTP sent"
end
WebUI --> Actor              : Prompt to enter OTP

== Validate OTP ==
Actor -> WebUI               : Enter email + OTP and click "Verify"
WebUI -> UserService         : Validate OTP for email
UserService -> EmailService  : Check OTP in cache
alt OTP invalid or expired
    EmailService --> UserService : Return "OTP invalid or expired"
    UserService --> WebUI        : Display error "Invalid OTP"
    WebUI --> Actor              : Show error message
else OTP valid
    EmailService --> UserService : Return "OTP valid"
    UserService --> WebUI        : Prompt for new password
end

== Reset Password ==
Actor -> WebUI               : Enter new password + confirm password
WebUI -> UserService         : Send newPassword, confirmPassword, email
UserService -> UserService   : Validate password format and match
alt Invalid format or mismatch
    UserService --> WebUI    : Return error "Invalid format or passwords do not match"
    WebUI --> Actor          : Show error message
else Valid passwords
    UserService -> Database   : Query User table by email
    Database --> UserService  : Return user record (or none)
    alt No user record found
        UserService --> WebUI : Return error "Email not registered"
        WebUI --> Actor       : Show error message
    else User record found
        UserService -> UserService : Hash new password
        UserService -> Database     : Update User table set password = hashed
        Database --> UserService    : Confirm update
        UserService --> WebUI       : Return success "Password reset successful"
        WebUI --> Actor             : Display success message
    end
end
@enduml
```