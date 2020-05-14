//Variables
const listaTweets = document.getElementById('lista-tweets');

//Event Listernets

eventListeners();

function eventListeners(){
    //Cuando se envia el formulacio

    document.querySelector('#formulario').addEventListener('submit',agregarTweet);

    //Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);

    //Contenido Cargado
    document.addEventListener('DOMContentLoaded',localStorageListo);

}


//Funciones


//Añadir Tweet del Formulario

function agregarTweet(e){
    e.preventDefault();

    console.log('Formulario Enviado')

    //Leer el valor del textarea
    const tweet = document.getElementById('tweet').value;

    //Crear Boton de Eliminar

    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'x';
    
    
    //Crear Elemento y añadirle el contenido a la lista

    const li = document.createElement('li');
    li.innerText = tweet;
    //Añade el boton de borrar al tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista
    listaTweets.appendChild(li);

    //Añadir a local Storage
    agregarTweetLocalStorage(tweet);


    console.log(tweet);
}

//Borrar Tweet del dom
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className ==='borrar-tweet'){
        console.log(e.target.parentElement.remove());
        console.log('diste click en eliminar');
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.textContent);
        console.log(e.target.parentElement.textContent);

    }
    else{
        console.log('diste click donde no era');
    }


    console.log('diste clic en la lista');
}
//Mostrar datos de LocalStorage en la lista

function localStorageListo(){
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'x';
    
    
        //Crear Elemento y añadirle el contenido a la lista

        const li = document.createElement('li');
        li.innerText = tweet;
        //Añade el boton de borrar al tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);

        //Añadir a local Storage
        agregarTweetLocalStorage(tweet);


        console.log(tweet);  
    });
}
//Agregar Tweet a local storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    //añadir el nuevo tweet
    tweets.push(tweet);
    //Convertir de string a a arreglo de local storage
    localStorage.setItem('tweets',JSON.stringify(tweets)); //convierte el json en string
    //Agregar a local storage
    localStorage.setItem('tweets', tweet);
}

function obtenerTweetsLocalStorage(){
    let tweets;
    //Revisar valores de Local Storage

    if(localStorage.getItem('tweets')===null){
        tweets =[];
    }
    else{
        tweets =JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//Eliminar Tweet de localStorage
function borrarTweetLocalStorage(tweet){
    let Tweets, tweetBorrar;
    //Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length -1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet,index){
        if(tweet=== tweet){
            tweets.splice(index, 1);
        }
    })
    localStorage.setItem('tweets', JSON.stringify(tweets));
}