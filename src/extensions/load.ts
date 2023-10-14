import { NodeElement } from "../utils/types";

export default function load (url: string, opts: any) {
  fetch(url, opts)
    .then((res) => res.text())
    .then((text) => this.each((node: NodeElement) => {
      // @ts-expect-error
      node.innerHTML = text
    }));
  return this;
}