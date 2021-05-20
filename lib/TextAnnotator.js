"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var Mark_1 = __importDefault(require("./Mark"));
var utils_1 = require("./utils");
var Split = function (props) {
    var _a;
    var MarkClass = (_a = props.customMark) !== null && _a !== void 0 ? _a : Mark_1["default"];
    return props.mark ? react_1["default"].createElement(MarkClass, __assign({}, props)) : (react_1["default"].createElement("span", { "data-start": props.start, "data-end": props.end }, props.content));
};
var TextAnnotator = function (props) {
    var getSpan = function (span) {
        var _a, _b;
        // TODO: Better typings here.
        return ((_b = (_a = props.getSpan) === null || _a === void 0 ? void 0 : _a.call(props, span)) !== null && _b !== void 0 ? _b : span);
    };
    var handleMouseUp = function () {
        var _a;
        var _b, _c;
        if (!props.onChange)
            return;
        var selection = window.getSelection();
        if (!((_b = selection.anchorNode) === null || _b === void 0 ? void 0 : _b.parentElement) || !((_c = selection.focusNode) === null || _c === void 0 ? void 0 : _c.parentElement)) {
            return;
        }
        var dataStart = parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10);
        var dataEnd = parseInt(selection.focusNode.parentElement.getAttribute('data-end'), 10);
        if (utils_1.selectionIsEmpty(selection)) {
            handleSplitClick({ start: dataStart, end: dataEnd });
            return;
        }
        var start = parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10) +
            selection.anchorOffset;
        var end = parseInt(selection.focusNode.parentElement.getAttribute('data-start'), 10) +
            selection.focusOffset;
        // happens when selection starts/ends 
        if (isNaN(start) || isNaN(end)) {
            window.getSelection().empty();
            return false;
        }
        if (utils_1.selectionIsBackwards(selection)) {
            ;
            _a = [end, start], start = _a[0], end = _a[1];
        }
        var added = getSpan({ start: start, end: end, text: content.slice(start, end) });
        var value = __spreadArrays(props.value, [added]);
        props.onChange(value, { added: added });
        window.getSelection().empty();
    };
    var handleSplitClick = function (_a) {
        var start = _a.start, end = _a.end;
        // Find and remove the matching split.
        var splitIndex = props.value.findIndex(function (s) { return s.start === start && s.end === end; });
        if (splitIndex >= 0) {
            var removed = props.value[splitIndex];
            var value_1 = __spreadArrays(props.value.slice(0, splitIndex), props.value.slice(splitIndex + 1));
            props.onChange(value_1, { removed: removed });
        }
    };
    var content = props.content, value = props.value, style = props.style, customMark = props.customMark;
    var splits = utils_1.splitWithOffsets(content, value);
    return (react_1["default"].createElement("div", { style: style, onMouseUp: handleMouseUp }, splits.map(function (split) { return (react_1["default"].createElement(Split, __assign({ key: split.start + "-" + split.end, customMark: customMark }, split))); })));
};
exports["default"] = TextAnnotator;
//# sourceMappingURL=TextAnnotator.js.map