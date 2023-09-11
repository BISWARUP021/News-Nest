const api_key = "b4645edbb91146dd858e997464e97468";
const url = "https://newsapi.org/v2/everything?q=";
let headingText = document.getElementById("heading");

window.addEventListener("load", () => fetchNews("India"));


async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${api_key}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const cardContainer = document.getElementById("cards-container");
  const newsCardtemplate = document.getElementById("template-news-card");

  cardContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardtemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardContainer.appendChild(cardClone);
   

  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-image");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");
  const heading = cardClone.querySelector("#heading");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} 🗞️ ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

//Navigation category items search
function onNavItemClick(search) {
    headingText.style.display = "block";
    headingText.innerHTML = `Recent news on '${search}'`;
  fetchNews(search);
}

//search button usage
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

let formElement = document.querySelector("form");
formElement.addEventListener("submit", (event) => {
  const query = searchInput.value;
  event.preventDefault();
  if (!query) return;

  
  if(query){
    headingText.style.display = "block";
    headingText.innerHTML = `Recent news on '${query}'`;
    }


fetchNews(query);
  
});


//company logo usage
let logo = document.getElementById("logo-box");
logo.addEventListener("click",()=>{
    headingText.style.display = "none";
    fetchNews("India");
})


//Home button usage
let home = document.getElementById("home");
home.addEventListener("click",()=>{
    headingText.style.display = "none";
    fetchNews("India");
})



  