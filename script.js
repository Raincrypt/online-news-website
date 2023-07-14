const API_KEY = "d4d9e9fb04704dfdbf4789437a7feb79";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("latest"));

let fetchNews = async(query) =>{
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
  const data = await res.json()
  bindData(data.articles);
}

let bindData = (articles) => {
  const cardContainer = document.querySelector("#card-container")
  const newsCardTemplate = document.querySelector("#template-news-card")

  cardContainer.innerHTML = '';

  articles.forEach(article => {
    if(!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);

    fillDataInCard(cardClone, article)

    cardContainer.appendChild(cardClone);
  });
}

let fillDataInCard = (card, article) => {
  const newImage = card.querySelector("#news-img");
  const newTitle = card.querySelector("#news-title");
  const newSource = card.querySelector("#news-source");
  const newDescription = card.querySelector("#news-description");

  newImage.src = article.urlToImage;
  newTitle.innerHTML = article.title;
  newDescription.innerHTML = article.description;


  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"
  })
  newSource.innerHTML = `${article.source.name} - ${date}`;

  card.firstElementChild.addEventListener("click", ()=>{
    window.open(article.url, "-blank")
  })
} 

let currentSelectNav = null;

let onNavItemClick = (id) =>{
  fetchNews(id);

  const navItem = document.getElementById(id);
  currentSelectNav?.classList.remove('active')
  currentSelectNav = navItem;
  currentSelectNav.classList.add('active')
}

const searchButton = document.querySelector('.search-btn')
const searchText = document.querySelector('.news-input')

searchButton.addEventListener('click', ()=>{
  const query = searchText.value;
  if(!query) return;
  fetchNews(query);
  currentSelectNav?.classList.remove('active')
  currentSelectNav = null;
})

let reload = () =>{
  window.location.reload();
}