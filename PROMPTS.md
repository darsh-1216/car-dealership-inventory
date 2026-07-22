# PROMPTS.md

## Session 1 - Backend Project Setup

### User Prompt
Help me set up the backend for a Car Dealership Inventory Management System using Node.js and Express. I want a clean project structure so I can start building the API.

### AI Assistance
- Suggested the initial backend folder structure.
- Configured the Express application.
- Separated `app.js` and `server.js`.
- Helped verify the project setup.

### Outcome
- Backend project initialized.
- Express application configured.
- Ready to start API development.

---

## Session 2 - User Registration (RED)

### User Prompt
I'm starting with the registration feature.

Can you create an integration test for `POST /api/auth/register` using Jest and Supertest?

For now, only add the test so it fails before any implementation exists.

### AI Assistance
- Added an integration test for user registration.
- Verified the endpoint was not implemented.
- Confirmed the test failed as expected.

### Outcome
- Registration integration test created.
- RED phase completed.

---

## Session 3 - User Registration (GREEN)

### User Prompt
The registration test is failing.

Can you implement the minimum code required to make the test pass using the existing Express application?

### AI Assistance
- Implemented the registration endpoint.
- Added simple in-memory user storage.
- Returned the expected success response.

### Outcome
- Registration endpoint implemented.
- All tests passed.
- GREEN phase completed.

---

## Session 4 - Duplicate Email Registration (RED)

### User Prompt
I'd like to cover another registration scenario.

Can you add an integration test to verify that registering with an existing email returns the expected error?

For now, only add the test.

### AI Assistance
- Added a failing integration test.
- Expected HTTP 409 Conflict.
- Verified the test failed before implementation.

### Outcome
- Duplicate email test created.
- RED phase completed.

---

## Session 5 - Duplicate Email Registration (GREEN)

### User Prompt
The duplicate registration test is failing.

Can you update the existing registration endpoint so users cannot register with an email that already exists?

Reuse the current in-memory user storage.

### AI Assistance
- Reused the existing in-memory users array.
- Prevented duplicate registrations.
- Returned the expected error response.

### Outcome
- Duplicate email validation implemented.
- All tests passed.
- GREEN phase completed.

---

## Session 6 - User Login (RED)

### User Prompt
Let's move on to login.

Can you add an integration test for `POST /api/auth/login` using a previously registered user?

For now, only add the test.

### AI Assistance
- Added an integration test for user login.
- Verified the endpoint was not implemented.
- Confirmed the test failed.

### Outcome
- Login integration test created.
- RED phase completed.

---

## Session 7 - User Login (GREEN)

### User Prompt
The login test is failing.

Can you implement the minimum code required to make the login test pass using the existing in-memory user storage?

### AI Assistance
- Implemented the login endpoint.
- Reused the registered users.
- Returned the expected success response.

### Outcome
- Login endpoint implemented.
- All tests passed.
- GREEN phase completed.

---

## Session 8 - Login with Unregistered Email (RED)

### User Prompt
Can you add an integration test for a login attempt using an email that hasn't been registered?

For now, only add the test.

### AI Assistance
- Added a failing integration test.
- Expected HTTP 401 Unauthorized.
- Verified the test failed before implementation.

### Outcome
- Invalid login integration test created.
- RED phase completed.

---

## Session 9 - Login with Unregistered Email (GREEN)

### User Prompt
The invalid login test is failing.

Can you update the existing login endpoint so an unknown email returns the expected authentication error?

Reuse the existing in-memory user storage and make only the minimum changes required.

### AI Assistance
- Updated the login endpoint.
- Reused the existing in-memory users.
- Returned a generic authentication error.

### Outcome
- Login rejects unregistered email.
- All tests passed.
- GREEN phase completed.

---

## Session 10 - Login with Incorrect Password

### User Prompt
Can you add an integration test for a login attempt with a registered email but an incorrect password?

For now, only add the integration test.

### AI Assistance
- Added an integration test for login with an incorrect password.
- Verified the existing login implementation already handled this scenario.
- Confirmed the API returns a generic authentication error for invalid credentials.

### Outcome
- Login returns **401 Unauthorized** for incorrect passwords.
- All tests passed successfully.
- No changes to the login implementation were required because the existing feature already satisfied this behavior.

---

## Session 11 - Login Validation (RED)

### User Prompt
I'd like to validate the login request before attempting authentication.

Can you add integration tests for login requests with a missing email and a missing password?

For now, only add the integration tests.

### AI Assistance
- Added integration tests for missing email and missing password.
- Expected HTTP 400 Bad Request for both scenarios.
- Verified the tests failed before implementation.

### Outcome
- Login validation integration tests created.
- RED phase completed.

---

## Session 12 - Login Validation (GREEN)

### User Prompt
The login validation integration tests are failing.

Can you update the existing login endpoint so it validates the request before authentication?

If either the email or password is missing, return HTTP 400 with the appropriate error message.

Keep the existing authentication logic unchanged.

### AI Assistance
- Added request validation to the login endpoint.
- Checked that both email and password are present before authentication.
- Preserved the existing authentication flow for valid requests.

### Outcome
- Login returns **400 Bad Request** when required credentials are missing.
- Existing authentication behavior remains unchanged.
- All tests passed successfully.
- GREEN phase completed.

---

## Session 13 - Registration Validation (RED)

### User Prompt
I'd like to validate the registration request before creating a new user.

Can you add integration tests for registration requests with a missing email and a missing password?

For now, only add the integration tests.

### AI Assistance
- Added integration tests for missing email and missing password.
- Expected HTTP 400 Bad Request for both scenarios.
- Verified the tests failed before implementation.

### Outcome
- Registration validation integration tests created.
- RED phase completed.

---

## Session 14 - Registration Validation (GREEN)

### User Prompt
The registration validation integration tests are failing.

Can you update the existing registration endpoint so it validates the request before checking for duplicate users or creating a new user?

If either the email or password is missing, return HTTP 400 with the appropriate error message.

Keep the existing registration logic unchanged.

### AI Assistance
- Added request validation before duplicate email checks.
- Verified that both email and password are present before user creation.
- Preserved the existing registration flow for valid requests.

### Outcome
- Registration returns **400 Bad Request** when required credentials are missing.
- Existing registration behavior remains unchanged.
- All tests passed successfully.
- GREEN phase completed.