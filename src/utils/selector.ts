
import { toArray } from './operations';

// if the caracter is in the range [0-9A-Za-z]
const isValidAscii = (code: number): boolean => (code > 47 && code < 58) || (code > 64 && code < 91) || (code > 96 && code < 123) || code === 45 || code === 95;

export const HTMLTagsSelector = (root: Document | HTMLElement, query: string): Array<any> => {

  query = query.trim();

  if (query.length === 0) {
    return [];
  }

  for (let i = 1; i < query.length; i++) {

    if (!isValidAscii(query.charCodeAt(i))) {
      return toArray(root.querySelectorAll(query));
    }
  }

  if (query.startsWith('#') && root === document) {
    return [document.getElementById(query.substring(1))].filter((_) => _);
  }

  if (query.startsWith('.')) {
    return toArray(root.getElementsByClassName(query.substring(1)));
  }
  
  return toArray(root.getElementsByTagName(query));
}