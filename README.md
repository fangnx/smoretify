# Smoretify
Smoretify is a light-weight web application that enhances your Spotify experience. It integrates [Spotify](https://developer.spotify.com/documentation/web-api/) and [Genius](https://docs.genius.com/#/getting-started-h1) API to fetch and display **song lyrics**, **YouTube video**, and **track/artist info** of your  *current* Spotify playback.
## About the Project
As someone who uses Spotify on a daily basis, I always wanted to have a convenient way to view lyrics of the currently playing song (as opposed to having to search in Google and find a legit link every time).

There was no existing app/service that provided exactly what I wanted. So I decided to build one to make myself happy.

## Deployment
https://smoretify.herokuapp.com/

## Installation
```
npm install
```
It will install all the required `node_modules` and build the client.

---
If you are using `npm` of a very old version and the build is not triggered, you may need to manually run the script:
```
npm run postinstall
```

## Usage
To run the app on browser:
```
npm start
```
To run the app on desktop as an Electron application:
```
npm run start-electron
```

## Built With
- React
- Redux
- Redux-Thunk, Redux-Persist - Middlewares for Redux
- [Semantic UI](https://react.semantic-ui.com/)
- [React-Youtube](https://github.com/tjallingt/react-youtube) - Mini YouTube player widget
- Express
- [Passport](http://www.passportjs.org/), [Passport-Spotify](https://www.npmjs.com/package/passport-spotify) - Authentication with Spotify
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Genius API](https://docs.genius.com/#/getting-started-h1)

## License
This project is [MIT](https://github.com/fangnx/smoretify/blob/master/LICENSE) licensed.