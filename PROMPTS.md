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