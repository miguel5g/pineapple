function remove_accent(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

module.exports = {
  remove_accent,
};
