import { NodeElement } from "../utils/types";

export default function setInnerText (text: string) {
  return this.each((node: NodeElement) => {
    // @ts-expect-error
    node.textContent = text;
  });
}