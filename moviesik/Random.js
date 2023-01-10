// List of movies
const Random_Movies = [
    'Iron Man',
    'The Incredible Hulk',
    'Iron Man 2',
    'Thor',
    'Captain America: The First Avenger',
    'The Avengers',
    'Iron Man 3',
    'Thor: The Dark World',
    'Captain America: The Winter Soldier',
    'Guardians of the Galaxy',
    'Avengers: Age of Ultron',
    'Ant-Man',
    'Captain America: Civil War',
    'Doctor Strange',
    'Guardians of the Galaxy Vol. 2',
    'Spider-Man: Homecoming',
    'Thor: Ragnarok',
    'Black Panther',
    'Avengers: Infinity War',
    'Ant-Man and the Wasp',
    'Captain Marvel',
    'Avengers: Endgame',
    'Spider-Man: Far From Home',
    'Jurassic World',
    'Furious 7',
    'Minions',
    'Jurassic Park',
    'Despicable Me 2',
    'The Secret Life of Pets',
    'The Fate of the Furious',
    'E.T. the Extra-Terrestrial',
    'Fast & Furious 6',
    'Sing',
    'Fast Five',
    'The Lost World: Jurassic Park',
    'Mamma Mia!',
    'Fifty Shades of Grey',
    'King Kong',
    'Ted',
    'Despicable Me',
    'Meet the Fockers',
    'Bruce Almighty',
    'Jaws',
    'Lucy',
    'The Bourne Ultimatum',
    'Les Misérables',
    'Warcraft',
    'The Mummy Returns',
    'The Mummy',
    'Jason Bourne',
    'The Mummy: Tomb of the Dragon Emperor',
    'Snow White and the Huntsman',
    'Back to the Future',
]

// until loading not Finish
window.onload = function () {

    setTimeout(() => {
        document.getElementById("loading").style.display = "none"
    }, 2000);
}


const movieTitle = document.querySelector('.movieTitle')
const listLi1 = document.querySelector('.listLi1')
const listLi2 = document.querySelector('.listLi2')
const listLi3 = document.querySelector('.listLi3')
const listLi4 = document.querySelector('.listLi4')
const imdb = document.querySelector('.imdb')
const plotPara = document.querySelector('.plotPara')
const directorName = document.querySelector('.directorName')
const counryName = document.querySelector('.counryName')
const actorsName = document.querySelector('.actorsName')
const awards = document.querySelector('.awards')

const imdbScr = document.querySelector('.imdbScr')
const rotten = document.querySelector('.rotten')
const metacritic = document.querySelector('.metacritic')

const price = document.querySelector('.price')
const movies = document.querySelector('.movies')

const moviesPoster = document.querySelector('.moviesPoster')

// Get For Random Movies when refreah the page

async function RandomMovie() {
    const num = Random_Movies.length;
    const title = Math.floor(Math.random() * num)

    const randomTitle = Random_Movies[title];
    // console.log(randomTitle);
    const randeom_list = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=9fa67544&t=${randomTitle}`)

    const data = await randeom_list.json()
    console.log(data);

    var image = document.createElement('img')
    image.src = data.Poster
    moviesPoster.appendChild(image)
    // console.log(data.Poster);

    movieTitle.innerHTML = data.Title;
    listLi1.innerHTML = data.Rated
    listLi2.innerHTML = data.Released
    listLi3.innerHTML = data.Genre
    listLi4.innerHTML = data.Runtime
    imdb.innerHTML = data.imdbRating;
    plotPara.innerHTML = data.Plot
    directorName.innerHTML = data.Director
    counryName.innerHTML = data.Country;
    actorsName.innerHTML = data.Actors
    awards.innerHTML = data.Awards
    imdbScr.innerHTML = data.Ratings[0].Value
    rotten.innerHTML = data.Ratings[1].Value
    metacritic.innerHTML = data.Ratings[2].Value
    price.innerHTML = data.BoxOffice
    movies.innerHTML = data.Type

}
RandomMovie();
