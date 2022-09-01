function toggleClass(itemName, divId){
    if(getLocalStorageBoolean(itemName)){
        toggleLocalBoolean(itemName)
        loadState(itemName, divId)
    } else {
        toggleLocalBoolean(itemName)
        loadState(itemName, divId)
    }
}