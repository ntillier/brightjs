import { parseHTML } from "../utils/operations";
import { NodeElement } from "../utils/types";
import { getType, isElement } from "../utils/validators";

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

  const type = getType(arg);

  if (type === 'string') {
    // @ts-expect-error
    this.each((node: NodeElement) => node.after(...parseHTML(arg)));
  } else if (type === 'bright') {
    // @ts-expect-error
    this.each((node: NodeElement) => node.after(...arg.nodes));
  } else {
    // @ts-expect-error
    this.each((node: NodeElement) => node.after(arg));
  }

  return this;
}