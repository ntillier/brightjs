import { HTMLTagsSelector } from "./utils/selector";

const BrightJs = function (query: string) {
    console.log(HTMLTagsSelector(document, query));
}

BrightJs.prototype.extend = function (name: string, fn: () => void) {
    BrightJs.prototype[name] = function () {
        fn.call(this, ...arguments);
        return this;
    }

    return this;
}

BrightJs.prototype.freeze = function () {
    Object.freeze(BrightJs.prototype);

}

export default BrightJs;