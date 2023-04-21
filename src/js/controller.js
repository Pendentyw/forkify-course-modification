// import icons from '../img/icons.svg'; parcel 1
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import sortingButtonView from './views/sortingButtonView';
import { MODAL_CLOSE_TIME } from './config';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    //loading
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);
    //rendering

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    sortingButtonView.showSortingBtn();
    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlDeleteBookmark = function (id) {
  model.deleteBookmark(id);

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_TIME);
  } catch (err) {
    console.error(';<', err);
    addRecipeView.renderError(err.message);
  }
};

const controlSortingBtn = function () {
  console.log(`btn-controlled`);
};

const controlSorting = function (buttonSortCol, buttonSortDir) {
  if (buttonSortCol === null && buttonSortDir === null) {
    return;
  }
  model.setSortingValues(buttonSortDir, buttonSortCol);

  if (buttonSortCol === 'default') {
    model.sortSearchResultsPageByDefault();
    resultsView.update(model.getSearchResultsPage());
  } else {
    model.sortSearchResultsPageByName();
    resultsView.update(model.getSearchResultsPage());
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  bookmarksView.addHandlerRemoveBookmark(controlDeleteBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  sortingButtonView.addHandlerToOpenDropdown(controlSortingBtn);
  sortingButtonView.addHandlerToDropdownOnDocument(controlSorting);
  sortingButtonView.addHandlerToCloseDropdownOutside(controlSortingBtn);
};

init();
