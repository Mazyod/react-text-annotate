"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var Mark = function (props) { return (react_1["default"].createElement("span", { id: props.id, style: { backgroundColor: props.color || '#84d2ff', padding: '0 4px' }, "data-start": props.start, "data-end": props.end, onClick: function () { return props.onClick({ start: props.start, end: props.end }); } },
    props.content,
    props.tag && (react_1["default"].createElement("span", { style: { fontSize: '0.7em', fontWeight: 500, marginLeft: 6 } }, props.tag)))); };
exports["default"] = Mark;
//# sourceMappingURL=Mark.js.map