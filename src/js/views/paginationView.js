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

    console.log(numPages);
    let pagesArray = new Array(pageNumberLimit).fill(0);
    pagesArray = pagesArray.map((_, index) => {
      return paginationCenter - paginationOffset + index;
    });

    const buttons = pagesArray
      .map(element => {
        return `
      <button data-goto="${element}" class="btn--inline pagination__btn ${
          element === curPage ? 'active' : ''
        }">
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
    // if (curPage === 1) {
    //   return `
    //   <button data-goto="${curPage}" class="btn--inline pagination__btn--prev active">
    //     <span>${curPage}</span>
    //   </button>
    //   <button data-goto="${
    //     curPage + 1
    //   }" class="btn--inline pagination__btn--number">
    //       <svg class="search__icon">
    //       <use href="${icons}#icon-arrow-right"></use>
    //     </svg>
    //   </button>
    //   `;
    // }
    //page 1 no more pages

    // //last page
    // if (curPage === numPages && numPages > 1) {
    //   return `
    //   <button data-goto="${
    //     curPage - 1
    //   }" class="btn--inline pagination__btn--prev">
    //     <svg class="search__icon">
    //       <use href="${icons}#icon-arrow-left"></use>
    //     </svg>

    //   </button>
    //   `;
    // }

    //other pages
    //   if (curPage <= numPages && curPage >= 1) {
    //     return `
    //     <button data-goto="${
    //       curPage - 1
    //     }" class="btn--inline pagination__btn--prev ${curPage === 1 ? 'hidden' : ''}">
    //       <svg class="search__icon">
    //         <use href="${icons}#icon-arrow-left"></use>
    //       </svg>
    //     </button>
    //    ${
    //      curPage - 2 < 1
    //        ? ''
    //        : ` <button data-goto="${
    //            curPage - 2
    //          }" class="btn--inline pagination__btn ${curPage === 1 ? 'hidden' : ''}">
    //    <span>${curPage - 2}</span>
    //  </button>`
    //    }
    //     <button data-goto="${curPage - 1}" class="btn--inline pagination__btn">
    //       <span>${curPage - 1}</span>
    //     </button>
    //     <button data-goto="${curPage}" class="btn--inline pagination__btn active">
    //       <span>${curPage}</span>
    //     </button>
    //     <button data-goto="${
    //       curPage + 1 > numPages ? '' : curPage + 1
    //     }" class="btn--inline pagination__btn ${curPage + 1 > numPages ? 'hidden' : ''}">
    //       <span>${curPage + 1 > numPages ? '' : curPage + 1}</span>
    //     </button>
    //     <button ${
    //       curPage + 2 > numPages ? '' : `data-goto="curPage + 2"`
    //     } class="btn--inline  pagination__btn ${curPage + 2 > numPages ? 'hidden' : ''}">
    //       <span>${curPage + 2 > numPages ? '' : curPage + 2}</span>
    //     </button>
    //     ${curPage - 2 < 1 ? `<button data-goto="${
    //    curPage + 3
    //     }" class="btn--inline  pagination__btn">
    //       <span>${curPage + 3}</span>
    //     </button>` : ''}
    //     <button data-goto="${
    //       curPage + 1
    //     }" class="btn--inline pagination__btn--next ${curPage === numPages ? 'hidden' : ''}">
    //       <svg class="search__icon">
    //         <use href="${icons}#icon-arrow-right"></use>
    //       </svg>
    //     </button>
    //     `;
    //   }

    return '';
  }
}

export default new PaginationView();
