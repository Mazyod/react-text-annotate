import React from 'react';
import { Span } from './span';
interface TextSpan extends Span {
    text: string;
}
type TextBaseProps<T> = {
    content: string;
    value: T[];
    customMark?: any;
    onChange?: (value: T[], changes: {}) => any;
    getSpan?: (span: TextSpan) => T;
};
type TextAnnotatorProps<T> = React.HTMLAttributes<HTMLDivElement> & TextBaseProps<T>;
declare const TextAnnotator: <T extends Span>(props: TextAnnotatorProps<T>) => React.JSX.Element;
export default TextAnnotator;
