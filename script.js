const searchForm = document.querySelector('form')
const movieContainer = document.querySelector('.movie-container')
const inputBox = document.querySelector('.inputBox');

const getMovieInfo = async (movieName) => {
  try {

    const myAPIKey = "7a89f248";
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=${myAPIKey}&t=${movieName}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Unable to fetch movie data");
    }
    const data = await response.json();

    showMovieData(data);
  } catch (error) {
    showErrorMessage("No Movie Found!!!");
  }
}

const showMovieData = (data) => {
  movieContainer.innerHTML = "";
  movieContainer.classList.remove('noBackground');
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

  const movieElement = document.createElement('div');
  movieElement.classList.add('movie-info');

  movieElement.innerHTML = `<h2>${Title}</h2>
                          <p><strong>Rating: &#11088</strong>${imdbRating}</p>`

  const movieGenreElement = document.createElement('div');
  movieGenreElement.classList.add('movie-genre');

  Genre.split(",").forEach(ele => {
    const p = document.createElement('p');
    p.innerText = ele;
    movieGenreElement.appendChild(p);
  })

  movieElement.appendChild(movieGenreElement);

  movieElement.innerHTML += `<p><strong>Release Date: </strong>${Released}</p>
                            <p><strong>Duration: </strong>${Runtime}</p>
                            <p><strong>Cast: </strong>${Actors}</p>
                            <p><strong>Plot: </strong>${Plot}</p>`;


  const moviePosterElement = document.createElement('div');
  moviePosterElement.classList.add('movie-poster');
  moviePosterElement.innerHTML = `<img src="${Poster}"/>`

  movieContainer.appendChild(moviePosterElement);
  movieContainer.appendChild(movieElement);
}

const showErrorMessage = (Message) => {

  movieContainer.innerHTML = `<h2>${Message}</h2>`;
}

const handleFormSubmission = (e) => {
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if (movieName !== '') {
    showErrorMessage("Fetching information...")
    getMovieInfo(movieName);
  } else {
    showErrorMessage("Enter movie name to get information");
  }
}

searchForm.addEventListener('submit', handleFormSubmission);