/* 
This code will load the state of the container-class
This must be ran before the video-js dom loads to avoid flickering on startup
*/ 

function getLocalStorageBoolean(itemName){
    return localStorage.getItem(itemName) == "true" ? true : false;
}

function toggleLocalBoolean(itemName){  
    return getLocalStorageBoolean(itemName) ? localStorage.setItem(itemName, "false") : localStorage.setItem(itemName, "true");
}

function loadState(itemName, divId){
    const workingDiv = document.getElementById(divId);
    if(getLocalStorageBoolean(itemName)){
        workingDiv.classList.add("container-fluid")
        workingDiv.classList.remove("container-xxl")
    } else {
        workingDiv.classList.add("container-xxl")
        workingDiv.classList.remove("container-fluid")
    }
}

loadState("container-class", "container-class")