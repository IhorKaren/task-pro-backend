const sortByPriority = (array, priority) => {
  return array.map((column) => {
    return {
      title: column.title,
      owner: column.owner,
      _id: column.id,
      cards: column.cards.filter((card) => card.priority === priority),
    };
  });
};

module.exports = sortByPriority;
