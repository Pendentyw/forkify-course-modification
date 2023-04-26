import View from './View';
import icons from 'url:../../img/icons.svg';

class addIngredientView extends View {
  generateMarkup() {
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
export default new addIngredientView();
