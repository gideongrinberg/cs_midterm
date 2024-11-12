<center>
<h1>Meeting Room Booking App</h1>
<br/>
<h4>Adv. Projects in CS Midterm (2024/25) • Gideon Grinberg</h4>
<a href="https://github.com/gideongrinberg/cs_midterm/deployments"><img src="https://img.shields.io/github/deployments/gideongrinberg/cs_midterm/production?style=plastic&label=build%20status" alt="GitHub Deployments"></a> <a href="https://validator.w3.org/nu/?doc=https%3A%2F%2Fcs-midterm.vercel.app%2F"><img src="https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fcs-midterm.vercel.app%2F&style=plastic" alt="W3C Validation"></a> <a href="https://github.com/gideongrinberg/cs_midterm"><img src="https://tokei.rs/b1/github/gideongrinberg/cs_midterm?category=lines" alt="Lines of Code"></a>
<br/><hr/>
<p> 
    <a href="#tech-stack">Tech Stack</a> • 
    <a href="#instructions">Instructions</a> •
    <a href="#key-features">Key Features</a> •
    <a href="#documentation">Documentation</a> •
    <a href="#acknowledgements">Acknowledgements</a>
</p>
</center>

## Tech Stack
The frontend is powered by [SvelteKit](https://sveltejs.org) and the backend is based on [Pocketbase](https://pocketbase.io). The frontend is hosted on [Vercel](https://vercel.com) and the backend is hosted on [Pockethost](https://pockethost.io). I am using the free tier of both hosting services. 

## Key Features

- **Authentication**: Google OAuth-based authentication
- **Responsive UI**: The UI is fully responsive, and UX is comparable across all screen sizes and platforms.
- **Booking Management**: Users can view and book available rooms easily. Administrators can view and manage existing bookings.
    - **Database Integration**: All information is stored in a persistent database.
    - **Email Notifications**: Users recieve email notifications for upcoming bookings.

## Instructions

### Frontend
To run the frontend, `git clone` or download this repository and run `yarn install --dev`. Run `yarn dev --open` for dev mode or `yarn build` to build a production release. 

### Backend
Running the backend is more involved than the frontend. The frontend will use the production backend by default. To run your own Pocketbase server, follow these instructions:
1. Download and execute the appropriate [Pocketbase v0.22.23 binary](https://github.com/pocketbase/pocketbase/releases/tag/v0.22.23) and run it **OR** create a free Pocketbase server on [Pockethost](https://pockethost.io)
2. Open the admin panel and create the first admin account
3. Go to settings (third icon on the sidebar) and navigate to "Import Collections." Import the following JSON:
<details>
<summary>Pocketbase Schema</summary>
<pre>
[
    {
        "id": "_pb_users_auth_",
        "name": "users",
        "type": "auth",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "users_name",
                "name": "name",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "users_avatar",
                "name": "avatar",
                "type": "file",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "mimeTypes": [
                        "image/jpeg",
                        "image/png",
                        "image/svg+xml",
                        "image/gif",
                        "image/webp"
                    ],
                    "thumbs": null,
                    "maxSelect": 1,
                    "maxSize": 5242880,
                    "protected": false
                }
            },
            {
                "system": false,
                "id": "c5gydiib",
                "name": "isAdmin",
                "type": "bool",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {}
            }
        ],
        "indexes": [],
        "listRule": "id = @request.auth.id",
        "viewRule": "id = @request.auth.id",
        "createRule": "",
        "updateRule": "id = @request.auth.id",
        "deleteRule": "id = @request.auth.id",
        "options": {
            "allowEmailAuth": true,
            "allowOAuth2Auth": true,
            "allowUsernameAuth": true,
            "exceptEmailDomains": null,
            "manageRule": null,
            "minPasswordLength": 8,
            "onlyEmailDomains": null,
            "onlyVerified": false,
            "requireEmail": false
        }
    },
    {
        "id": "7zlyitng1hup18b",
        "name": "bookings",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "mjlycknd",
                "name": "index",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "uyzgn0g5",
                "name": "name",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "eb84pmvq",
                "name": "email",
                "type": "email",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "exceptDomains": null,
                    "onlyDomains": null
                }
            },
            {
                "system": false,
                "id": "ttnrzlrc",
                "name": "room",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "qymt6yu8",
                "name": "period",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "q5vjp8hz",
                "name": "date",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            }
        ],
        "indexes": [
            "CREATE UNIQUE INDEX `idx_RiNvW73` ON `bookings` (`index`)"
        ],
        "listRule": "",
        "viewRule": "",
        "createRule": "",
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    }
]
</pre>
</details>

4. (OPTIONAL) Set up the Google OAuth provider according to the instructions
5. Create an admin account in the users collection (add a new users and set `isAdmin` to `true`)
6. Run the pocketbase executable (not required for Pockethost)
7. Update `src/lib/pocketbase.ts` with the URL or IP address for Pocketbase
8. Start the app with `yarn dev --open`

## Documentation
> *Unless otherwise stated, all files are housed in the `src` directory.*


- This is a single-page application with a single route, contained in `routes/+page.svelte`. Most of the code is housed in `lib/`. 
- `+page.svelte` will render the `SignIn` component unless it detects a valid `currentUser`. `currentUser` is a Svelte store, and its value is managed by the Pocketbase SDK. If it detects a valid user, it renders the `Main` component. 
    - The `SignIn` component contains a button to sign in via Pocketbase's OAuth2 functionality for regular users, as well as a button to sign in as an admin. The admin sign in button triggers a modal where the user can enter their credentials. The "Sign In" button on the modal triggers a call to Pocketbase's `authWithPassword` function.
    - The `Main` component consists of a Navbar and a standard app-wide responsive layout. The navbar contains a dropdown with the user's name and a sign out button. Because the page relies on the user data, which is fetched asynchronously from Pocketbase, the page displays a spinner until that data is loaded. 
        - The `Main` component also handles routing. The view to display is stored in the reactive `viewState` variable. 
        - By default, the `viewState` is set to `"booking"` and displays the booking calendar component (`lib/pages/main/Booking.svelte`). 
        - If the user is an admin, they can navigate to the admin page; the `viewState` for this page is `"admin"` and the component is stored in `lib/pages/main/Admin.svelte`.
- As of now, the only component of the application house in `lib/components/` is the Sign In With Google button.

## Acknowledgements

I used AI to generate the Sign in With Google button. ChatGPT was also used to generate some of the CSS classes in the `Main.svelte` component and its children. During this project, I consulted several sources, including the SvelteKit docs and tutorial, the Pocketbase docs, and StackOverflow. I took some of the boilerplate authentication code from [this](https://github.com/fireship-io/pocketchat-tutorial/tree/main) Fireship.io repo and the accompanying tutorial video. 

I am grateful to Vercel and Pockethost for their generous free tiers, and to the Svelte and Pocketbase developers for their open source tools. 