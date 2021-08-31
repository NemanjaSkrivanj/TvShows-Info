API_URL = 'https://api.themoviedb.org/3/tv/popular?api_key=5a167757d6e9c4735a26ebc208d1f464&language=en-US&page=1'

SEARCH_URL = 'https://api.themoviedb.org/3/search/tv?api_key=5a167757d6e9c4735a26ebc208d1f464&query="'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const form = document.getElementById('form');

const search = document.getElementById('search')

const main = document.getElementsByTagName("main")[0];

async function getTvShows(url)
{
    const res = await fetch(url);
    const data = await res.json()

    console.log(data.results);

    showTvShows(data.results)
}

function showTvShows(shows) 
{

    main.innerHTML = '';
    shows.forEach(show => 
        {
            const { name, poster_path, vote_average, overview} = show

            const div = document.createElement('div');
            div.classList.add('show')

            const innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="">
            <div class="info" id="info">
                <p class="title" id="title">${name}</p>
                <p id="rating" class="${ratingColor(vote_average)}">${vote_average}</p>
            </div>
            <div class="overview" id="overview">
                ${overview}
            </div>
            `
            div.innerHTML = innerHTML;

            main.appendChild(div)
        })
}

function ratingColor(rating)
{
    if(rating >= 8)
    {
        return 'green'
    }
    if(rating > 5)
    {
        return 'yellow'
    }
    else 
    {
        return 'red'
    }
}


getTvShows(API_URL)


form.addEventListener("submit", (e) =>
{
    e.preventDefault();

    const searchValue = search.value;

    if(searchValue && searchValue !== "")
    {
        getTvShows(SEARCH_URL + searchValue);

        search.value = "";
    }
    else 
    {
        window.location.reload();
    }
})
