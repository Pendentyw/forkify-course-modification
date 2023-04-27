import View from './View';
import icons from 'url:../../img/icons.svg';

class addIngredientView extends View {
  _parentElement = document.querySelector('.ingredients-container');

  // addHandlerIngredientsForm(handler) {
  //   this._parentElement.addEventListener('click', function (e) {
  //     if (e.target.matches('.remove-ingredient')) {
  //       const removeIngBtn = e.target.dataset.manage;
  //       handler(removeIngBtn);
  //     }

  //     if (e.target.matches('.add-ingredient')) {
  //       const addIngBtn = e.target.dataset.manage;
  //       this._parentElement.insertAdjacentHTML('afterbegin', markup);
  //       handler(addIngBtn);
  //     }
  //   });
  // }
  renderIngredients(data) {
    this._data = data;
    this._parentElement.insertAdjacentHTML('beforeend', this._generateMarkup());
  }

  // addIngredientHandler(handler, buttonClass) {
  //   this._parentElement.addEventListener('click', function (e) {
  //     const buttonType = e.target.closest(`${buttonClass}-ingredient`);
  //     if (e.target !== buttonType) return;
  //     if (!buttonType) return;
  //     handler(buttonType.dataset.manage);
  //   });
  // }

  addIngredientHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const addBtn = e.target.closest('.add-ingredient');
      if (e.target !== addBtn) return;
      if (!addBtn) return;
      handler(addBtn.dataset.manage);
    });
    //   // this._parentElement.addEventListener('click', function (e) {
    //   //   const btn = e.target.closest('.btn--remove-bookmark');
    //   //   if (!btn) return;
    //   //   handler(btn.dataset.bookmark);
    //   // });
  }

  _generateMarkup() {
    return `
      <label data-ingredient-index="${this._data.length}">Ingredient ${
      this._data.length + 1
    }</label>
      <div class="upload__column-ing" data-ingredient-col-index="${
        this._data.length
      }">
        <input
          class="ing-name-input"
          type="text"
          required
          data-ingredient-index="${this._data.length - 1}"
          name="ingredient-${this._data.length - 1}-description"
          placeholder="Ingredient name"
        />
        <input
          value="1"
          type="number"
          min="1"
          name="ingredient-${this._data.length - 1}-quantity"
          data-ingredient-index="${this._data.length - 1}"
          placeholder="Amount"
          class="quantity-input"
        />
        <input
          type="text"
          name="ingredient-${this._data.length - 1}-unit"
          data-ingredient-index="${this._data.length - 1}"
          class="unit-input"
          placeholder="unit"
          id="unit"
        /> 

        <svg class="remove-ingredient">
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
        <svg class="add-ingredient">
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </div>
      `;
  }
}
export default new addIngredientView();
