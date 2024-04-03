const generateButton = document.querySelector(".generate-button");
const memeTitle = document.querySelector(".meme-title");
const memeImage = document.querySelector(".meme-image");
const authorOutput = document.querySelector(".author");

function generateMeme() {
  fetch("https://meme-api.com/gimme/wholesomememes")
    .then((res) => res.json())
    .then((data) => {
      const { title, url, author } = data;
      authorOutput.innerText = author;
      memeTitle.innerText = title;
      memeImage.src = url;
    })
};

generateMeme();

generateButton.addEventListener("click", () => {
  generateMeme();
});
