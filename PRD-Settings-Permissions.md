# PRD: Settings - Team & Permissions Tab

## MVP Scope
This PRD applies to **Settings → Team** (MVP).

## Overview
The Team & Permissions tab enables administrators to manage team user access to the platform, assign roles, invite new team users, and delete a team user account (MVP). The tab provides a comprehensive view of team composition, role-based permissions, and invitation capabilities.

## Objectives
- Display all team users with their roles and permissions
- Enable role assignment and updates for existing team users
- Allow invitation of new team users via email
- Provide visibility into team statistics (total members, admins, invite rights)
- Manage permission-based access control

## Tab Header

### Header Section
- **Icon**: 🛡️
- **Title**: "Team & Permissions"
- **Subtitle**: "Control who can access the platform, manage roles, and invite new team users."
- **Location**: Top of tab content area

## Statistics Cards

### Statistics Overview
- **Location**: Top of settings card content, below card header
- **Purpose**: Provide quick visibility into team composition and permissions

### Team Users Card
- **Label**: "Team users"
- **Value**: Total count of all team users

### Admins Card
- **Label**: "Admins"
- **Value**: Count of team users with Admin role

### Invite Rights Card
- **Label**: "Invite rights"
- **Value**: Count of team users who can invite other users (Admins and Managers, but not Viewers)

### Statistics Behavior
- Statistics update automatically when team users are added, deleted, or roles are changed
- Statistics are calculated in real-time based on current team composition

## Settings Card Structure

### Main Card Container
- **Layout**: Spans full width of content area
- **Purpose**: Contains all permissions management functionality

### Card Header
- **Icon**: 👥
- **Title**: "Manage Permissions"

### Card Content Sections
1. Statistics cards (top section)
2. Permissions list (middle section)
3. Invite form (bottom section)

## Team Users List

### Permissions List Display
- **Layout**: Vertical list of team user items
- **Purpose**: Display all team users with their information and controls

### Team User Item Structure
Each team user item contains:
1. Member Info Block (left side) - displays team user information
2. Member Controls (right side) - allows role management

#### Member Info Block

**Member Avatar**:
- **Display**: Avatar showing user initials
- **Generation**: Initials are automatically generated from the user’s full name
- **Logic**: 
  - Split name by spaces
  - Take first letter of each name part
  - Use first 2 characters
  - Display in uppercase
- **Example**: "Sophie Liang" displays as "SL"

**Member Information**:
- **Name**: Member's full name (displayed prominently)
- **Email**: Member's email address
- **Role Badge**: Shows user’s current role (Admin, Manager, or Viewer)
- **Invite Badge**: 
  - Shows "Can invite" if user has invite permissions (Admin or Manager)
  - Shows "View only" if user cannot invite (Viewer)

#### Member Controls

**Role Selection**:
- **Label**: "Role"
- **Control Type**: Dropdown select
- **Options**:
  - Admin
  - Manager
  - Viewer
- **Behavior**: Selecting a new role immediately updates the user’s role
- **Result**: 
  - Member's role badge updates
  - Invite badge updates based on new role
  - Statistics cards recalculate if counts change

### Role-Based Permissions

#### Admin Role
- **Capabilities**: Full access to all platform features
- **Invite Rights**: Can invite new team users
- **Display**: Role badge shows "Admin", invite badge shows "Can invite"

#### Manager Role
- **Capabilities**: Access to most platform features (may have some limitations compared to Admin)
- **Invite Rights**: Can invite new team users
- **Display**: Role badge shows "Manager", invite badge shows "Can invite"

#### Viewer Role
- **Capabilities**: Read-only access to platform features
- **Invite Rights**: Cannot invite new team users
- **Display**: Role badge shows "Viewer", invite badge shows "View only"

### Role Update Business Rules
- When a user’s role is changed, their invite permissions automatically update:
  - Admin or Manager roles → Can invite
  - Viewer role → Cannot invite
- Statistics automatically recalculate when roles change:
  - Admin count updates if Admin role is added/removed
  - Invite rights count updates if invite capability changes
- Role changes take effect immediately in the UI

## Invite Team Member Form

### Form Location
- **Position**: Bottom of settings card content
- **Separator**: Visual separator (border) above the form

### Form Header
- **Heading**: "Invite a team user"

### Form Layout
- **Structure**: Responsive grid layout
- **Behavior**: Automatically adjusts number of columns based on available screen space

### Form Fields

#### Full Name Input
- **Type**: Text input field
- **Label**: Not visible (placeholder acts as label)
- **Placeholder**: "Full name"
- **Required**: Yes
- **Validation**: Must not be empty (whitespace-only input is not valid)

#### Email Address Input
- **Type**: Email input field
- **Label**: Not visible (placeholder acts as label)
- **Placeholder**: "Email address"
- **Required**: Yes
- **Validation**: 
  - Must not be empty
  - Must be valid email format (handled by browser validation)

#### Role Select Dropdown
- **Label**: Not visible (value acts as label)
- **Default Value**: "Viewer"
- **Options**:
  - Admin
  - Manager
  - Viewer
- **Purpose**: Select the role to assign to the new team user
  - (MVP copy: team user)

#### Send Invite Button
- **Type**: Submit button
- **Label**: "Send Invite"
- **Behavior**: Submits the form when clicked

### Form Description
- **Text**: "Invited users receive a branded onboarding email with temporary credentials."
- **Location**: Below form fields
- **Purpose**: Informs users about what happens when an invite is sent

### Form Submission

#### Validation Rules
- Full name must be provided (cannot be empty)
- Email address must be provided (cannot be empty)
- Email address must be in valid format
- If validation fails, form submission is prevented

#### Successful Submission
When form is valid and submitted:
1. New team user is added to the team users list
2. Member is assigned the selected role
3. Invite permissions are automatically set based on role:
   - Admin or Manager → Can invite
   - Viewer → View only
4. Statistics cards update to reflect new counts
5. Form fields are cleared and reset to default values
6. User remains on the same page to continue managing team

## Delete Account (MVP)

### Delete Button
- Location: On each team user row
- Label: Delete
- Purpose: Permanently remove a team user account from the team list

### Confirmation Modal
- Trigger: clicking Delete
- Shows: user name + email
- Actions:
  - Cancel
  - Delete account

### Behavior
- Deleted user is removed from the list immediately.
- Statistics cards recalculate after deletion.

#### Email Notification
- Invited user receives an email with onboarding information
- Email includes temporary credentials for platform access
- Email is branded with organization's identity

## User Interactions

### Viewing Team Users
1. User navigates to Settings page
2. User clicks "Team" tab
3. Team users list displays showing:
   - All current team users with avatars
   - Member names and email addresses
   - Current role for each user
   - Invite permissions for each user
4. Statistics cards at top show:
   - Total team user count
   - Number of Admins
   - Number of members with invite rights

### Changing Member Role
1. User locates the team user in the list
2. User opens the role dropdown for that user
3. User selects a new role (Admin, Manager, or Viewer)
4. Changes take effect immediately:
   - Role badge updates to show new role
   - Invite badge updates based on new role permissions
   - Statistics cards recalculate if counts changed
5. Updated information is saved

### Inviting New Team Member
1. User scrolls to invite form at bottom of page
2. User fills out the form:
   - Enters full name of new team user
   - Enters email address of new team user
   - Selects role (defaults to Viewer)
3. User clicks "Send Invite" button
4. System validates form inputs:
   - Checks that name is not empty
   - Checks that email is not empty and is valid format
5. If validation passes:
   - New user is added to team users list
   - Statistics cards update
   - Form clears for next invite
6. If validation fails:
   - Form submission is prevented
   - User must correct invalid fields

## Loading and Error States

### Loading State
- Loading indicator displays while fetching team user data
- Statistics cards show loading placeholders
- Team user list shows loading placeholders
- Invite form is disabled during loading

### Error State
- Error message displayed if team user data fails to load
- User can retry loading without refreshing the entire page
- Error message: "Error loading team users. Please try again."
- Statistics cards show error state
- Team user list shows error state

### Empty State
- If no team users exist, empty state message is displayed
- Message: "No team users yet. Invite your first team user below."
- Invite form remains visible and functional
- Statistics cards show zero counts

### Form Validation Errors
- **Empty Name**: Form submission prevented (no explicit error message shown)
- **Empty Email**: Form submission prevented (no explicit error message shown)
- **Invalid Email Format**: Browser validation handles email format checking
- User must correct fields before form can be submitted

## Responsive Design

### Desktop View
- Statistics cards display in single row (all 3 cards visible)
- Team user list displays full information with user info and controls side-by-side
- Invite form fields display in single row (all fields visible)
- All information clearly visible without scrolling

### Tablet View
- Statistics cards may wrap to multiple rows depending on screen width
- Team user list maintains side-by-side layout for user info and controls
- Invite form fields may wrap to multiple rows
- Maintains readability and usability

### Mobile View
- Statistics cards stack vertically or display 2 per row
- Team user list stacks vertically: user info on top, controls below
- Invite form fields stack vertically
- All functionality remains accessible
- Full user information remains visible
