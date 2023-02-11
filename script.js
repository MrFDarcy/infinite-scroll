const imageContainer = document.getElementById('imageContainer');
const loader = document.getElementById('loader');


const count = 10;

const apiKey = 'eiRlVYpPvGLChA-4bDJAZhz3JDUogWsOspjWnITNWio';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;



function displayPhotos(photosArray) {
    photosArray.forEach((photo) => {
        imagesLoaded = 0;
        totalImages = photosArray.length;



        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // Put <img> inside <a>, then put both inside imageContainer Element

        img.addEventListener('load', () => {

            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                ready = true;
                loader.hidden = true;
            }
        });


        item.appendChild(img);
        imageContainer.appendChild(item);


    });
}


async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const photosArray = await response.json();
        console.log(photosArray);

        displayPhotos(photosArray);




    } catch (error) {
        // Catch Error Here
    }


}


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});





getPhotos();