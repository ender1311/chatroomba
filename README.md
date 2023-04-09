<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ender1311/chatroomba">
    <img src="https://raw.githubusercontent.com/ender1311/ender1311.github.io/main/imgs/chatroomba_login.jpg" alt="Logo" width="300">
  </a>

<h3 align="center">chatRoomb online forum</h3>

  <p align="center">
    chatRoomb online forum
    <br />
    <a href="https://github.com/ender1311/chatroomba"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.youtube.com/watch?v=Xo4kq104Css">View Video Demo</a>
    ·
    <a href="https://github.com/ender1311/chatroomba/issues">Report Bug</a>
    ·
    <a href="https://github.com/ender1311/chatroomba/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
This is an online forum for parents.
Users can login, browse different topics of discussion, and interact with other users.
Users can post their own opinions and thoughts as well as reply to other users' comments.
Users can like other posts.
Users can edit their own posts.
Posts are stored on a postgresql database.
Server accepts HTTP requests from client side and retrieves data from the postgresql database for the client.

[![Product Name Screen Shot][product-screenshot]](https://raw.githubusercontent.com/ender1311/ender1311.github.io/main/imgs/infant_sleep.jpg)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![React Router][React-router]][React-router-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.


### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/ender1311/chatroomba.git
   ```
2. Install NPM packages
   
   ```sh
   npm i
   ```
3. Start the client side app from the directory: /client
   ```js
   npm run start
   ```

4. Start a second server from the directory: /server
   start server
   ```js
   node server.js
   ```

### Info
Prisma schema was used for integrating database with server
https://www.prisma.io/docs/concepts/components/prisma-schema

https://www.prisma.io/dataguide/postgresql/5-ways-to-host-postgresql

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage





<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Feature 1: Login authentication
- [ ] Feature 2: Pick from several topics
- [ ] Feature 3: Post, reply, edit, delete functions 


See the [open issues](https://github.com/ender1311/chatroomba/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Dan Luk - danluk1311@gmail.com

Project Link: [https://github.com/ender1311/chatroomba](https://github.com/ender1311/chatroomba)

Backend server code: https://github.com/ender1311/chatroomba/blob/main/server/server.js

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ender1311/chatroomba.svg?style=for-the-badge
[contributors-url]: https://github.com/ender1311/chatroomba/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ender1311/chatroomba.svg?style=for-the-badge
[forks-url]: https://github.com/ender1311/chatroomba/network/members
[stars-shield]: https://img.shields.io/github/stars/ender1311/chatroomba.svg?style=for-the-badge
[stars-url]: https://github.com/ender1311/chatroomba/stargazers
[issues-shield]: https://img.shields.io/github/issues/ender1311/chatroomba.svg?style=for-the-badge
[issues-url]: https://github.com/ender1311/chatroomba/issues
[license-shield]: https://img.shields.io/github/license/ender1311/chatroomba.svg?style=for-the-badge
[license-url]: https://github.com/ender1311/chatroomba/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/danluk1311
[product-screenshot]: https://raw.githubusercontent.com/ender1311/ender1311.github.io/main/imgs/chatroomba_comments.jpg
[payment-screenshot]: https://ender1311.github.io/coding_central/imgs/stripe_payment.png
[product-demo]:https://ender1311.github.io/coding_central/imgs/eCommerce_demo2.gif
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[React-router]: https://img.shields.io/badge/-React%20Router-CA4245?logo=react-router
[React-router-url]: https://reactrouter.com/en/main
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
