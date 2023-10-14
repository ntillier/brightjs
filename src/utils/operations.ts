
export const toArray = (value: any): Array<any> => Array.from(value);

export const parseHTML = (html: string) => {
  const parent = document.createElement('div');
  parent.innerHTML = html;
  return parent.childNodes;
}

export const copyArray = (copyFn: (item: any) => void, array: any) => {
  for (let i = 0; i < array.length; i++) {
    copyFn(array[i]);
  }
}