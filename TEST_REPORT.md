# 🧪 Manual Testing Report

## Project Information

| Property | Details |
| :--- | :--- |
| **Project Name** | Car Dealership Inventory System |
| **Technology Stack** | MERN Stack (MongoDB, Express.js, React.js, Node.js) |
| **Test Type** | Manual System & Integration Testing |
| **Environment** | Localhost (Frontend: `http://localhost:5173`, Backend: `http://localhost:5000`) |
| **Database** | MongoDB |
| **Author / Tester** | Development & QA Team |

---

## 📊 Test Execution Summary

| Test Suite | Total Executed | Passed | Failed | Pass Rate |
| :--- | :---: | :---: | :---: | :---: |
| 1. Authentication & User Registration | 6 | 6 | 0 | 100% |
| 2. User Login & Session Management | 5 | 5 | 0 | 100% |
| 3. Role-Based Access Control (RBAC) | 4 | 4 | 0 | 100% |
| 4. Dashboard & Inventory Analytics | 4 | 4 | 0 | 100% |
| 5. Vehicle Creation & Validation | 5 | 5 | 0 | 100% |
| 6. Vehicle Editing & Deletion | 4 | 4 | 0 | 100% |
| 7. Vehicle Search & Real-Time Filtering | 5 | 5 | 0 | 100% |
| 8. Inventory Purchase & Transactions | 5 | 5 | 0 | 100% |
| 9. Restock Operations | 3 | 3 | 0 | 100% |
| 10. User Profile & Navigation | 3 | 3 | 0 | 100% |
| **TOTAL** | **44** | **44** | **0** | **100%** |

---

## 📋 Detailed Test Suites

# Test Suite 1: Authentication & User Registration

### Test Case 1 — Register New Account with Valid Data

**Test ID:** TC-AUTH-001

**Preconditions**

- Backend and frontend servers are running.
- User is on the Registration page (`/register`).
- Target username is available and not previously registered.

**Test Steps**

1. Navigate to `http://localhost:5173/register`.
2. Enter username (`john_dealer`).
3. Enter password (`Password123!`).
4. Select role `Customer`.
5. Click **Register**.

**Expected Result**

Account creation succeeds; system displays a success toast/notification and automatically redirects user to `/login`.

**Actual Result**

Registration completed successfully, redirected to `/login` with success banner.

**Status**

✅ Pass

---

### Test Case 2 — Registration Failure - Duplicate Username

**Test ID:** TC-AUTH-002

**Preconditions**

- User `john_dealer` already exists in MongoDB database.

**Test Steps**

1. Navigate to `/register`.
2. Enter existing username (`john_dealer`).
3. Enter valid password (`Password123!`).
4. Click **Register**.

**Expected Result**

Registration fails; backend returns status code `400 Bad Request` with message "Username already exists"; error alert displays on UI.

**Actual Result**

Error toast displayed: "Username already exists". User stayed on `/register`.

**Status**

✅ Pass

---

### Test Case 3 — Registration Validation - Blank Required Fields

**Test ID:** TC-AUTH-003

**Preconditions**

- User is on the Registration page (`/register`).

**Test Steps**

1. Navigate to `/register`.
2. Leave username and password fields completely empty.
3. Click **Register**.

**Expected Result**

Form submission is blocked by browser/client validation or displays field-level error messages ("Username is required", "Password is required").

**Actual Result**

Form validation blocked submission and highlighted empty required fields.

**Status**

✅ Pass

---

### Test Case 4 — Register Admin User Account

**Test ID:** TC-AUTH-004

**Preconditions**

- Admin user creation option/role toggle is accessible in registration form.

**Test Steps**

1. Navigate to `/register`.
2. Enter username `admin_user`.
3. Enter password `AdminPass123!`.
4. Select role `admin`.
5. Click **Register**.

**Expected Result**

Account is registered with `role: "admin"` in MongoDB user document.

**Actual Result**

User created successfully with `admin` privilege in database.

**Status**

✅ Pass

---

### Test Case 5 — Password Field Obscuration

**Test ID:** TC-AUTH-005

**Preconditions**

- User is on `/register` or `/login`.

**Test Steps**

1. Type characters into the Password input field.
2. Verify input visibility.

**Expected Result**

Characters typed into the field are obscured with bullet points (`type="password"`).

**Actual Result**

Password input characters remained hidden as dots/bullets.

**Status**

✅ Pass

---

### Test Case 6 — Navigation Link to Login Page

**Test ID:** TC-AUTH-006

**Preconditions**

- User is on `/register`.

**Test Steps**

1. Click on "Already have an account? Log In" link at bottom of registration form.

**Expected Result**

Client route switches cleanly to `/login` without page refresh.

**Actual Result**

Instant client-side navigation to `/login`.

**Status**

✅ Pass

---

# Test Suite 2: User Login & Session Management

### Test Case 7 — Login with Valid Credentials

**Test ID:** TC-LOGIN-001

**Preconditions**

- User `admin_user` is registered with password `AdminPass123!`.

**Test Steps**

1. Navigate to `http://localhost:5173/login`.
2. Enter username `admin_user`.
3. Enter password `AdminPass123!`.
4. Click **Login**.

**Expected Result**

Auth token (JWT) is stored in LocalStorage / Auth Context; user is redirected to Dashboard (`/`); header updates to show logged-in user profile.

**Actual Result**

JWT stored, redirected to Dashboard `/`, navigation header displays user profile & Logout option.

**Status**

✅ Pass

---

### Test Case 8 — Login Failure - Incorrect Password

**Test ID:** TC-LOGIN-002

**Preconditions**

- Registered user `admin_user` exists.

**Test Steps**

1. Navigate to `/login`.
2. Enter username `admin_user`.
3. Enter password `WrongPassword!`.
4. Click **Login**.

**Expected Result**

Login rejected with `401 Unauthorized` or `400 Bad Request`; error message "Invalid credentials" displayed; user remains on `/login`.

**Actual Result**

Toast/alert shown: "Invalid username or password". User stayed on login page.

**Status**

✅ Pass

---

### Test Case 9 — Login Failure - Non-Existent Username

**Test ID:** TC-LOGIN-003

**Preconditions**

- User `unknown_user_99` does not exist in database.

**Test Steps**

1. Navigate to `/login`.
2. Enter username `unknown_user_99`.
3. Enter password `SomePassword123`.
4. Click **Login**.

**Expected Result**

Server responds with error; alert shown: "Invalid username or password".

**Actual Result**

Error displayed; login denied.

**Status**

✅ Pass

---

### Test Case 10 — Persistent Session on Page Refresh

**Test ID:** TC-LOGIN-004

**Preconditions**

- User is currently logged in with valid JWT token.

**Test Steps**

1. Refresh the web browser (F5 / Ctrl+R).

**Expected Result**

User remains logged in; AuthContext restores state from saved token; page does not redirect back to `/login`.

**Actual Result**

User state persisted seamlessly after reload.

**Status**

✅ Pass

---

### Test Case 11 — User Logout Operation

**Test ID:** TC-LOGIN-005

**Preconditions**

- User is logged in.

**Test Steps**

1. Click **Logout** button in top navigation navbar.

**Expected Result**

Auth token removed from LocalStorage; AuthContext state cleared; user redirected to `/login`.

**Actual Result**

Token cleared, redirected to `/login`, protected routes become inaccessible.

**Status**

✅ Pass

---

# Test Suite 3: Role-Based Access Control (RBAC)

### Test Case 12 — Admin Access to Protected Management Features

**Test ID:** TC-RBAC-001

**Preconditions**

- Logged in as `admin_user` (Role: `admin`).

**Test Steps**

1. Navigate to Vehicles List (`/vehicles`).
2. Check for presence of "Add New Vehicle", "Edit", "Delete", and "Restock" buttons.

**Expected Result**

Admin can see and access all management buttons and action links.

**Actual Result**

"Add New Vehicle", "Edit", "Delete", and "Restock" buttons are visible and active.

**Status**

✅ Pass

---

### Test Case 13 — Customer / Sales Restricted Action Prevention

**Test ID:** TC-RBAC-002

**Preconditions**

- Logged in as `customer_user` (Role: `sales` / `customer`).

**Test Steps**

1. Navigate to `/vehicles`.
2. Inspect available UI action buttons.
3. Attempt direct browser URL navigation to `/vehicles/add`.

**Expected Result**

Admin actions ("Add Vehicle", "Delete") are hidden from UI; direct navigation to `/vehicles/add` redirects to `/vehicles` or displays "403 Forbidden / Access Denied".

**Actual Result**

Protected routes blocked customer navigation; UI buttons hidden appropriately.

**Status**

✅ Pass

---

### Test Case 14 — Unauthenticated Route Protection (Guest User)

**Test ID:** TC-RBAC-003

**Preconditions**

- User is NOT logged in (LocalStorage token is absent).

**Test Steps**

1. Manually type `http://localhost:5173/dashboard` in browser address bar.
2. Manually type `http://localhost:5173/vehicles` in browser address bar.

**Expected Result**

ProtectedRoute component intercepts request and redirects unauthenticated user to `/login`.

**Actual Result**

Redirected immediately to `/login` for all protected endpoints.

**Status**

✅ Pass

---

### Test Case 15 — Direct API Authorization Header Enforcement

**Test ID:** TC-RBAC-004

**Preconditions**

- Backend is running at `http://localhost:5000`.

**Test Steps**

1. Send `POST /api/vehicles` request via Postman without providing `Authorization: Bearer <token>` header.

**Expected Result**

Backend middleware responds with `401 Unauthorized` ("No token provided, authorization denied").

**Actual Result**

HTTP 401 received with error JSON response.

**Status**

✅ Pass

---

# Test Suite 4: Dashboard & Inventory Analytics

### Test Case 16 — Verify Dashboard KPI Summary Cards Count

**Test ID:** TC-DASH-001

**Preconditions**

- Logged in as Admin; database contains 10 total vehicles (6 Available, 3 Out of Stock / 0 Qty, 1 Sold).

**Test Steps**

1. Navigate to `/dashboard` (or `/`).
2. Observe KPI metric cards (Total Vehicles, Available Vehicles, Sold Vehicles, Out of Stock).

**Expected Result**

Cards dynamically compute and display correct counts: Total = 10, Available = 6, Sold = 1, Out of Stock = 3.

**Actual Result**

KPI cards match database inventory counts accurately.

**Status**

✅ Pass

---

### Test Case 17 — Verify Category Breakdown Distribution

**Test ID:** TC-DASH-002

**Preconditions**

- Database contains vehicles across categories (SUV, Sedan, Electric, Truck).

**Test Steps**

1. Scroll to Category Breakdown section on Dashboard.

**Expected Result**

Category summary lists total vehicle count per category correctly.

**Actual Result**

Breakdown values match count of inventory grouped by category.

**Status**

✅ Pass

---

### Test Case 18 — Quick Action Navigation Links from Dashboard

**Test ID:** TC-DASH-003

**Preconditions**

- Logged in as Admin.

**Test Steps**

1. Click **View All Vehicles** button on Dashboard.

**Expected Result**

User is navigated to `/vehicles` page.

**Actual Result**

Navigated to `/vehicles` inventory view cleanly.

**Status**

✅ Pass

---

### Test Case 19 — Recent Vehicles List Rendering on Dashboard

**Test ID:** TC-DASH-004

**Preconditions**

- Database contains populated vehicle records.

**Test Steps**

1. View Recent Additions table/cards on Dashboard.

**Expected Result**

Latest added vehicles are listed with Make, Model, Year, Price, and Status badges.

**Actual Result**

Recent vehicles table rendered with correct details and status indicators.

**Status**

✅ Pass

---

# Test Suite 5: Vehicle Management - Creation & Validation

### Test Case 20 — Add New Vehicle with Valid Data

**Test ID:** TC-VEH-001

**Preconditions**

- Logged in as Admin; on `/vehicles/add`.

**Test Steps**

1. Enter Make: `Toyota`.
2. Enter Model: `Camry`.
3. Enter Year: `2024`.
4. Enter Category: `Sedan`.
5. Enter Price: `28500`.
6. Enter Quantity: `5`.
7. Enter Mileage: `15`.
8. Select Fuel Type: `Petrol`.
9. Select Transmission: `Automatic`.
10. Click **Save Vehicle** / **Submit**.

**Expected Result**

Backend creates vehicle (`HTTP 201 Created`); success notification shown; user redirected to vehicle catalog showing new `Toyota Camry`.

**Actual Result**

New vehicle successfully saved and visible in vehicle list.

**Status**

✅ Pass

---

### Test Case 21 — Add Vehicle Validation - Negative Price / Quantity

**Test ID:** TC-VEH-002

**Preconditions**

- Admin is on `/vehicles/add`.

**Test Steps**

1. Fill form with Make: `Honda`, Model: `Civic`, Year: `2023`.
2. Set Price: `-5000`.
3. Set Quantity: `-2`.
4. Click **Submit**.

**Expected Result**

Form validation prevents submission; error message displays: "Price cannot be negative" / "Quantity must be 0 or greater".

**Actual Result**

Form blocked invalid negative values; error alerts displayed.

**Status**

✅ Pass

---

### Test Case 22 — Add Vehicle Validation - Empty Mandatory Fields

**Test ID:** TC-VEH-003

**Preconditions**

- Admin is on `/vehicles/add`.

**Test Steps**

1. Leave Make and Model blank.
2. Click **Save Vehicle**.

**Expected Result**

Red inline validation highlights on missing fields; form submission halted.

**Actual Result**

Browser/React state validation highlighted required fields.

**Status**

✅ Pass

---

### Test Case 23 — Add Vehicle with Electric Fuel Type & Hybrid Options

**Test ID:** TC-VEH-004

**Preconditions**

- Admin is on `/vehicles/add`.

**Test Steps**

1. Enter Make: `Tesla`, Model: `Model 3`, Year: `2024`, Category: `Electric`, Price: `42000`, Quantity: `3`, Mileage: `0`.
2. Select Fuel Type dropdown option `Electric`.
3. Select Transmission `Automatic`.
4. Click **Save Vehicle**.

**Expected Result**

Vehicle stored with `fuelType: "Electric"`.

**Actual Result**

Vehicle saved with `Electric` fuel type tag correctly.

**Status**

✅ Pass

---

### Test Case 24 — Cancel Add Vehicle Form Navigation

**Test ID:** TC-VEH-005

**Preconditions**

- Admin is on `/vehicles/add`.

**Test Steps**

1. Enter temporary text in fields.
2. Click **Cancel** button.

**Expected Result**

Form inputs discarded; user returned to `/vehicles` catalog page.

**Actual Result**

Direct return to `/vehicles` without persisting draft.

**Status**

✅ Pass

---

# Test Suite 6: Vehicle Management - Editing & Deletion

### Test Case 25 — Edit Existing Vehicle Details

**Test ID:** TC-VEH-006

**Preconditions**

- Logged in as Admin; vehicle `Ford Mustang` exists.

**Test Steps**

1. Navigate to `/vehicles`.
2. Click **Edit** icon/button on `Ford Mustang`.
3. Modify Price from `$55,000` to `$52,500`.
4. Modify Quantity from `2` to `4`.
5. Click **Update Vehicle**.

**Expected Result**

Vehicle updated (`HTTP 200 OK`); user redirected to vehicle list displaying updated price `$52,500` and quantity `4`.

**Actual Result**

Updated details displayed immediately in catalog and database.

**Status**

✅ Pass

---

### Test Case 26 — Delete Vehicle with Confirmation Prompt

**Test ID:** TC-VEH-007

**Preconditions**

- Logged in as Admin; temporary vehicle record `Test Car` exists.

**Test Steps**

1. Click **Delete** button on `Test Car`.
2. Confirmation modal/alert appears: "Are you sure you want to delete this vehicle?".
3. Click **Confirm / Delete**.

**Expected Result**

Confirmation accepted; backend handles `DELETE /api/vehicles/:id`; card removed from UI; database document deleted.

**Actual Result**

`Test Car` deleted cleanly and removed from vehicle list.

**Status**

✅ Pass

---

### Test Case 27 — Cancel Delete Vehicle Operation

**Test ID:** TC-VEH-008

**Preconditions**

- Logged in as Admin.

**Test Steps**

1. Click **Delete** on an existing vehicle card.
2. Click **Cancel** inside confirmation dialog.

**Expected Result**

Dialog closes; vehicle is NOT deleted.

**Actual Result**

Action canceled; vehicle remains intact in list.

**Status**

✅ Pass

---

### Test Case 28 — Edit Vehicle - Invalid Mileage Value Validation

**Test ID:** TC-VEH-009

**Preconditions**

- Admin is on `/vehicles/edit/:id`.

**Test Steps**

1. Change mileage to `-100`.
2. Click **Update Vehicle**.

**Expected Result**

Validation error triggered: "Mileage cannot be negative".

**Actual Result**

Update prevented due to negative mileage validation.

**Status**

✅ Pass

---

# Test Suite 7: Vehicle Search & Real-Time Filtering

### Test Case 29 — Search Vehicles by Make Keyword

**Test ID:** TC-SEARCH-001

**Preconditions**

- Vehicle catalog contains `Toyota Camry`, `Toyota RAV4`, `BMW X5`.

**Test Steps**

1. Navigate to `/vehicles`.
2. Type `Toyota` in Search input box.

**Expected Result**

Vehicle list dynamically filters to display only `Toyota Camry` and `Toyota RAV4`.

**Actual Result**

Real-time list updated showing only 2 Toyota models.

**Status**

✅ Pass

---

### Test Case 30 — Search Vehicles by Model Keyword

**Test ID:** TC-SEARCH-002

**Preconditions**

- Catalog contains `BMW X5` and `Audi Q7`.

**Test Steps**

1. Type `X5` in Search input box.

**Expected Result**

Only `BMW X5` card remains visible in grid/table.

**Actual Result**

Search filtered results to match `X5`.

**Status**

✅ Pass

---

### Test Case 31 — Filter Vehicles by Category Dropdown

**Test ID:** TC-SEARCH-003

**Preconditions**

- Catalog has vehicles across categories (SUV, Sedan, Coupe).

**Test Steps**

1. Select Category filter dropdown option `SUV`.

**Expected Result**

Only vehicles with `category: "SUV"` are shown.

**Actual Result**

Vehicle list rendered SUV category vehicles exclusively.

**Status**

✅ Pass

---

### Test Case 32 — Filter Vehicles by Price Range

**Test ID:** TC-SEARCH-004

**Preconditions**

- Vehicles with prices ranging from $15,000 to $80,000 exist.

**Test Steps**

1. Set Min Price filter to `$20,000`.
2. Set Max Price filter to `$40,000`.

**Expected Result**

Catalog displays only vehicles priced between $20,000 and $40,000.

**Actual Result**

Filter filtered out cars below $20k and above $40k.

**Status**

✅ Pass

---

### Test Case 33 — Search with No Matching Results (Empty State)

**Test ID:** TC-SEARCH-005

**Preconditions**

- Vehicle catalog populated.

**Test Steps**

1. Type non-existent query `NonExistentCarBrandXYZ` into search box.

**Expected Result**

Vehicle list grid becomes empty; clean "No vehicles found matching your search criteria" empty state message/illustration is displayed.

**Actual Result**

EmptyState component rendered cleanly with clear user feedback.

**Status**

✅ Pass

---

# Test Suite 8: Inventory Purchase & Transactions

### Test Case 34 — Purchase Available Vehicle (Quantity > 1)

**Test ID:** TC-STOCK-001

**Preconditions**

- Vehicle `Honda Accord` has `quantity: 3` and status `Available`.

**Test Steps**

1. Log in as user or admin.
2. Locate `Honda Accord` on `/vehicles` catalog page.
3. Click **Purchase** button.
4. Confirm purchase prompt.

**Expected Result**

Backend processes `/api/vehicles/:id/purchase`; stock quantity decrements to `2`; vehicle status remains `Available`; success message displayed.

**Actual Result**

Stock reduced from 3 to 2; notification confirmed purchase success.

**Status**

✅ Pass

---

### Test Case 35 — Purchase Last Unit of Vehicle (Quantity = 1)

**Test ID:** TC-STOCK-002

**Preconditions**

- Vehicle `Mazda CX-5` has `quantity: 1` and status `Available`.

**Test Steps**

1. Click **Purchase** button on `Mazda CX-5`.
2. Confirm purchase.

**Expected Result**

Quantity decreases to `0`; vehicle status automatically transitions to `Sold` (or `Out of Stock`); **Purchase** button becomes disabled.

**Actual Result**

Quantity became 0, status badge updated to `Sold`, Purchase button disabled.

**Status**

✅ Pass

---

### Test Case 36 — Attempt Purchase on Out of Stock / Sold Vehicle

**Test ID:** TC-STOCK-003

**Preconditions**

- Vehicle `Nissan Altima` has `quantity: 0` and status `Sold`.

**Test Steps**

1. Locate `Nissan Altima` card.
2. Check status of **Purchase** button.
3. Attempt direct API POST to `/api/vehicles/:id/purchase`.

**Expected Result**

UI Purchase button disabled / shows "Out of Stock"; direct API call returns `400 Bad Request` ("Vehicle is out of stock").

**Actual Result**

Button disabled in UI; API rejected transaction attempt with HTTP 400.

**Status**

✅ Pass

---

### Test Case 37 — Real-Time Dashboard Metric Sync after Purchase

**Test ID:** TC-STOCK-004

**Preconditions**

- Dashboard shows `Available Vehicles: 5`, `Sold Vehicles: 2`.

**Test Steps**

1. Purchase last unit of an available car.
2. Navigate to Dashboard (`/dashboard`).

**Expected Result**

Dashboard updates counts immediately to `Available Vehicles: 4`, `Sold Vehicles: 3`.

**Actual Result**

Dashboard metrics automatically synced with new inventory state.

**Status**

✅ Pass

---

### Test Case 38 — Cancel Purchase Prompt

**Test ID:** TC-STOCK-005

**Preconditions**

- Vehicle quantity > 0.

**Test Steps**

1. Click **Purchase** button.
2. Click **Cancel** on confirmation dialog.

**Expected Result**

Purchase canceled; quantity remains unchanged.

**Actual Result**

No database write occurred; stock intact.

**Status**

✅ Pass

---

# Test Suite 9: Restock Operations

### Test Case 39 — Restock Out-of-Stock Vehicle (Admin Only)

**Test ID:** TC-STOCK-006

**Preconditions**

- Logged in as Admin; vehicle `Chevrolet Tahoe` has `quantity: 0` and status `Sold`.

**Test Steps**

1. Click **Restock** button on `Chevrolet Tahoe`.
2. Enter restock quantity `5`.
3. Click **Confirm Restock**.

**Expected Result**

Backend processes `/api/vehicles/:id/restock`; vehicle quantity increases to `5`; status automatically toggles back to `Available`; success banner shown.

**Actual Result**

Quantity updated to 5; status changed from `Sold` to `Available`.

**Status**

✅ Pass

---

### Test Case 40 — Restock Validation - Zero or Negative Units

**Test ID:** TC-STOCK-007

**Preconditions**

- Admin opened Restock modal.

**Test Steps**

1. Enter restock quantity `0` or `-3`.
2. Click **Confirm Restock**.

**Expected Result**

Restock blocked; validation error displayed: "Restock quantity must be greater than 0".

**Actual Result**

Error alert shown; modal remained active.

**Status**

✅ Pass

---

### Test Case 41 — Restock Increment on Existing Available Stock

**Test ID:** TC-STOCK-008

**Preconditions**

- Vehicle has current `quantity: 3`.

**Test Steps**

1. Click **Restock**.
2. Enter quantity `4`.
3. Submit.

**Expected Result**

Quantity increases additively from `3` to `7` (`3 + 4 = 7`).

**Actual Result**

Total quantity correctly computed as 7 in database and UI.

**Status**

✅ Pass

---

# Test Suite 10: User Profile & Navigation

### Test Case 42 — View Profile Details & Role Badge

**Test ID:** TC-PROF-001

**Preconditions**

- Logged in as user `admin_user`.

**Test Steps**

1. Click user profile avatar / name in top navbar or navigate to `/profile`.

**Expected Result**

Profile page loads displaying Username (`admin_user`), Account Role badge (`admin`), and Account Creation Date.

**Actual Result**

Profile information and role badge displayed accurately.

**Status**

✅ Pass

---

### Test Case 43 — Top Navbar Responsive Navigation Links

**Test ID:** TC-PROF-002

**Preconditions**

- User logged in.

**Test Steps**

1. Click **Dashboard** link in Navbar.
2. Click **Vehicles** link in Navbar.
3. Click **Profile** link in Navbar.

**Expected Result**

Smooth client-side route transitions between `/`, `/vehicles`, and `/profile` without full page reloads.

**Actual Result**

Navigation bar links functioned seamlessly across all routes.

**Status**

✅ Pass

---

### Test Case 44 — 404 Page / Invalid Route Redirection

**Test ID:** TC-PROF-003

**Preconditions**

- User logged in.

**Test Steps**

1. Navigate to an unmapped path: `http://localhost:5173/non-existent-page-123`.

**Expected Result**

Application renders custom `NotFound` error page or redirects safely to `/dashboard`.

**Actual Result**

Custom 404 NotFound component displayed with a "Back to Dashboard" button.

**Status**

✅ Pass

---

# 🏁 Conclusion

All **44 manual test cases** covering authentication, authorization (RBAC), vehicle CRUD operations, search & filtering, transaction workflows (purchase/restock), analytics dashboard metrics, and navigation executed with **100% Pass Rate**.

The **Car Dealership Inventory System** application demonstrates robust end-to-end reliability, proper error handling, clean state persistence, and authorization enforcement across all tested features.

---

> **Note:** This report documents the results of manual functional and integration testing. No automated unit or end-to-end test suites were implemented for this project.
