import View from './View';

class SortingButtonView extends View {
  _parentElement = document.querySelector('.sorting');

  showSortingBtn() {
    document.querySelector('.sorting__dropdown-btn').classList.remove('hidden');
  }
  _addHandlerToCloseDropdwonOutside(handler) {
    document.addEventListener('click', function (e) {
      if (!e.target.matches('.dropdown-btn')) {
        document.querySelector('.sorting__dropdown').classList.add('hidden');
      }
      handler();
    });
  }

  addHandlerToOpenDropdown(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const dropdownBtn = e.target.closest('.sorting__dropdown-btn');
      if (!dropdownBtn) return;

      if (e.target === dropdownBtn) {
        document.querySelector('.sorting__dropdown').classList.toggle('hidden');
      }
      console.log(e.target);
      e.stopPropagation();
    });

    this._addHandlerToCloseDropdwonOutside(handler);
    handler();
  }
}

export default new SortingButtonView();
