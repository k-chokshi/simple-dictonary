/**
 * @file Manages the functionalities of search .
 * @author kruti Chokshi <k-chokshi@gmail.com>
 * @version 1.0.0
 */
 import {
    search
} from './dictionary.js';

// Gloabal Diclarations/Elements
const searchText = document.getElementById('search-input');
const errorText = document.getElementById('error-text');
const searchSection = document.querySelector('.results');
var words = ``;

//On Enter Key press
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        //sanitize the word entered -remove the space and lowercase;
        var enteredWord = searchText.value.toLowerCase().trim();

        //Fetch the definations
        search(enteredWord).then(
            results => {
                //When results not available
                if ((results) == null) {
                    errorText.innerHTML = `OOpss... Can't find the meaning of "${enteredWord}". Please, try to search for another word.`;
                    errorText.classList.add("active");
                    //Reset the Search Result area
                    clearSearchResults();
                } else {
                    //clear the error msg if on screen.
                    errorText.innerHTML = "";
                    errorText.classList.remove("active");

                    //Reset the Search Result area
                    clearSearchResults();

                    //Create cards for each meaning
                    displaySearchResults(results);
                }
            }
        );
    }
});


/**
 * Function that renders HTML for search results
 * @author   Kruti Chokshi
 * @param    {object} results -JSON object from the API search
 */
function displaySearchResults(results) {
    for (let i in results[0].meanings) {
        words += ` <div class="card-detail"> 
                                            <li class="def">
                                                <span class="txt-meaning">Meaning</span><span> ${results[0].meanings[i].definitions[0].definition}</span>
                                                <span class="txt-example">Example </span> <span>"${results[0].meanings[i].definitions[0].example}"</span>
                                                <span class="txt-synonyms">Synonyms</span> <span>${results[0].meanings[i].definitions[0].synonyms}</span>
                                            </li> 
                                        </div>`;
    }

    let render_this = /*html*/ `  
    <ol class="search-cards" id="search-cards">
                                ${words}
                            </ol>   
                            `;
    //Add the htmls after the begining of the element
    searchSection.insertAdjacentHTML('afterbegin', render_this);
    //reset
    words = '';
}

/**
 * Function that clear search by removing the child elements of the results div
 * @author   Kruti Chokshi
 */
function clearSearchResults() {
    var e = document.querySelector('.results');
    if (e != null) {
        var child = e.lastElementChild;
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
    }
}