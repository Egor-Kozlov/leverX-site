'use strict'

// const initData = [
//     {
//     "_id": "0e91ac98757a1ede800228ab",
//     "index": 0,
//     "title": "High quality",
//     "discription": "As the values of your component inputs change over time, you may want to do something with that data inside your component. ",
//     "main-text": 'hello',
//     "tags": ["one", "two"],
//     "image": "card-background-1.png"
//     },
//     {
//     "_id": "1e91ac98757a1ede800228ab",
//     "index": 1,
//     "title": "How to RxJS in Angular",
//     "discription": "As the values of your component inputs change over time, you may want to do something with that data inside your component.",
//     "main-text": 'It has added the information for the dependency and also regarding the ng-content selections for the data. It helps in wrapping the ng content selections and can help in checking files by creating scripts and using various interfaces. This would help us provide additional data that can be used in tools like Angular language services, which offers the functionality to offer suggestions and hints for the components or methods pre-defined in built-in libraries.',
//     "tags": ["one", "two"],
//     "image": "card-background-2.png"
//     },
//     {
//     "_id": "2e91ac98757a1ede800228ab",
//     "index": 2,
//     "title": "Top 15 Features of Angular ",
//     "discription": "It has added the information for the dependency and also regarding the ng-content selections for the data.",
//     "main-text": 'It has added the information for the dependency and also regarding the ng-content selections for the data. It helps in wrapping the ng content selections and can help in checking files by creating scripts and using various interfaces. This would help us provide additional data that can be used in tools like Angular language services, which offers the functionality to offer suggestions and hints for the components or methods pre-defined in built-in libraries.',
//     "tags": ["one", "two"],
//     "image": "card-background-3.png"
//     },
//     {
//     "_id": "3e91ac98757a1ede800228ab",
//     "index": 3,
//     "title": "Angular team streamlines feature requests",
//     "discription": "Feature requests will be reviewed for alignment with existing projects on the Angular roadmap.",
//     "main-text": 'It has added the information for the dependency and also regarding the ng-content selections for the data. It helps in wrapping the ng content selections and can help in checking files by creating scripts and using various interfaces. This would help us provide additional data that can be used in tools like Angular language services, which offers the functionality to offer suggestions and hints for the components or methods pre-defined in built-in libraries.',
//     "tags": ["one", "two"],
//     "image": "card-background-4.png"
//     },
//     {
//     "_id": "4e91ac98757a1ede800228ab",
//     "index": 4,
//     "title": "How to RxJS in Angular",
//     "discription": "As the values of your component inputs change over time, you may want to do something with that data inside your component.",
//     "main-text": 'It has added the information for the dependency and also regarding the ng-content selections for the data. It helps in wrapping the ng content selections and can help in checking files by creating scripts and using various interfaces. This would help us provide additional data that can be used in tools like Angular language services, which offers the functionality to offer suggestions and hints for the components or methods pre-defined in built-in libraries.',
//     "tags": ["one", "two"],
//     "image": "card-background-4.png"
//     },
//     {
//     "_id": "5e91ac98757a1ede800228ab",
//     "index": 5,
//     "title": "Top 15 Features of Angular ",
//     "discription": "As the values of your component inputs change over time, you may want to do something with that data inside your component.",
//     "main-text": 'It has added the information for the dependency and also regarding the ng-content selections for the data. It helps in wrapping the ng content selections and can help in checking files by creating scripts and using various interfaces. This would help us provide additional data that can be used in tools like Angular language services, which offers the functionality to offer suggestions and hints for the components or methods pre-defined in built-in libraries.',
//     "tags": ["one", "two"],
//     "image": "card-background-1.png"
//     },
// ]

// Our web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB_bpdN3RO1pQKIJWks3FkwpwWSBOcZ5vc",
    authDomain: "leverx-a3be8.firebaseapp.com",
    databaseURL: "https://leverx-a3be8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "leverx-a3be8",
    storageBucket: "leverx-a3be8.appspot.com",
    messagingSenderId: "791647341261",
    appId: "1:791647341261:web:8fa35440dbb34a7c497784",
    measurementId: "G-ETN56726HG"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.database().ref('cards').set(initData);  <- for upload new arr of cards on firebase hosting. initData - our array of cards
console.log('hello');
let data = []

const storage = firebase.storage();

firebase.database().ref('cards').on('value', (cards) => {
    data = cards.val() // <- array of cards, that we will displayed
    // console.log(data.image);

    //Get container
    const container = document.querySelector('#container')
    //Get template
    const t = document.querySelector('#element-card')
    let title = t.content.querySelector('.card__title')
    let discription = t.content.querySelector('.card__discription')
    let img = t.content.querySelector('img')
    console.log('img: ', img);

    for (let index = 0; index < data.length; index++) {
            storage.ref(`cards/${data[index].image}`).getDownloadURL().then(url => {
            img.setAttribute('src', `${url}`);
            title.textContent = `${data[index].title}`
            discription.textContent = `${data[index].discription}`
            let card = t.content.cloneNode(true)
            container.append(card)
        });
    }
})





