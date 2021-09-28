export const getAddedBookIds = () => {
  const addedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return addedBookIds;
};

export const addBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('added_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('added_books');
  }
};

export const removeBookId = (bookId) => {
  const addedBookIds = localStorage.getItem('added_books')
    ? JSON.parse(localStorage.getItem('added_books'))
    : null;

  if (!addedBookIds) {
    return false;
  }

  const updatedBookIds = addedBookIds?.filter((addedBookId) => addedBookId !== bookId);
  localStorage.setItem('added_books', JSON.stringify(updatedBookIds));

  return true;
};
