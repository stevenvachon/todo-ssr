"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (invalidations, propertyName) => {
  return invalidations.find(({ property }) => property === propertyName) !== undefined;
};