import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

//main

async function initializeCode() {
  //document.getElementById("app").innerHTML = "<h1>Hello!</h1>";
  // add more here to get more breeds
  const breeds = ["samoyed", "shiba", "sheepdog", "pug"];

  // all breeds in list get own wiki container
  for (const breed of breeds) {
    const wikiItem = await addWiki(breed);
    document.getElementById("app").appendChild(wikiItem);
  }
}

// helper funcs

async function addWiki(breed) {
  const imgUrl = await getRndImage(breed);
  const wikitext = await getWikiText(breed);
  const container = document.createElement("div");
  container.classList.add("container");
  container.innerHTML = `<div class="wiki-item" >
    <h1 class="wiki-header">${breed}</h1>
    <div class="wiki-content">
      <p class="wiki-text">
      ${wikitext}
      </p>
      <div class="img-container">
        <img class="wiki-img" src="${imgUrl}">
      </div>
    </div>
  </div>`;
  return container;
}

async function getRndImage(breed) {
  try {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await res.json();
    return data.message;
  } catch (error) {
    console.error(error);
  }
}

async function getWikiText(breed) {
  let url = `https://en.wikipedia.org/api/rest_v1/page/summary/${breed}_(dog)`;
  // specific case for sheepdogs different url
  if (breed === "sheepdog") {
    url = `https://en.wikipedia.org/api/rest_v1/page/summary/Sheep_dog`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.extract;
  } catch (error) {
    console.error(error);
  }
}
