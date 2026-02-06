export function capitalizeFirstLetter(string) {
  if (!string){
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function updateItem(items, update){
  return items.map((item) => item.id === update.id ? update : item);
}
