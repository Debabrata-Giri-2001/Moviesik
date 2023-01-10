

console.log("This is moviesKey");
const movie_search_input_filed = document.getElementById('movie_search_input_filed')
const searchList = document.getElementById('search_list');
const resultList = document.getElementById('movie_details');



// // get request
async function myGetFunction(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=9fa67544`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if (data.Response == "True") displayMovieList(data.Search);
}

// find movies to get list search in files
function findMovies() {
    let searchTerm = (movie_search_input_filed.value).trim();
    if (searchTerm.length > 0) {
        myGetFunction(searchTerm)
        searchList.classList.remove('hide_search_list');

    } else {
        searchList.classList.add('hide_search_list')
    }
}

// gets on clicking search box
window.addEventListener('click', (e) => {
    if (e.target.className != "movie_search_input_filed") {
        searchList.classList.add('hide_search_list');
    }
});

// show in list view on search box
function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        // console.log(movieListItem);
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add('listContent')

        if (movies[idx].Poster != "N/A") {
            moviePoster = movies[idx].Poster
        } else {
            moviePoster = './ORFI0N0.jpg'
        }

        movieListItem.innerHTML = `
        
        <div class="listContent">
            <img class="search_item_thumbnail" src=${moviePoster} alt="listMovies">
                <div class="search_item_info">
                    <h3>${movies[idx].Title}</h3>
                    <h4>Type: ${movies[idx].Type}</h4>
                    <p>${movies[idx].Year}</p>
                </div>
        </div>
        `;
        searchList.appendChild(movieListItem)
    }
    loadMovieDetailes()
}

// Load movies on Deatailes Tab
function loadMovieDetailes() {
    const searchMovies = searchList.querySelectorAll('.listContent')
    searchMovies.forEach(movie => {
        // console.log(movie);
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);

            searchList.classList.add('hide_search_list')
            movie_search_input_filed.value = ""
            const RESULT_API = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=9fa67544`)
            const movieAbout = await RESULT_API.json()

            // console.log(movieAbout.Ratings[0].Value);


            displayMoviesDetails(movieAbout)

        })
    })
}

// get All data show in details site use in innerHTML
function displayMoviesDetails(details) {
    resultList.innerHTML = `
    <div >
        <div class="poster">

        <div class="moviesPoster">
            <img class="posterImg" src="${(details.Poster != "N/A") ? details.Poster : "./ORFI0N0.jpg"}" alt="movies">
        </div>
        <div class="moviesDet">
            <div>
                <h1 class="movieTitle">${details.Title}</h1>
            </div>
            <ul class="listDet">
                <li class="listLi1">${details.Rated}</li>
                <li class="listLi2">${details.Released}</li>
                <li class="listLi3">${details.Genre}</li>
                <li class="listLi4">${details.Runtime}</li>
            </ul>
            <div class="User_Score">
                <p class="imdb">${details.imdbRating}</p>
                <span class="rating">IMDB Rating</span>
            </div>

            <div>
                <p class="plot">Plot</p>
                <p class="plotPara">${details.Plot}</p>
            </div>
            <div class="diCou">
                <div>
                    <p class="directorName">${details.Director}</p>
                    <p class="director">Director</p>
                </div>

                <div>
                    <p class="counryName">${details.Country}</p>
                    <p class="country">Country</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Buttom -->

    <div class="allAbout">

        <h1 class="listAboutAllData">All About this movie</h1>
        <div class="allListAboutMovies">
            <div class="actorAward">
                <div class="actorAbout">
                    <p class="actorsName">${details.Actors}</p>
                    <p class="actorTile">Actors</p>
                </div>

                <div class="awardAboout">
                    <p class="awards">${details.Awards}</p>
                    <p class="awardTitle">Awards🏆</p>
                </div>
            </div>

            <!-- score -->
            <div class="intentReting">
                <p class="ImdbMovieRat">Internet Movie Database</p>
                <p class="imdbScr">${details.Ratings[0].Value}</p>

                
            </div>
        </div>

        <div class="box_yp">
            <p class="boxOffice">Box Office${details.BoxOffice}</p>
            <p class="typeOf">Type :<samp class="movies">${details.Type}</samp</p>
        </div>
        </div>
        
    </div>
    `
}

