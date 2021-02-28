const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let imageLoaded = 0;
let totalImages = 0;
let ready = false;

const count = 30;
const apiKey = 'a8hKG1wofwAEodiM3dKqR3e_FXGDuITmes1zR0gRgOI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//helper function to check if each image is loaded
function ImageLoaded(){
    imageLoaded++;
    console.log(imageLoaded);
    if(imageLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready = ', ready);

    }
}


//helper function for setting attributes for tag passed
function setElementAttributes(element, attributes){
    for( const key in attributes ){
        element.setAttribute(key, attributes[key]);
    }
}



//Create elements for links and photos, add to DOM
function displayPhotos(){
    imageLoaded = 0;
    totalImages = photosArray.length;
    console.log('totalImages: ', totalImages);
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        
        // create <a> to link to unsplash
        const item = document.createElement("a");
        //used helper function below to not repeat code of setAttribute
        setElementAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        })
        
        // item.setAttribute("href", photo.links.html);
        // item.setAttribute("target", "_blank");
        
        
        //Create <img> for photo
        const img = document.createElement("img");
        setElementAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // img.setAttribute("src", photo.urls.regular);
        // img.setAttribute("alt", photo.alt_description);
        // img.setAttribute("title", photo.alt_description);

        //EventListener, check if each image is loaded
        img.addEventListener('load', ImageLoaded);
        
        //Put <img> inside <a>, then put both inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch(error){
        console.log(error);
    }
}



// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', ()=> {
    if((window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) && ready){
        // console.log('window.innerHeight: ', window.innerHeight);
        // console.log('window.scrollY: ', window.scrollY);
        // console.log('document.body.offsetHeight: ', document.body.offsetHeight);
        // console.log('a+b: ', window.innerHeight + window.scrollY);
        // console.log('c-d: ', document.body.offsetHeight - 1000)
        ready = false;
        getPhotos();
    }
})

//Onload
getPhotos();