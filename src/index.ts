
import BrightJs from "./core";

const brightJs = (...args) => {
  return new BrightJs(...args);
}

brightJs.extend = (name: string, fn: () => void) => {
  BrightJs.prototype[name] = fn;
  return brightJs;
}

brightJs.ready = (fn: () => void) => {
  document.addEventListener("DOMContentLoaded", fn, false);
}

brightJs.getJSON = (url: string, args: any) => fetch(url, args).then((res) => res.json());

brightJs.delay = (ms: number) => new Promise((resolve) => setTimeout(resolve.bind(null, true), ms))

export default brightJs;