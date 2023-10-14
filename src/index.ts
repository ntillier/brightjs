
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

export default brightJs;