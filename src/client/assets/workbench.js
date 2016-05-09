(function (mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    module.exports = mod();
  else if (typeof define == "function" && define.amd) // AMD
    return define([], mod);
  else // Plain browser env
    (this || window).ExampleGlobal = mod();
})(function () {
  "use strict";

  var registerBridge = function (bridge) {
    this.bridge = bridge;
  }


  var addAngularComponent = function (componentType, anchorElement, widget) {
    var componentContainer = this.bridge.addComponent(componentType, anchorElement, widget);
  };

  return {
    'registerBridge': registerBridge,
    'addAngularComponent': addAngularComponent
  };
});