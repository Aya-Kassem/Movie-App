
// NAVBAR...............
document.querySelector("#open-icon").addEventListener('click', function (){
    let navIcon = (this);
    if( navIcon.getAttribute("class") === "fas fa-align-justify" ){
        navIcon.setAttribute("class", "fas fa-times");
        document.querySelector(".navbar").style.cssText = `left: 0`;
        setTimeout(NavLinksUp, 300)
    }
    else{
        navIcon.setAttribute("class", "fas fa-align-justify");
        document.querySelector(".navbar").style.cssText = `left: -250px`;
        document.querySelectorAll(".navbar ul li a").forEach(link => {
            link.style.cssText = "transform: translateY(320px); transition: transform .2s ease-in-out"
        })
    }
})

// ANIMATAE NAVBAR LINKS ..........
function NavLinksUp(){
    document.querySelector("#now_playing").style.cssText = "transform: translateY(0); transition: transform .2s ease"
    document.querySelector("#popular").style.cssText = "transform: translateY(0); transition: transform .2s .2s ease"
    document.querySelector("#top_rated").style.cssText = "transform: translateY(0); transition: transform .2s .4s ease"
    document.querySelector("#trending").style.cssText = "transform: translateY(0); transition: transform .2s .6s ease"
    document.querySelector("#upcoming").style.cssText = "transform: translateY(0); transition: transform .2s .8s ease"
    document.querySelector(".contact").style.cssText = "transform: translateY(0); transition: transform .2s 1s ease"
}

// GLOBAL VARIABLES.................
let key = "d8b30ddf56e9f31f5633a0cc2fb3f2dd",
baseLink = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
allData,
displaySearchResults = document.querySelector(".search-results"),
searchData = [];

// API FUNCTION .......
async function getApiData(url = baseLink){
    let currentURL = url;
    allData = (await (await fetch(currentURL)).json()).results;
    let moviesRow = document.querySelector(".display-data");
    displayMovies(allData, moviesRow)
}
getApiData()

// DISPLAY MOVIES ............ 
function displayMovies(movies, container){
    let moviesData = movies; //searchdata
    let moviesContainer = container; //displaysearchdata
    moviesContainer.innerHTML = '';
    
    moviesData.forEach(movie => {
        let imagePath = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        let movieEl = document.createElement('div');
        movieEl.classList.add('col-md-6', 'col-lg-4', 'my-3');
        movieEl.innerHTML = 
        `
            <div class="movie-data p-0 shadow">
                <img src="${imagePath}" class="w-100 movie-poster">
                <div class="movie-detailes text-center d-flex justify-content-center align-items-center flex-column">
                    <h2 class="movie-title">${movie.title}</h2>
                    <p>${movie.overview}</p>
                    <p>
                        <span>Rate: </span>
                        <span>${movie.vote_average}</span>
                    </p>
                    <p>${movie.release_date}</p>
                </div>
            </div>

        `
        moviesContainer.appendChild(movieEl);
    });
}

// CHANGING URL ON CLICK ..........
let allLinks = document.querySelectorAll(".navbar ul li a");
allLinks.forEach(link => {
    link.addEventListener('click',() => {
        let requestedUrl,
        movieCollection,
        linkId = link.getAttribute("id");
        
        if(linkId == 'trending'){
           movieCollection = `${linkId}/all/day`;
        }
        else{
            movieCollection = `movie/${linkId}`
        }
        requestedUrl = `https://api.themoviedb.org/3/${movieCollection}?api_key=${key}&language=en-US&page=1`
        getApiData(requestedUrl)
    });
})

// API SEARCH........
let searchInput = document.querySelector("#api-search");
searchInput.addEventListener('keyup', () => {
    let searchValue = searchInput.value,
    searchUrl;

    if(searchValue){
        searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchValue}`
        getApiData(searchUrl)
    }else{
        getApiData()
    }
})

// PAGE SEARCH .........
let movieSearch = document.querySelector("#page-search");
movieSearch.addEventListener('keyup', () => {
    let movieName = movieSearch.value;
    if(movieName){
        allData.forEach(movie => {
            let movieTilte = movie.title.toLowerCase();
            if(movieTilte.includes(movieName.toLowerCase())){
                searchData.push(movie)
            }
        })
        displayMovies(searchData, displaySearchResults);
        searchData.length = 0;
    }
    else{
        displaySearchResults.innerHTML = '';
        getApiData()
    }
})

// CONTACT VALIDATION............
document.querySelector('#sub-btn').disabled = true;
// REGEX................
let nameRegex = /^[A-Z]{1}[a-z\-]+$/,
phoneRegex = /^(002)?(01)[0125][0-9]{8}$/,
passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/,
ageRegex = /^[0-9]{2}$/,
mailRegex = /^\S+@\S+\.\S+$/,
nameValue , mailValue, phoneValue, ageValue, passValue, repassValue;

document.querySelector('[name="name"]').addEventListener('keyup', function (){
    this.nextElementSibling.style.display = 'flex'
    nameValue = this.value;
    if(nameRegex.test(nameValue)){
        this.nextElementSibling.style.display = 'none'
        this.classList.add('valid')
    }
    formValid()
})
document.querySelector('[name = "mail"]').addEventListener('keyup', function (){
    this.nextElementSibling.style.display = 'flex'
    mailValue = this.value;
    if(mailRegex.test(mailValue)){
        this.nextElementSibling.style.display = 'none'
        this.classList.add('valid')
    }
    formValid()
})
document.querySelector('[name="phone"]').addEventListener('keyup', function (){
    this.nextElementSibling.style.display = 'flex'
    phoneValue = this.value;
    if(phoneRegex.test(phoneValue)){
        this.nextElementSibling.style.display = 'none'
        this.classList.add('valid')
    }
    formValid()
})
document.querySelector('[name = "age"]').addEventListener('keyup', function (){
    this.nextElementSibling.style.display = 'flex'
    ageValue = this.value;
    if(ageRegex.test(ageValue)){
        this.nextElementSibling.style.display = 'none'
        this.classList.add('valid')
    }
    formValid()
})
document.querySelector('[name = "password"]').addEventListener('keyup', function (){
    this.nextElementSibling.style.display = 'flex'
    passValue = this.value;
    if(passRegex.test(passValue)){
        this.nextElementSibling.style.display = 'none'
        this.classList.add('valid')
    }
    formValid()
})
document.querySelector('[name="repassword"]').addEventListener('keyup', function (){
    this.nextElementSibling.style.display = 'flex'
    repassValue = this.value;
    if(passRegex.test(repassValue) && passValue == repassValue){
        this.nextElementSibling.style.display = 'none'
        this.classList.add('valid')
    }
    formValid()
})
function formValid(){
    if
    (
        nameRegex.test(nameValue) &&
        mailRegex.test(mailValue) &&
        phoneRegex.test(phoneValue) &&
        ageRegex.test(ageValue) &&
        passRegex.test(passValue) &&
        passValue == repassValue
    ){
        document.querySelector('#sub-btn').disabled = false
    }
    else{
        document.querySelector('#sub-btn').disabled = true
    }
}













