# Portfolio website

## Getting started

### Hosting the website on http://localhost:8080/

```
npm install
npm run dev
```

### Hosting the website on http://localhost:8080 with docker

```
docker image build -t portfolio:1.0.0 .
docker container run -d -p 8080:80 --rm portfolio:1.0.0
```

### Hosting the website on Github pages

```
npm run build
npm run deploy
```
- See the [Host using GitHub Pages](https://sbcode.net/threejs/github-pages/) guide for more details.

### References

- [Three.js and TypeScript Tutorials](https://sbcode.net/threejs/)
- [Dockerize your JavaScript web applications efficiently](https://graphaware.com/javascript/2020/03/12/dockerize-javascript-web-apps.html)
- [Dockerize Javascript web apps](https://graphaware.com/javascript/2020/03/12/dockerize-javascript-web-apps.html)