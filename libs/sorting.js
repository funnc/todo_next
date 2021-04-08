export const sorting = (items, order) => {
  if (items && items.length > 0) {
    items.sort((a, b) => {
      if (a.id > b.id) {
        return order === 'descendente' ? 1 : -1;
      }
      if (a.id < b.id) {
        return order === 'descendente' ? -1 : 1;
      }
      return 0;
    });
  }
};
