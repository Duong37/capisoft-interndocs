***Task: Create a routed React app, with public & private views***

- Use the HashRouter to to create a React app with the following pages (They do not have to be styled)
    - Login [public] - just 2 basic input fields (email, password), and a sign up button
    - Dashboard [private] - some text indicating that we are on the dashboard page and a logout button
    - Users [private] - some text indicating that we are on the users page and a logout button
- When the user clicks login, apply some global state that marks the user as authenticated.
- When the user clicks logout, apply some global state that marks the users as not authenticated.
- Authenticated users should be redirected from the login to the dashboard
- Not authenticated users should be redirected to the login page
- Please apply wrappers, which handle the auth-flow, i.e. don’t code the redirect logic within the dashboard and users