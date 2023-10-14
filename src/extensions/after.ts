import { parseHTML } from "../utils/operations";
import { NodeElement } from "../utils/types";
import { isElement } from "../utils/validators";

export default function after (arg: any) {
  if (!arg) {
    return this.herit(this.list((node: NodeElement) => {

      // @ts-expect-error
      let next = node.nextSibling;

      while (!isElement(next)) {
          next = next.nextSibling;
          if (!next) {
              return null;
          }
      }
      return next;
    }));
  }

  if (typeof arg === 'string') {
    // @ts-expect-error
    this.each((node: NodeElement) => node.after(...parseHTML(arg)));
  } else if (arg.constructor.name === 'BrightJs') {
    // @ts-expect-error
    this.each((node: NodeElement) => node.after(...arg.nodes));
  } else {
    // @ts-expect-error
    this.each((node: NodeElement) => node.after(arg));
  }

  return this;
}