# Quickstart
## About The Project
The IGS Webapp is used to communicate between diffrent IGS in Germany.
Authenticated users can share documents and post articles while strangers get
information about the system IGS.

### Built With
-   [ts-node](https://www.npmjs.com/package/ts-node) and [Express](https://www.npmjs.com/package/express) backend
-   [Angular](https://angular.io/) frontend
-   [MySql](https://www.mysql.com) database
-   [Docker](https://www.docker.com/) and [Jenkins](https://www.jenkins.io) for continuous deployment


## Getting Started
### Purpose of this API
This API is used to store files, articles and users.
To get a local copy up and running follow these simple steps.


### Develop Backend

To develop the backend you can run a dev server:

```sh
git clone https://github.com/NoxelS/igs-webapp.git
cd backend
npm run dev
```
### Develop Frontend

To develop the frontend you can use the angular cli:

```sh
git clone https://github.com/NoxelS/igs-webapp.git
cd frontend
ng serve
```

### Building
#### Backend
1. Set up node

```sh
git clone https://github.com/NoxelS/igs-webapp.git
cd backend
npm install
npm run lint
npm run build
mkdir -p ./dist/keys
NODE_ENV=production node generateKeyPairs.js
```

2. Create the container
```sh
docker build . -t <image-name>
docker run -v <volume-for-files>:/usr/src/app/files <image-name>
```
Make sure to add all environment variables based on the .env-template.
_If no reverse proxy is used you have to add port mapping to the containers._

#### Frontend
1. Set up node

```sh
git clone https://github.com/NoxelS/igs-webapp.git
cd frontend
npm install
npm run lint
node preBuild.js
npm run build
```

2. Create the container
```sh
docker build . -t <image-name>
docker run <image-name>
```
Make sure to add all environment variables based on the .env-template.
_If no reverse proxy is used you have to add port mapping to the containers._


# Endpoints

## Authentication 🔐
The authentication is based on [JWT](https://jwt.io/).
### How to authenticate
__Endpoint:__

> POST ```/auth/login```

__Expected payload:__
```json
{
  "username": "<string>",
  "password": "<string>"
}
```
__Response:__
_[LoginResponse](#LoginResponse)_
```json
{
  "success": "<boolean>",
  "data": {
    "username": "<string>",
    "email": "<string>",
    "id": "<string>",
  },
  "responseType": "IgsResponse<User>",
  "dataType": "User",
  "token": "<string>",
  "expiresIn": "<number>"
}
```
### Create new user
__Endpoint:__

> POST ```/auth/create_user```

__Expected payload:__
```json
{
  "username": "<string>",
  "password": "<string>",
  "email": "<string>"
}
```
__Response:__
_[SuccessResponse](#SuccessResponse)_
```json
{
  "success": true,
  "data": null,
  "responseType": "IgsResponse<null>",
  "dataType": null
}
```

## Articles 📔
### Creating an article
### Deleting an article
### Editing an article
### Listing all articles

## Files 📁
### Creating a file
### Deleting a file
### Editing a file
### Listing all files

## Utils ⚒
### User information
### Server information

# Models

## Article
Base class for every article.
```typescript
export class Article {
  public id: string;
  public title: string;
  public views: number;
  public creationDate: number;
  public imageUrl: string;
  public content: string;
}
```
## User
Basic representation of an user.
```typescript
export class User {
    constructor(public username: string, public email: string, public id: string) {}
}
```
## ShortFile
GUI Representation of a file. Does not contain the real file.
```typescript
export class ShortFile {
  public id: number,
  public name: string,
  public authorId: number,
  public mimetype: string,
  public creationDate: number,
  public description: string
}
```

## Response
### IgsResponse
The generic response the API will use as a respond. 
If the field _successful_ is not true, then there will be an errorMessage.
> Note that other responses are always inheriting the [IgsResponse](#IgsResponse).

```typescript
export class IgsResponse<T> {
    successful: boolean = true;
    data: T;
    errorMessage: string;
    responseType: string;
    dataType: string;
}
```
The field responseType will equal the name of the response and the name of the datatype T in <> brackets. 
For example: 
```typescript
new IgsResponse<User>().responseType === "IgsResponse<User> // is true"
```

### SuccessResponse
Is equal to a [IgsResponse](#IgsResponse) where ```T = null```
```typescript
export class SuccessResponse extends IgsResponse<null> {
    constructor() {
        super(null);
    }
}
```
### ShortFileListResponse
Is equal to a [IgsResponse](#IgsResponse) where ```T = ShortFile[]```. The response is used when sending file information to the GUI.

```typescript
export class ShortFileListResponse extends IgsResponse<ShortFile[]> {
    constructor(id: ShortFile[]) {
        super(id);
    }
}
```
### ErrorResponse
Is equal to a [IgsResponse](#IgsResponse) where ```T = null && successful = false```. The response is used when the backend encounters an error. The field ```errorMessage``` fill contain an error message.

```typescript
export class ErrorResponse extends IgsResponse<null> {
    constructor(err: string) {
        super(null, err);
    }
}
```
### LoginResponse
Is equal to a [IgsResponse](#IgsResponse) where ```T = User```. The response is used when getting a new jwt token.

```typescript
export class LoginResponse extends IgsResponse<User> {
    token: string;
    expiresIn: string;
    signedToken: string, 
    expiresIn: string, 
}
```