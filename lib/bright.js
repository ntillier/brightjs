var brightJs = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    $: () => core_default,
    brightJs: () => core_default
  });

  // src/utils/operations.ts
  var toArray = (value) => Array.from(value);

  // src/utils/selector.ts
  var isValidAscii = (code) => code > 47 && code < 58 || code > 64 && code < 91 || code > 96 && code < 123;
  var HTMLTagsSelector = (root, query) => {
    query = query.trim();
    for (let i = 1; i < query.length; i++) {
      if (!isValidAscii(query.charCodeAt(i))) {
        return toArray(root.querySelectorAll(query));
      }
    }
    if (query.startsWith("#") && root === document) {
      return [document.getElementById(query)];
    }
    if (query.startsWith(".")) {
      return toArray(root.getElementsByClassName(query));
    }
    return toArray(root.querySelectorAll(query));
  };

  // src/core.ts
  var BrightJs = function(query) {
    console.log(HTMLTagsSelector(document, query));
  };
  BrightJs.prototype.extend = function(name, fn) {
    BrightJs.prototype[name] = function() {
      fn.call(this, ...arguments);
      return this;
    };
    return this;
  };
  BrightJs.prototype.freeze = function() {
    Object.freeze(BrightJs.prototype);
  };
  var core_default = BrightJs;
  return __toCommonJS(src_exports);
})();
