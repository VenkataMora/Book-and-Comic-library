/* select explore button*/
var exploreButton = document.querySelector(".explore");

/*select flex-container*/
var allContent = document.querySelector(".flex-container");

/* add eventListener to explore button when clicked */
exploreButton.addEventListener("click", function(){
    /* hide content and carousel */
    allContent.classList.add('hidden');
    
});