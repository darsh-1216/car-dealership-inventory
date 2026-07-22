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

---

## Session 15 - JWT Response (RED)

### User Prompt
Create a new integration test to verify JWT generation after a successful login.

Do not modify any existing authentication tests.

Requirements:
- Create a separate integration test file for JWT authentication.
- Register a user before attempting login.
- Verify that a successful login returns HTTP 200.
- Verify that the response contains the existing success message.
- Verify that the response includes a `token` property.
- Verify that the token is a non-empty string.
- Do not implement JWT generation yet.
- The goal is only to introduce a failing integration test.

### AI Assistance
- Created a separate JWT integration test file.
- Added a failing test to verify JWT generation after successful login.
- Kept all existing authentication tests unchanged.
- Confirmed that the new test failed because JWT generation was not yet implemented.

### Outcome
- JWT integration test added successfully.
- Existing authentication tests remained unchanged.
- The new JWT test failed as expected.
- RED phase completed.

---

## Session 16 - JWT Generation on Successful Login (GREEN)

### User Prompt
The JWT login integration test is currently failing.

Please implement the minimum changes required so that all tests pass.

Requirements:
- Use the `jsonwebtoken` package.
- Generate a JWT after successful authentication.
- Include the authenticated user's email in the token payload.
- Set the token expiration to 1 hour.
- Return the generated token along with the existing success response.
- Preserve the existing registration, login, and validation behavior.
- Do not introduce MongoDB, bcrypt, controllers, services, routes, middleware, or environment variables.
- Make only the minimum changes required for the JWT integration test to pass.

### AI Assistance
- Added JWT generation using the `jsonwebtoken` package.
- Generated a token containing the authenticated user's email.
- Configured the token to expire after one hour.
- Returned the JWT token along with the existing success response.
- Preserved the existing authentication and validation flow.
- Updated the existing login success test to reflect the new API response contract while keeping JWT-specific assertions in a dedicated test file.

### Outcome
- Successful login now returns a valid JWT token.
- Existing authentication logic remains unchanged.
- Login validation and error handling continue to work as before.
- All tests passed successfully.
- GREEN phase completed.

---

## Session 17 - Authentication Module Refactoring

### User Prompt

The authentication feature is now complete, and all the existing integration tests are passing successfully.

At this point, the `app.js` file has started becoming too large because it contains both the route definitions and all the authentication logic. Before moving on to MongoDB integration in the next TDD cycle, I want to improve the project structure without changing the application's behavior.

Please refactor the existing authentication module by separating the authentication routes and controller logic.

Requirements:
- Move the registration and login logic into a dedicated authentication controller.
- Move the authentication routes into a dedicated routes file.
- Update `app.js` so it only creates the Express application, applies middleware, mounts the authentication routes, keeps the existing health check endpoint, and exports the app.
- Preserve all existing functionality, validation logic, JWT generation, response messages, and status codes.
- Continue using the existing in-memory users array.
- Do not modify any existing tests.
- Do not introduce MongoDB, Mongoose, services, middleware, models, environment variables, utility files, or any additional project structure.
- This is a pure refactoring task, so all existing tests should continue passing without modification.

### AI Assistance

- Extracted the authentication routes into a dedicated routing module.
- Moved the registration and login logic into a dedicated authentication controller.
- Updated `app.js` to mount the authentication routes while preserving the existing application behavior.
- Ensured that all existing validations, JWT generation, response messages, and status codes remained unchanged.
- Verified that the refactoring did not affect any existing integration tests.

### Outcome

- Authentication responsibilities are now separated into routes and controllers.
- The project structure is cleaner and easier to extend.
- Application behavior remains unchanged.
- All existing integration tests passed successfully.
- Refactoring completed.

---

## Session 18 - JWT Verification Middleware (RED Phase)

### User Prompt

The authentication module has been successfully refactored, and all existing integration tests are passing successfully.

Now I want to begin the next feature by following the RED phase of Test-Driven Development (TDD).

Requirements:
- Create a new integration test file for JWT verification middleware.
- Add tests for:
  - Returning 401 when no Authorization header is provided.
  - Returning 401 when an invalid JWT is provided.
  - Returning 200 when a valid JWT is provided.
- Obtain the valid JWT by registering a user and logging in during the test.
- Do not implement the middleware or protected route yet.
- Do not modify any existing tests.
- The new tests should fail initially.

### AI Assistance

- Created a dedicated integration test file for JWT verification middleware.
- Added integration tests for missing Authorization header, invalid JWT, and valid JWT authentication.
- Used the existing registration and login flow to obtain a valid JWT during testing.
- Ensured no application code was modified during the RED phase.

### Outcome

- JWT verification integration tests were successfully created.
- The tests failed as expected because the middleware and protected route were not yet implemented.
- RED phase completed successfully.

---

## Session 19 - JWT Verification Middleware (GREEN Phase)

### User Prompt

The JWT verification integration tests have been created and are currently failing as expected.

Now complete the GREEN phase of Test-Driven Development (TDD).

Requirements:
- Implement a dedicated JWT authentication middleware.
- Validate the Authorization header using the Bearer token format.
- Verify the JWT using the existing secret.
- Return 401 with the existing response message when authentication fails.
- Create a protected route that is accessible only with a valid JWT.
- Mount the protected route in the application.
- Preserve all existing authentication functionality, validation logic, JWT generation, response messages, and status codes.
- Do not modify any existing tests.
- Ensure all integration tests pass successfully.

### AI Assistance

- Implemented a dedicated JWT authentication middleware.
- Added a protected route secured by the middleware.
- Updated the application routing to expose the protected endpoint.
- Preserved the existing authentication flow, validations, JWT generation, response messages, and status codes.
- Verified that all existing and newly added integration tests passed successfully.

### Outcome

- JWT verification middleware successfully protects authenticated routes.
- Protected endpoints now require a valid Bearer token.
- Existing authentication functionality remained unchanged.
- All integration tests passed successfully.
- GREEN phase completed successfully.

---

## Session 20 - Vehicle Creation (RED Phase)

### User Prompt

The authentication system and JWT verification middleware have already been completed.

We are now starting the Vehicle module following strict Test-Driven Development (TDD).

Requirements:
- Create failing integration tests for POST /api/vehicles.
- The endpoint must require JWT authentication.
- Test unauthorized access, invalid JWT, successful vehicle creation, and required field validation.
- A vehicle must contain make, model, category, price, and quantity.
- Reuse the existing authentication flow to obtain a valid JWT.
- Do not implement the feature.
- Do not modify any existing authentication or JWT tests.

### AI Assistance

- Created a new integration test suite for vehicle creation.
- Added authentication and validation test cases.
- Reused the existing authentication flow for protected endpoint testing.
- Preserved all existing functionality without implementing the feature.

### Outcome

- Vehicle creation tests failed as expected.
- RED phase completed successfully.

---

## Session 21 - Vehicle Creation (GREEN Phase)

### User Prompt

The vehicle creation tests have been completed and are currently failing as expected.

Now complete the GREEN phase of Test-Driven Development (TDD).

Requirements:
- Implement POST /api/vehicles.
- Protect the endpoint using the existing JWT authentication middleware.
- Store vehicles using in-memory storage.
- Validate all required fields.
- Return existing response messages and status codes.
- Do not implement any additional vehicle features.
- Do not modify any existing authentication or JWT functionality.
- Ensure all tests pass successfully.

### AI Assistance

- Implemented the vehicle creation controller.
- Added the vehicle route protected by the existing JWT middleware.
- Registered the route in the application.
- Added in-memory vehicle storage and validation.
- Preserved existing authentication functionality and response behavior.

### Outcome

- Authenticated users can successfully create vehicles.
- Validation rules work as expected.
- Existing functionality remained unchanged.
- All integration tests passed successfully.
- GREEN phase completed successfully.

---

## Session 22 - Vehicle Creation (REFACTOR Phase)

### User Prompt

All vehicle creation tests are passing.

Now complete the REFACTOR phase of Test-Driven Development (TDD).

Requirements:
- Improve code organization without changing application behavior.
- Move the in-memory vehicle storage into a dedicated module.
- Preserve all existing functionality, API responses, validation messages, and tests.
- Do not add any new features.

### AI Assistance

- Extracted the shared in-memory vehicle storage into a dedicated data module.
- Updated the controller to use the shared storage module.
- Improved code organization while preserving behavior.
- Verified that all existing tests continued to pass.

### Outcome

- Vehicle storage is now organized in a reusable module.
- Application behavior remained unchanged.
- All integration tests passed successfully.
- REFACTOR phase completed successfully.

---

## Session 23 - Vehicle Retrieval (RED Phase)

### User Prompt
Implement the RED phase for GET /api/vehicles by writing failing integration tests. Cover unauthorized access, invalid JWT, returning an empty array when no vehicles exist, and returning all created vehicles for an authenticated user. Reuse the existing authentication flow and POST /api/vehicles endpoint. Do not implement any application code.

### AI Assistance
Generated failing integration tests for the vehicle retrieval endpoint covering authentication, empty inventory, and successful retrieval scenarios while keeping the implementation unchanged.

### Outcome
Successfully completed the RED phase by creating failing integration tests for the GET /api/vehicles endpoint.

---

## Session 24 - Vehicle Retrieval (GREEN Phase)

### User Prompt
Implement the GREEN phase for GET /api/vehicles using the existing controller structure and in-memory vehicle array. Protect the route with the existing JWT authentication middleware and return HTTP 200 with all available vehicles. Do not refactor existing code or add extra functionality.

### AI Assistance
Implemented the minimum route and controller changes required to satisfy all vehicle retrieval tests while preserving the existing application structure.

### Outcome
Successfully completed the GREEN phase with all vehicle retrieval tests passing.

---

## Session 25 - Vehicle Retrieval (REFACTOR Phase)

### User Prompt
Refactor the vehicle retrieval tests by removing duplicated helper functions and shared test data without changing application behavior. Keep all existing test cases intact and ensure the entire test suite continues to pass.

### AI Assistance
Improved the test code by moving the shared vehicle object and authentication helper functions outside the individual test suites, reducing duplication and improving readability.

### Outcome
Successfully completed the REFACTOR phase while preserving functionality and maintaining a fully passing test suite.

---

## Session 26 - Vehicle Search (RED)

### User Prompt

Create failing tests for a protected `GET /api/vehicles/search` endpoint following the RED phase of TDD.

Requirements:
- Protect the endpoint using the existing JWT middleware.
- Add tests for missing and invalid JWT.
- Test empty search results.
- Test filtering by `make`.
- Test filtering by `category`.
- Test filtering using both `make` and `category`.
- Reuse the existing vehicle creation endpoint to prepare test data.
- Do not implement the endpoint or modify existing functionality.

### AI Assistance

- Added a new test suite for `GET /api/vehicles/search`.
- Covered authentication failure scenarios.
- Added tests for empty results and search filtering.
- Reused the existing vehicle creation endpoint for test setup.
- Left the implementation unchanged to keep the tests failing.

### Outcome

Created a complete failing test suite for vehicle search. Existing functionality remained unchanged, and the new tests failed as expected, completing the RED phase.

---

## Session 27 - Vehicle Search (GREEN)

### User Prompt

Implement the minimum code required to make all `GET /api/vehicles/search` tests pass.

Requirements:
- Protect the endpoint using the existing JWT middleware.
- Read `make` and `category` from query parameters.
- Return matching vehicles from the in-memory collection.
- Return an empty array when no vehicles match.
- Do not refactor existing code or add extra features.

### AI Assistance

- Added the protected search route.
- Implemented the `searchVehicles` controller.
- Filtered vehicles using `make` and `category`.
- Returned the filtered results with HTTP 200.
- Kept the implementation minimal.

### Outcome

Successfully implemented the vehicle search endpoint with the minimum required logic. All search tests passed without introducing additional functionality.

---

## Session 28 - Vehicle Search (REFACTOR)

### User Prompt

Refactor the vehicle search implementation without changing its behavior.

Requirements:
- Improve readability.
- Reduce duplicated validation logic where appropriate.
- Keep all existing tests passing.
- Do not add new features or modify endpoint behavior.

### AI Assistance

- Extracted vehicle validation into a reusable helper function.
- Centralized validation error messages.
- Simplified the vehicle creation controller.
- Preserved the existing search implementation and functionality.

### Outcome

Improved code organization and reduced duplication while preserving application behavior. All tests continued to pass after refactoring.

---

## Session 29 - Vehicle Update (RED)

### User Prompt

I want to implement the `PUT /api/vehicles/:id` endpoint using the Test-Driven Development (TDD) approach.

Start with the RED phase by writing Jest test cases only. Do not implement the production code yet.

The test suite should cover:
- Returning **401 Unauthorized** when the Authorization header is missing.
- Returning **401 Unauthorized** when the provided JWT is invalid.
- Returning **404 Not Found** when the requested vehicle ID does not exist.
- Returning **200 OK** when an authenticated user successfully updates an existing vehicle.

Follow the existing project structure, reuse the current authentication flow, and keep all previously implemented tests passing. The newly added tests should fail because the endpoint has not been implemented yet.

### AI Assistance

- Designed the complete test suite for the vehicle update endpoint before writing any production code.
- Covered authentication, authorization, resource existence, and successful update scenarios.
- Followed the Test-Driven Development (TDD) workflow by intentionally keeping the implementation absent.
- Ensured the new tests integrated with the existing Jest test structure.

### Outcome

Successfully completed the RED phase by adding failing test cases for the vehicle update endpoint. Existing tests continued to pass while the newly added update endpoint tests failed as expected.

---

## Session 30 - Vehicle Update (GREEN)

### User Prompt

Implement the `PUT /api/vehicles/:id` endpoint so that all previously written RED phase tests pass.

Reuse the existing vehicle validation helper instead of duplicating validation logic. Find the requested vehicle using the provided ID and return **404 Not Found** if it does not exist.

When a valid vehicle is found, update all editable fields (`make`, `model`, `category`, `price`, and `quantity`) and return the updated vehicle in the response.

Keep the existing project structure unchanged, follow the current coding style, and ensure that every previously implemented test continues to pass.

### AI Assistance

- Implemented the vehicle update endpoint according to the RED phase requirements.
- Reused the shared validation helper to avoid duplicate validation logic.
- Added vehicle lookup by ID with proper `404 Not Found` handling.
- Updated all editable vehicle fields and returned the updated vehicle object.
- Preserved compatibility with the existing in-memory data store and project architecture.

### Outcome

Successfully completed the GREEN phase for the vehicle update endpoint. All vehicle update tests passed along with the existing authentication, vehicle creation, listing, and search tests, resulting in **35/35 passing tests**.

---

