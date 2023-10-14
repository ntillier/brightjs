import { copyArray, parseHTML } from "../utils/operations";
import { NodeElement } from "../utils/types";
import { getType } from "../utils/validators";


export default function append (...args: any[]) {
  const fragment = document.createDocumentFragment();

  copyArray((arg) => {
    const type = getType(arg);

    if (type === 'string') {
      copyArray(fragment.appendChild.bind(fragment), parseHTML(arg));
    } else if (type === 'bright') {
      copyArray(fragment.appendChild.bind(fragment), arg.nodes);
    } else if (type === 'element') {
      fragment.appendChild(arg);
    }
  }, args);

  if (this.fragment) {
    this.fragment.appendChild(fragment);
    return this;
  }

  // @ts-expect-error
  return this.each((node: NodeElement) => node.appendChild(fragment.cloneNode(true)));
}