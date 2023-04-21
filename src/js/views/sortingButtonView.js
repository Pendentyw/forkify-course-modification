import View from './View';

class SortingButtonView extends View {
  _parentElement = document.querySelector('.sorting');

  showSortingBtn() {
    document.querySelector('.sorting__dropdown-btn').classList.remove('hidden');
  }

  addHandlerToDropdownOnDocument(handler) {
    document.addEventListener('click', function (e) {
      const sortingBtn = document.querySelector('.sorting__dropdown-btn');
      if (
        e.target.getAttribute('data-sort-col') === null &&
        e.target.getAttribute('data-sort-dir') === null
      )
        return;
      const buttonSortDir = e.target.getAttribute('data-sort-dir');
      const buttonSortCol = e.target.getAttribute('data-sort-col');

      document.querySelector('.sorting__dropdown').classList.add('hidden');

      if (buttonSortCol === 'default') {
        sortingBtn.textContent = `Default`;
      } else {
        sortingBtn.textContent = `${
          buttonSortCol[0].toUpperCase() + buttonSortCol.slice(1)
        } : ${buttonSortDir === 'descending' ? 'Z-A' : 'A-Z'}`;
      }

      handler(buttonSortCol, buttonSortDir);
    });
  }

  addHandlerToCloseDropdownOutside() {
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
