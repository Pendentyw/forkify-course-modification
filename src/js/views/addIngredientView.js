import View from './View';
import icons from 'url:../../img/icons.svg';

class addIngredientView extends View {
  _parentElement = document.querySelector('.ingredients-container');
  _form = document.querySelector('.upload');

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
      const removeIcon = e.target.closest('.remove-ingredient');
      if (e.target !== removeIcon) return;
      if (!removeIcon) return;
      const data = removeIcon.dataset.index;
      console.log(data);
      handler(data);
    });
  }

  addIngredientHandler(handler) {
    this._form.addEventListener('click', function (e) {
      const addIcon = e.target.closest('.add-ingredient');
      if (e.target !== addIcon) return;
      if (!addIcon) return;
      handler();
    });
  }

  _generateMarkup(index) {
    console.log(this._data);
    return `
      <label data-ingredient-index="${index}">Ingredient ${index + 1}</label>
      <div class="upload__column-ing" data-ingredient-col-index="${index}">
        <input
          value="${this._data[index].description}"
          class="ing-name-input"
          type="text"
          required
          data-ingredient-index="${index}"
          name="ingredient-${index}-description"
          placeholder="Ingredient name"
        />
        <input
        value="${this._data[index].quantity}"
          type="number"
          min="1"
          name="ingredient-${index}-quantity"
          data-ingredient-index="${index}"
          placeholder="Amount"
          class="quantity-input"
        />
        <input
          value="${this._data[index].unit}"
          type="text"
          name="ingredient-${index}-unit"
          data-ingredient-index="${index}"
          class="unit-input"
          placeholder="unit"
          id="unit"
        /> 
            <svg class="remove-ingredient ${
              index === 0 && this._data.length === index + 1 ? 'inactive' : ''
            }" data-manage="remove" data-index="${index}">
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        

        
      `;
  }

  //   _generateIconMarkup(remove = false, add = false) {
  //     return `
  //     <svg class="remove-ingredient ${remove ? '' : hidden}">
  //       <use href="${icons}#icon-minus-circle"></use>
  //     </svg>
  //     <svg class="add-ingredient ${add ? '' : hidden}">
  //       <use href="${icons}#icon-plus-circle"></use>
  //     </svg>
  //     </div>
  // `;
  //   }
}
export default new addIngredientView();
