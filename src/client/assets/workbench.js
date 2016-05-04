(function (mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    module.exports = mod();
  else if (typeof define == "function" && define.amd) // AMD
    return define([], mod);
  else // Plain browser env
    (this || window).WorkBench = mod();
})(function () {
  "use strict";

  var registerBridge = function (bridge) {
    this.bridge = bridge;
  }


  var addAngularComponent = function () {
    var angularContainer = document.getElementById("angular-app");
    var componentContainerElement = document.body.appendChild(document.createElement('div'));
    this.bridge.addComponent("componentType", componentContainerElement);
  };

  return {
    'registerBridge': registerBridge,
    'addAngularComponent': addAngularComponent
  };
});