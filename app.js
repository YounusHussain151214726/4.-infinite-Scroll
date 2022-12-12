let count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=noYKskJ4WkmCijDaBrtZLovpbxKtHQAim2CZAG-EXSM&count=${count}`;

let imageArray = [];
let totalImg = 0;

let imgLoaded = 0;
let ready = false;

function onLoaded() {
  imgLoaded++;
  console.log(totalImg);
  console.log(imgLoaded);
  if (imgLoaded === totalImg) {
    ready = true;
    console.log(ready);
  }
}

const display = () => {
  imgLoaded = 0;
  totalImg = imageArray.length;
  let container = document.getElementById("container");

  imageArray.forEach((i) => {
    // let img = `<img class="im" src="${i.urls.regular}" alt="${i.alt_description}" />`;
    let img = document.createElement("img");
    img.setAttribute("class", "im");
    img.setAttribute("src", i.urls.regular);
    img.setAttribute("alt", i.alt_description);
    container.appendChild(img);

    img.addEventListener("load", onLoaded);
  });
};

const getImages = async () => {
  try {
    const request = await fetch(apiUrl);
    imageArray = await request.json();
    console.log("image", imageArray);
    display();
  } catch (error) {
    throw ("Oh! error is here", error);
  }
};
getImages();

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  console.log("scrolled");
  if (scrollTop + clientHeight >= scrollHeight - 1000 && ready) {
    console.log("i am bottom");
    ready = false;
    display();
  }
});
