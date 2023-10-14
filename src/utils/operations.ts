
export const toArray = (value: any): Array<any> => Array.from(value);

export const parseHTML = (html: string) => {
  const parent = document.createElement('div');
  parent.innerHTML = html;
  return parent.children;
}