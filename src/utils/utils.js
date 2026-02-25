import dayjs from 'dayjs';

export function capitalizeFirstLetter(string) {
  if (!string){
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isDatesEqual(dateA, dateB){
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}
