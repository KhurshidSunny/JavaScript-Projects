const imgContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");
const count = 5;
let ready = false;
let totalImage;
let loadedImages = 0;
let photosArray = [];

const imageLoaded = function () {
  console.log("image loaded");
  loadedImages++;
  if (loadedImages === totalImage) {
    ready = true;
    console.log("ready", ready);
  }
};

const displayPhotos = function (data) {
  totalImage = data.length;
  console.log(totalImage);
  data.forEach((img) => {
    const html = ` <a href="${img.links.html}" target="_blank"> <img
    class="img"
    src="${img.urls.regular}"
    alt="${img.alt_description}"
    title="${img.alt_description}"
  /> </a>`;
    imgContainer.insertAdjacentHTML("beforeend", html);
    const imgEl = document.querySelector(".img");
    imgEl.src = img.urls.regular;
    imgEl.alt = img.alt_description;

    imgEl.addEventListener("load", imageLoaded);
  });
};

const getPhotos = async function () {
  const apiKey = "A0MmkuYvgCj7MmWs2a35NGxXbji7hEnK8arZryYaSFw";
  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  //   const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("The photo can not be found");
    photosArray = await response.json();

    displayPhotos(photosArray);

    console.log(photosArray);
  } catch (err) {
    console.log(`something went wrong ${err.message}, Try Again`);
  }
};

getPhotos();

window.addEventListener("scroll", function () {
  if (
    this.window.scrollY + this.window.innerHeight >=
    this.document.body.offsetHeight
  ) {
    console.log("scroll end");
  }
});

// const c = async function () {
//   const res = await fetch(apiUrl);
//   const data = await res.json();
//   console.log(data);
// };
// c();
