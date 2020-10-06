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

!> **Important** Make sure to add all environment variables based on the [env template](https://github.com/NoxelS/igs-webapp/blob/master/backend/.env-template).
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

!> **Important** If no reverse proxy is used you have to add port mapping to the containers.

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

### Create new user
__Endpoint:__

> POST ```/auth/create_user``` 🔐

__Expected payload:__
[``` User ```](#User)

__Response:__
_[SuccessResponse](#SuccessResponse)_

## Articles 📔
### Listing all articles
__Endpoint:__

This endpoint is used to fetch all articles.

> GET ```/articles/list```

__Response:__
_[IgsResponse<Article[]>](#IgsResponse)_
```json
{
  "success": true,
  "data": [
    {
      "id": "<string>",
      "title": "<string>",
      "views": "<number>",
      "creationDate": "<number>",
      "imageUrl": "<string>",
      "content": "<string>"
    },
    {
      "id": "<string>",
      "title": "<string>",
      "views": "<number>",
      "creationDate": "<number>",
      "imageUrl": "<string>",
      "content": "<string>"
    }
  ],
  "responseType": "IgsResponse<Article[]>",
  "dataType": "Article"
}
```

### Creating an article
__Endpoint:__

> POST ```/articles/create``` 🔐

__Expected payload:__
[``` Article ```](#Article)

```json
{
  "id": "<string>",
  "title": "<string>",
  "views": "<number>",
  "creationDate": "<number>",
  "imageUrl": "<string>",
  "content": "<string>"
}
```
__Response:__
_[SuccessResponse](#SuccessResponse)_

### Removing an article
__Endpoint:__

?> **Tip** Note that only the field **id** is used, but you can still send a whole article.

> POST ```/articles/remove``` 🔐

__Expected payload:__
[``` Article ```](#Article)

```json
{
  "id": "<string>",
  "title": "<string>",
  "views": "<number>",
  "creationDate": "<number>",
  "imageUrl": "<string>",
  "content": "<string>"
}
```
__Response:__
_[SuccessResponse](#SuccessResponse)_

### Editing an article
__Endpoint:__

> POST ```/articles/edit``` 🔐

__Expected payload:__
[``` Article ```](#Article)

```json
{
  "id": "<string>",
  "title": "<string>",
  "views": "<number>",
  "creationDate": "<number>",
  "imageUrl": "<string>",
  "content": "<string>"
}
```
__Response:__
_[SuccessResponse](#SuccessResponse)_

## Files 📁
### Listing all files
__Endpoint:__

This endpoint is used to fetch all files as [ShortFiles](#ShortFile).

> GET ```/files/list``` 🔐

__Response:__
_[ShortFileListResponse](#ShortFileListResponse)_
```json
{
  "success": true,
  "data": [
    {
      "name": "<string>",
      "id": "<number>",
      "authorId": "<number>",
      "mimetype": "<string>",
      "creationDate": "<number>",
      "description": "<string>"
    }
  ],
  "responseType": "ShortFileListResponse",
  "dataType": "ShortFile"
}
```
### Creating a file
__Endpoint:__

> POST ```/files/create``` 🔐

__Expected payload:__

```json
{
  "file": "<File>",
  "description": "<string>"
}
```

__Response:__
_[SuccessResponse](#SuccessResponse)_
### Deleting a file

__Endpoint:__

?> **Tip** Note that only the field **id** is used, but you can still send a whole ShortFile.


> POST ```/files/remove``` 🔐

__Expected payload:__
[``` ShortFile ```](#ShortFile)

__Response:__
_[SuccessResponse](#SuccessResponse)_

### Downloading a specific file
__Endpoint:__

> GET ```/files/get/:id``` 🔐

__Response:__
_[Blob](https://developer.mozilla.org/de/docs/Web/API/Blob)_

## Utils ⚒
### User information

__Endpoint:__

> GET ```/info/user``` 🔐

__Response:__
_[IgsResponse\<User>](#IgsResponse)_

### User id
__Endpoint:__

> GET ```/info/userid``` 🔐

__Response:__
_[IgsResponse\<string>](#IgsResponse)_

<!-- ### Server information -->

# Models
A short description of models used to send the GUI information.

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

?> **Tip** Note that other responses are always inheriting the [IgsResponse](#IgsResponse).

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

?> **Tip** Note that this will be the default response for all post actions. If an error occures, an [ErrorResponse](#ErrorResponse) will be sent instead.

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