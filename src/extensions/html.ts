import { NodeElement } from "../utils/types";

export default function setInnerHTML (html: string) {
  return this.each((node: NodeElement) => {
    // @ts-expect-error
    node.innerHTML = html;
  })
} 