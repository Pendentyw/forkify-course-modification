import View from './View';

class SortingButtonView extends View {
  _parentElement = document.querySelector('.sorting');

  showSortingBtn() {
    document.querySelector('.sorting__dropdown-btn').classList.remove('hidden');
  }
  _addHandlerToCloseDropdwonOutside(handler) {
    document.addEventListener('click', function (e) {
      if (!e.target.matches('.sorting')) {
        document.querySelector('.sorting__dropdown').classList.add('hidden');
      }
    });
  }
  addHandlerToOpenDropdown(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const dropdownBtn = e.target.closest('.sorting__dropdown-btn');
      if (!dropdownBtn) return;

      if (e.target === dropdownBtn) {
        document.querySelector('.sorting__dropdown').classList.toggle('hidden');
      }
      e.stopPropagation();
    });

    this._addHandlerToCloseDropdwonOutside(handler);
    handler();
  }
}

export default new SortingButtonView();
