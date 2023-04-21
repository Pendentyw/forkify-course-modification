import { API_URL, RES_PER_PAGE, KEY } from './config';
import { AJAX } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
    sorting: {
      sortColumn: null,
      sortDirection: null,
      sortDisplay: [],
    },
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
    // if recipe key doesnt exist spread does nothing, if it does the key obj is created and spread
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    console.error(`${err} ;)`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.page = 1;
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map((recipe, index) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        defaultIndex: index,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch (err) {
    console.error(`${err} ;)`);
    throw err;
  }
};

// const recFoodSort = dogs.sort((dog1, dog2) => dog1.recFood - dog2.recFood);

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  // state.search.results.reverse();

  if (state.search.sorting.sortColumn !== null) {
    console.log('lmao');
    return state.search.sorting.sortDisplay.slice(start, end);
  }
  return state.search.results.slice(start, end);
};

export const setSortingValues = function (buttonSortDir, buttonSortCol) {
  state.search.sorting.sortColumn = buttonSortCol;
  state.search.sorting.sortDirection = buttonSortDir;
};

export const sortSearchResultsPageByName = function () {
  const result = [...state.search.results].sort((a, b) => {
    a[state.search.sorting.sortColumn].toLowerCase();
    b[state.search.sorting.sortColumn].toLowerCase();
    return a[state.search.sorting.sortColumn].localeCompare(
      b[state.search.sorting.sortColumn]
    );
  });
  if (state.search.sorting.sortDirection === 'descending') {
    result.reverse();
  }
  console.log(result);
  state.search.sorting.sortDisplay = result;
};

export const sortSearchResultsPageByDefault = function () {
  state.search.sorting.sortDisplay.sort(
    (a, b) => a.defaultIndex - b.defaultIndex
  );
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use correct format ;)'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await AJAX(
      `${API_URL}?search=${recipe.title}&key=${KEY}`,
      recipe
    );
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
