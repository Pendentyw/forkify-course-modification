import View from './View';
import icons from 'url:../../img/icons.svg';

class addIngredientView extends View {
  _parentElement = document.querySelector('.ingredients-container');
  _form = document.querySelector('.upload');

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
    this._clear();
    this._data.forEach((el, index) => {
      this._parentElement.insertAdjacentHTML(
        'beforeend',
        this._generateMarkup(index)
      );
    });
  }

  removeIngredientHandler(handler) {
    this._form.addEventListener('click', function (e) {
      const removeIcon = e.target.closest(`.remove-ingredient`);
      if (e.target !== removeIcon) return;
      if (!removeIcon) return;
      handler();
    });
  }

  addIngredientHandler(handler) {
    this._form.addEventListener('click', function (e) {
      const addIcon = e.target.closest('.add-ingredient');
      if (e.target !== addIcon) return;
      if (!addIcon) return;
      handler();
    });
    //   // this._parentElement.addEventListener('click', function (e) {
    //   //   const btn = e.target.closest('.btn--remove-bookmark');
    //   //   if (!btn) return;
    //   //   handler(btn.dataset.bookmark);
    //   // });
  }

  _generateMarkup(index) {
    return `
      <label data-ingredient-index="${index}">Ingredient ${index + 1}</label>
      <div class="upload__column-ing" data-ingredient-col-index="${
        this._data.length
      }">
        <input
          class="ing-name-input"
          type="text"
          required
          data-ingredient-index="${index}"
          name="ingredient-${index}-description"
          placeholder="Ingredient name"
        />
        <input
          value="1"
          type="number"
          min="1"
          name="ingredient-${index}-quantity"
          data-ingredient-index="${index}"
          placeholder="Amount"
          class="quantity-input"
        />
        <input
          type="text"
          name="ingredient-${index}-unit"
          data-ingredient-index="${index}"
          class="unit-input"
          placeholder="unit"
          id="unit"
        /> 
      
        
      `;
  }

  _generateIconMarkup(remove = false, add = false) {
    return `
    <svg class="remove-ingredient ${remove ? '' : hidden}">
      <use href="${icons}#icon-minus-circle"></use>
    </svg>
    <svg class="add-ingredient ${add ? '' : hidden}">
      <use href="${icons}#icon-plus-circle"></use>
    </svg>
    </div>
`;
  }
}
export default new addIngredientView();
