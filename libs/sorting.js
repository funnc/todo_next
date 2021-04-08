export const sorting = (items) => {
  if (items && items.length > 0) {
    items.sort((a, b) => {
      if (a.id > b.id) {
        return -1; // 오름차순 정렬
      }
      if (a.id < b.id) {
        return 1; // 오름차순 정렬
      }
      return 0;
    });
  }
};
