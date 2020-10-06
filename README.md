[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">IGS Webapp</h3>

  <p align="center">
    App for communicating between IGS across germany.
    <br />
    <a href="https://noxels.github.io/igs-webapp/"><strong>Explore the docs »</strong></a>
  </p>
</p>

<!--
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)
-->

<!-- ABOUT THE PROJECT -->

## About The Project

The IGS Webapp is used to communicate between diffrent IGS in Germany.
Authenticated users can share documents and post articles while strangers get
information about the system IGS.

### Built With

-   [ts-node](https://www.npmjs.com/package/ts-node) and [Express](https://www.npmjs.com/package/express) backend
-   [Angular](https://angular.io/) frontend
-   [MySql](https://www.mysql.com) database
-   [Docker](https://www.docker.com/) and [Jenkins](https://www.jenkins.io) for continuous deployment

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Develop Backend

To develop the backend you can run a dev server:

```sh
cd backend
npm run dev
```
### Develop Frontend

To develop the frontend you can use the angular cli:

```sh
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

2. Create container
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

2. Create container
```sh
docker build . -t <image-name>
docker run <image-name>
```
Make sure to add all environment variables based on the .env-template.
_If no reverse proxy is used you have to add port mapping to the containers._


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/NoxelS/igs-webapp/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Noel Schwabenland - [@noel](https://twitter.com/NoelSchwabenla2) - noel@schwabenland.ch

Project Link: [https://github.com/NoxelS/igs-webapp](https://github.com/NoxelS/igs-webapp)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/NoxelS/igs-webapp.svg?style=flat-square
[contributors-url]: https://github.com/NoxelS/igs-webapp/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/NoxelS/igs-webapp.svg?style=flat-square
[forks-url]: https://github.com/NoxelS/igs-webapp/network/members
[stars-shield]: https://img.shields.io/github/stars/NoxelS/igs-webapp.svg?style=flat-square
[stars-url]: https://github.com/NoxelS/igs-webapp/stargazers
[issues-shield]: https://img.shields.io/github/issues/NoxelS/igs-webapp.svg?style=flat-square
[issues-url]: https://github.com/NoxelS/igs-webapp/issues
[license-shield]: https://img.shields.io/github/license/NoxelS/igs-webapp.svg?style=flat-square
[license-url]: https://github.com/NoxelS/igs-webapp/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/NoxelS
[product-screenshot]: images/screenshot.png
