
import { toArray } from './operations';

// if the caracter is in the range [0-9A-Za-z]
const isValidAscii = (code: number): boolean => (code > 47 && code < 58) || (code > 64 && code < 91) || (code > 96 && code < 123);

export const HTMLTagsSelector = (root: Document | HTMLElement, query: string): Array<any> => {

  // We trim the query
  query = query.trim();

  /*if (query.length === 0) {
    return [];
  }*/

  // We verify that each character is a valid character
  for (let i = 1; i < query.length; i++) {

    // we return the querySelectorAll if the caracter isn't a valid character
    if (!isValidAscii(query.charCodeAt(i))) {
      return toArray(root.querySelectorAll(query));
    }
  }

  // if it seems to be an id, and the root is the document...
  if (query.startsWith('#') && root === document) {
    return [document.getElementById(query)];
  }

  // if it seems to be a class
  if (query.startsWith('.')) {
    return toArray(root.getElementsByClassName(query));
  }

  return toArray(root.querySelectorAll(query));
}