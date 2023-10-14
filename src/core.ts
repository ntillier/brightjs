import { HTMLTagsSelector } from "./utils/selector";

const BrightJs = function (query: string) {
    console.log(HTMLTagsSelector(document, query));
}

BrightJs.prototype.extend = function (name: string, fn: () => void) {
    BrightJs.prototype[name] = fn;
    return this;
}

export default BrightJs;