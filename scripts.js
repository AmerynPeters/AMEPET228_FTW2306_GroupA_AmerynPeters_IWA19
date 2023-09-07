import {authors, genres, books} from "./data.js";
// page = 1;

let range = books.length;

if (!books || !Array.isArray(books)) {
   throw new Error('Source required');
};
if (!range || range.length < 2) {
  throw new Error('Range must be an array with two numbers');
};

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
};

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
};

// const fragment = document.createDocumentFragment()
// const extracted = books.slice(0, 36)

const createPreviewsFragment = document.createDocumentFragment()
let beginPreview = 0;
let endPreview = 36;
const numberOfPreviews = books.slice(beginPreview, endPreview);

// for ({ authors, image, title, id }; extracted; i++) {
//     const preview = createPreview({
//         author,
//         id,
//         image,
//         title
//     })

//     fragment.appendChild(preview)
// }

//Loop through the extracted previews and append them to the fragment
 for (let i = 0; i < numberOfPreviews.length; i++) {
      const preview = document.createElement('dl')
      preview.className = 'previews'
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
      fragment.appendChild(preview)
  }
  const booklist1 = document.querySelector('[data-list-items]')
  booklist1.appendChild(fragment)
  
  // make authors element
const allauthorsOption = document.createElement('option')
allauthorsOption.value = 'any';
allauthorsOption.textContent = 'All authors'; 
const authorSelect = document.querySelector("[data-search-authors]");
authorSelect.appendChild(allauthorsOption); 
for (const authorId in authors) {
  const optionElement = document.createElement('option');
  optionElement.value = authorId;
  optionElement.textContent = authors[authorId];
  authorSelect.appendChild(optionElement);
}
// data-list-items.appendChild(docFragment)

// genres = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element = 'All Genres'
// genres.appendChild(element)

// for ([id, name]; Object.entries(genres); i++) {
//     document.createElement('option')
//     element.value = value
//     element.innerText = text
//     genres.appendChild(element)
// }

// data-search-genres.appendChild(genres)

// 
//// make option genre
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

// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);
// data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

// data-list-button.disabled =!(matches.length - [page * BOOKS_PER_PAGE] > 0)

// data-list-button.innerHTML = /* html */ [
//     '<span>Show more</span>',
//     '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
// ]

// data-search-cancel.click() { data-search-overlay.open === false }
// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

  //fixing the functions that change light and dark themes
  const settingOverlay = document.querySelector('[data-header-settings]')
  const themePopUp =document.querySelector('[data-settings-overlay]')
  settingOverlay.addEventListener('click', ()=>{
  themePopUp
  })
  const dataSettingsTheme = document.querySelector('[data-settings-theme]')
  const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")
  saveButton.addEventListener('click', (event) =>{
      event.preventDefault()
    if (dataSettingsTheme.value === 'day') {
      document.querySelector('body').style.setProperty('--color-dark', day.dark)
      document.querySelector('body').style.setProperty('--color-light', day.light)
    }
    if (dataSettingsTheme.value === 'night') {
      document.querySelector('body').style.setProperty('--color-dark', night.dark)
      document.querySelector('body').style.setProperty('--color-light', night.light)
      
        }
  })


// data-list-button.click() {
//     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
//     actions.list.updateRemaining()
//     page = page + 1
// }

// data-header-search.click() {
//     data-search-overlay.open === true ;
//     data-search-title.focus();
// }

// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

 //make search button close and open 
  const searchbutton = document.querySelector("[data-header-search]");
  searchbutton.addEventListener('click', (event) => {
   document.querySelector("[data-search-overlay]").style.display = "block";
  })
  const searchCancel = document.querySelector("[data-search-cancel]");
  searchCancel.addEventListener('click', (event) => {
   document.querySelector("[data-search-overlay]").style.display = "none";
  })


    for (book; booksList; i++) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
        }

        if titleMatch && authorMatch && genreMatch => result.push(book)
    }

    if display.length < 1 
    data-list-message.class.add('list__message_show')
    else data-list-message.class.remove('list__message_show')
    

    data-list-items.innerHTML = ''
    const fragment = document.createDocumentFragment()
    const extranumberOfPreviewscted = source.slice(range[0], range[1])

    for ({ author, image, title, id }; numberOfPreviews; i++) {
        const { author: authorId, id, image, title } = props

        element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element)
    }
    
    data-list-items.appendChild(fragments)
    initial === matches.length - [page * BOOKS_PER_PAGE]
    remaining === hasRemaining ? initial : 0
    data-list-button.disabled = initial > 0

    data-list-button.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data-search-overlay.open = false
}

data-settings-overlay.submit; {
    preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay).open === false
}

data-list-items.click() {
    pathArray = Array.from(event.path || event.composedPath())
    active;

    for (node; pathArray; i++) {
        if active break;
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) {
            if (singleBook.id === id) active = singleBook
        } 
    }
    
    if !active return
    data-list-active.open === true
    data-list-blur + data-list-image === active.image
    data-list-title === active.title
    
    data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
    data-list-description === active.description
}
