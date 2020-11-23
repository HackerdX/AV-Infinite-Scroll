const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

const count = 10;
const apiKey = 'a8hKG1wofwAEodiM3dKqR3e_FXGDuITmes1zR0gRgOI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API


//helper function for setting attributes for tag passed
function setElementAttributes(element, attributes){
    for( const key in attributes ){
        element.setAttribute(key, attributes[key]);
    }
}
//Create elements for links and photos, add to DOM
function displayPhotos(){
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        
        // create <a> to link to unsplash
        const item = document.createElement("a");
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
        
        //Put <img> inside <a>, then put both inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

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
    console.log("scrolled");
})

//Onload
getPhotos();