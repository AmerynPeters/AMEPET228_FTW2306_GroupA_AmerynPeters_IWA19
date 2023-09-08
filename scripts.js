import {authors, genres, books} from "./data.js";

//make the first page 36 books long
let range = books.length;

if (!books || !Array.isArray(books)) {
   throw new Error('Source required');
};
if (!range || range.length < 2) {
  throw new Error('Range must be an array with two numbers');
};

// colors for night and day
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
};

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
};

//fixing the functions that change light and dark themes
const settingOverlay = document.querySelector('[data-header-settings]')
const themePopUp = document.querySelector('[data-settings-overlay]')
settingOverlay.addEventListener('click', ()=>{themePopUp})
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")
saveButton.addEventListener('click', (event) =>{event.preventDefault()
    if (dataSettingsTheme.value === 'day') {
      document.querySelector('body').style.setProperty('--color-dark', day.dark)
      document.querySelector('body').style.setProperty('--color-light', day.light)
    }
    if (dataSettingsTheme.value === 'night') {
      document.querySelector('body').style.setProperty('--color-dark', night.dark)
      document.querySelector('body').style.setProperty('--color-light', night.light)
    }
  })

//Make a fragment of the document for the previews
const createPreviewsFragment = document.createDocumentFragment()
let beginPreview = 0;
let endPreview = 36;
const numberOfPreviews = books.slice(beginPreview, endPreview);

//Loop through the extracted previews and append them to the fragment
 for (let i = 0; i < numberOfPreviews.length; i++) {
      const preview = document.createElement('dl')
      preview.className = 'preview'
      preview.dataset.id = books[i].id
      preview.dataset.title = books[i].title
      preview.dataset.image = books[i].image
      preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`
      preview.dataset.description = books[i].description
      preview.dataset.genre = books[i].genres
      preview.innerHTML= /*html*/`
      <div>
      <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
      </div>
      <div class='preview__info'>
      <dt class='preview__title'>${books[i].title}<dt>
      <dt class='preview__author'> By ${authors[books[i].author]}</dt>
      </div>`
      createPreviewsFragment.appendChild(preview);
  }
  const booklist1 = document.querySelector('[data-list-items]')
  booklist1.appendChild(createPreviewsFragment);
  
// make authors element
const allauthorsOption = document.createElement('option')
allauthorsOption.value = "any";
allauthorsOption.textContent = "All authors"; 
const authorSelect = document.querySelector("[data-search-authors]");
authorSelect.appendChild(allauthorsOption); 
for (const authorId in authors) {
  const optionElement = document.createElement("option");
  optionElement.value = authorId;
  optionElement.textContent = authors[authorId];
  authorSelect.appendChild(optionElement);
}

// make genres element
const genreSelect = document.querySelector("[data-search-genres]");
const allGenresOption = document.createElement('option');
allGenresOption.value = 'any';
allGenresOption.innerText = 'All Genres';
genreSelect.appendChild(allGenresOption);
for (const [genreId, genreName] of Object.entries(genres)) {
  const optionElement = document.createElement('option');
  optionElement.value = genreId;
  optionElement.textContent = genreName;
  genreSelect.appendChild(optionElement)
}

// make search fxn to store genres and authors to choose from
const authorsFragment = document.createDocumentFragment();
let element1 = document.createElement("option");
element1.value = "any";
element1.innerText = "All Authors";
authorsFragment.appendChild(element1);
for (let [id, name] of Object.entries(authors)) {
  const element1 = document.createElement("option");
  const value = id;
  const text = name;
  element1.value = value;
  element1.innerText = text;
  authorsFragment.appendChild(element1);
  };
document.querySelector("[data-search-authors]").appendChild(authorsFragment);
const genresFragment = document.createDocumentFragment();
let element2 = document.createElement("option");
element2.value = "any";
element2.innerText = "All Genres";
genresFragment.appendChild(element2);
for (let [id, name] of Object.entries(genres)) {
  const element = document.createElement("option");
  const value = id;
  const text = name;
  element.value = value;
  element.innerText = text;
  genresFragment.appendChild(element);
  };
document.querySelector("[data-search-genres]").appendChild(genresFragment);

//making the show more button:
  const showMoreButton = document.querySelector("[data-list-button]");
  const numberOfBooks = Math.min(books.length - endPreview,)
  const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numberOfBooks})</span>`
  showMoreButton.innerHTML = showMoreButtonText

  showMoreButton.addEventListener("click", () => {
  //reassigned the vars
  beginPreview += 36;
  endPreview += 36;
  const startIndex = beginPreview;
  const endIndex = endPreview;

  // Used slice method to extract a subset of the array based on the updated vars
  const pull = books.slice(startIndex, endIndex);

  // Loop  books and create a preview element for each one
    for (const { author, image, title, id, description, published } of pull) {
  //makes preview element and set its class and dataset attributes
  const preview = document.createElement("dl");
  preview.className = "preview";
  preview.dataset.id = id;
  preview.dataset.title = title;
  preview.dataset.image = image;
  preview.dataset.subtitle = `${authors[author]} (${new Date(published).getFullYear()})`;
  preview.dataset.description = description;
  // Sets the innerHTML of the preview element to display images, titles, and authors
  preview.innerHTML = `
    <div>
      <image class='preview__image' src="${image}" alt="book pic"}/>
      </div>
      <div class='preview__info'>
      <dt class='preview__title'>${title}<dt>
      <dt class='preview__author'> By ${authors[author]}</dt>
    </div>`;

  // Appends the preview element to the fragment
  createPreviewsFragment.appendChild(preview);
 };

// Gets the list of books and attaches it to the previous list so that the next 36 books show up when user clicks "show more" 
const booklist1 = document.querySelector("[data-list-items]");
booklist1.appendChild(createPreviewsFragment);

// Updates the text of the button to display how many more items will be displayed
const numberOfBooks = Math.min(books.length - endIndex);
const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numberOfBooks})`;
showMoreButton.innerHTML = showMoreButtonText;
});

//Settings button
const settingsButton = document.querySelector("[data-header-settings]");
settingsButton.addEventListener("click", (event) => {
document.querySelector("[data-settings-overlay]").style.display = "block";
});

//make search button close and open 
const searchbutton = document.querySelector("[data-header-search]");
searchbutton.addEventListener("click", (event) => {
document.querySelector("[data-search-overlay]").style.display = "block";
});
const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").style.display = "none";
});

//Cancel button
const cancelButton = document.querySelector("[data-settings-cancel]");
cancelButton.addEventListener("click", (event) => {
document.querySelector("[data-settings-overlay]").style.display = "none";
});

//Display book details
const toggleDetails = (event) => {
const overlay1 = document.querySelector("[data-list-active]");
const title = document.querySelector("[data-list-title]");
const subtitle = document.querySelector("[data-list-subtitle]");
const description = document.querySelector("[data-list-description]");
const image1 = document.querySelector("[data-list-image]");
const imageblur = document.querySelector("[data-list-blur]");
event.target.dataset.id ? (overlay1.style.display = "block") : undefined;
event.target.dataset.description ? (description.innerHTML = event.target.dataset.description): undefined;
event.target.dataset.subtitle ? (subtitle.innerHTML = event.target.dataset.subtitle) : undefined;
event.target.dataset.title ? (title.innerHTML = event.target.dataset.title) : undefined;
event.target.dataset.image ? image1.setAttribute("src", event.target.dataset.image) : undefined;
event.target.dataset.image ? imageblur.setAttribute("src", event.target.dataset.image): undefined;
  };
const closeDetails = document.querySelector("[data-list-close]");
closeDetails.addEventListener("click", (event) => {
    document.querySelector("[data-list-active]").style.display = "none";
  });

//Display book information when clicked 
const click = document.querySelector('[data-list-items]');
click.addEventListener('click', toggleDetails);

// Make a cancel button mode
const cancelButtn = document.querySelector('[data-settings-cancel]')
cancelButtn.addEventListener( "click", () =>{
});
