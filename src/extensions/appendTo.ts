import { copyArray, parseHTML } from "../utils/operations";
import { NodeElement } from "../utils/types";
import { getType } from "../utils/validators";


export default function appendTo (...args: any[]) {
  console.log('appendTo')

  copyArray((arg) => {
    const type = getType(arg);

    if (type === 'bright') {
      arg.append(this);
    } else if (type === 'element') {
      copyArray(arg.appendChild.bind(arg), this.nodes);
    }
  }, args);
}