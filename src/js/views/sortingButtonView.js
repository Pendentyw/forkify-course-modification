import View from './View';

class SortingButtonView extends View {
  _parentElement = document.querySelector('.sorting');

  showSortingBtn() {
    document.querySelector('.sorting__dropdown-btn').classList.remove('hidden');
  }

  addHandlerToDropdownOnDocument(handler) {
    document.addEventListener('click', function (e) {
      const sortingBtn = document.querySelector('.sorting__dropdown-btn');
      if (e.target.getAttribute('data-set') === null) return;
      const buttonDataset = e.target.getAttribute('data-set');

      document.querySelector('.sorting__dropdown').classList.add('hidden');

      if (e.target.getAttribute('data-set') === 'default') {
        sortingBtn.textContent = 'Default';
      }

      if (e.target.getAttribute('data-set') === 'name-ascending') {
        sortingBtn.textContent = 'Name: A-Z';
      }

      if (e.target.getAttribute('data-set') === 'name-descending') {
        sortingBtn.textContent = 'Name: Z-A';
      }

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
