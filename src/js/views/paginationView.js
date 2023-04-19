import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _getPaginationOffset(pageLimit) {
    return (pageLimit - 1) / 2;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    let paginationCenter = curPage;
    const pageNumberLimit = 5;
    const paginationOffset = this._getPaginationOffset(pageNumberLimit);

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (numPages - paginationOffset < paginationCenter) {
      paginationCenter = numPages - paginationOffset;
    }

    if (paginationCenter <= paginationOffset) {
      paginationCenter = paginationOffset + 1;
    }
    let pagesArray = new Array(pageNumberLimit).fill(0);
    pagesArray = pagesArray.map((_, index) => {
      return paginationCenter - paginationOffset + index;
    });

    const buttons = pagesArray
      .map(element => {
        return `
      <button data-goto="${element}" class="btn--inline ${
          element > numPages ? 'hidden' : ''
        } pagination__btn ${element === curPage ? 'active' : ''}">
        <span>${element}</span>
      </button>
      `;
      })
      .join('');
    //page 1

    return `
    <button data-goto="${
      curPage > 1 ? curPage - 1 : ''
    }" class="btn--inline pagination__btn--prev ${
      curPage === 1 ? 'hidden' : ''
    }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
          </button>
    ${buttons}
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next ${
      curPage === numPages ? 'hidden' : ''
    }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
    return '';
  }
}

export default new PaginationView();
