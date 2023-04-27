import View from './View';
import addIngredientView from './addIngredientView';
import icons from 'url:../../img/icons.svg';
import { render } from 'sass';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addIngredientInputsHandler(this._generateMarkup());
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addIngredientInputsHandler(markup) {
    const uploadColumn = this._parentElement.querySelector(
      '.ingredients-container'
    );

    uploadColumn.addEventListener('click', function (e) {
      if (e.target.matches('.remove-ingredient')) {
        uploadColumn.insertAdjacentHTML('beforeend', markup);
      }
      if (e.target.matches('.add-ingredient')) {
      }
    });
  }

  addHandlerUpload(handler) {
    this._window.addEventListener('submit', function (e) {
      e.preventDefault();
      const upload = this.querySelector('.upload');
      const dataArr = [...new FormData(upload)];
      const data = Object.fromEntries(dataArr);
      console.log(data);
      handler(data);
    });
  }

  _generateMarkup() {
    return `
      <label data-ingredient-index="0">Ingredient 1</label>
      <div class="upload__column-ing" data-ingredient-col-index="0">
        <input
          class="ing-name-input"
          type="text"
          required
          data-ingredient-index="0"
          name="ingredient-0-description"
          placeholder="Ingredient name"
        />
        <input
          value="1"
          type="number"
          min="1"
          name="ingredient-0-quantity"
          data-ingredient-index="0"
          placeholder="Amount"
          class="quantity-input"
        />
        <input
          type="text"
          name="ingredient-0-unit"
          data-ingredient-index="0"
          class="unit-input"
          placeholder="unit"
          id="unit"
        /> 

        <svg class="remove-ingredient">
          <use href="src/img/icons.svg#icon-minus-circle"></use>
        </svg>
        <svg class="add-ingredient">
          <use href="src/img/icons.svg#icon-plus-circle"></use>
        </svg>
      </div>
      `;
  }
}

export default new AddRecipeView();
