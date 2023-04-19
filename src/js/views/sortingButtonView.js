import View from './View';

class SortingButtonView extends View {
  _parentElement = document.querySelector('.sorting');

  showSortingBtn() {
    document.querySelector('.sorting__dropdown-btn').classList.remove('hidden');
  }
  addHandlerToDropdownOnDocument(handler) {
    document.addEventListener('click', function (e) {
      if (e.target.dataset.dataSet === null) return `pizza`;
      const buttonDataset = e.target.getAttribute('data-set');
      handler(buttonDataset);
    });
  }

  addHandlerToCloseDropdownOutside(handler) {
    document.addEventListener('click', function (e) {
      if (!e.target.matches('.dropdown-btn')) {
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
      handler();
    });
  }
}

export default new SortingButtonView();
