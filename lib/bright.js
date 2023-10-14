var brightJs = (function () {
  'use strict';

  var toArray = function(value) {
      return Array.from(value);
  };

  // if the caracter is in the range [0-9A-Za-z]
  var isValidAscii = function(code) {
      return code > 47 && code < 58 || code > 64 && code < 91 || code > 96 && code < 123;
  };
  var HTMLTagsSelector = function(root, query) {
      // We trim the query
      query = query.trim();
      /*if (query.length === 0) {
      return [];
    }*/ // We verify that each character is a valid character
      for(var i = 1; i < query.length; i++){
          // we return the querySelectorAll if the caracter isn't a valid character
          if (!isValidAscii(query.charCodeAt(i))) {
              return toArray(root.querySelectorAll(query));
          }
      }
      // if it seems to be an id, and the root is the document...
      if (query.startsWith("#") && root === document) {
          return [
              document.getElementById(query)
          ];
      }
      // if it seems to be a class
      if (query.startsWith(".")) {
          return toArray(root.getElementsByClassName(query));
      }
      return toArray(root.querySelectorAll(query));
  };

  var BrightJs = function BrightJs(query) {
      console.log(HTMLTagsSelector(document, query));
  };
  BrightJs.prototype.extend = function(name, fn) {
      BrightJs.prototype[name] = fn;
      return this;
  };
  BrightJs.prototype.freeze = function() {
      Object.freeze(BrightJs.prototype);
  };

  return BrightJs;

})();
