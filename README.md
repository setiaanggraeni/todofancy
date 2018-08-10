# todofancy

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

Documentation:
| Routes            | HTTP   | Description                                                                           |
|-------------------|--------|---------------------------------------------------------------------------------------|
| /users/register   | POST   | Sign up with new user info                                                            |
| /users/login      | POST   | Sign in while get an access token based on credentials                                |
| /users/loginFb    | POST   | Sign in with FB while get an access token based on credentials                        |
| /users/sendmail   | POST   | Send mail notification if there any deadline about 0-1 day should done before duedate |
| /tasks            | GET    | Get all user tasks, only authorized user can access it                                |
| /tasks/create     | POST   | Create new task, only authorized user can create it                                   |
| /tasks/edit/:id   | PUT    | Edit task by id, only authorized user can edit it                                     |
| /tasks/delete/:id | DELETE | Delete task by id, only authorized user can edit it                                   |
| /tasks/:id        | GET    | Get one user by id                                                                    |
