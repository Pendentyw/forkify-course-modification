import View from './View';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = '';

  _generateMarkup(bookmark = false) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
      <a class="preview__link ${
        this._data.id === id ? 'preview__link--active' : ''
      }" href="#${this._data.id}">
        <figure class="preview__fig">
          <img src="${this._data.image}" alt="${this._data.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${this._data.title}</h4>
          <p class="preview__publisher">${this._data.publisher}</p>
          <div class="preview__icons"> 
          <div class="preview__icons--icon-generated ${
            this._data.key ? '' : 'hidden'
          }">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          </div>
          </div>
          </a>
          ${
            bookmark
              ? `<div class="preview__icons--icon-generated preview__icons--remove-bookmark-icon btn--remove-bookmark" data-bookmark="${this._data.id}"> 
                  <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </div>`
              : ''
          }
    </li>
  `;
  }
}

export default new BookmarksView();
