import React from 'react'

import Mark from './Mark'
import {selectionIsEmpty, selectionIsBackwards, splitWithOffsets} from './utils'
import {Span} from './span'

const Split = props => {
  const MarkClass = props.customMark ?? Mark;
  return props.mark ? <MarkClass {...props} /> : (
    <span
      data-start={props.start}
      data-end={props.end}
    >
      {props.content}
    </span>
  )
}

interface TextSpan extends Span {
  text: string
}

type TextBaseProps<T> = {
  content: string
  value: T[]
  customMark?: any
  onChange?: (value: T[], changes: {}) => any
  getSpan?: (span: TextSpan) => T
  // TODO: determine whether to overwrite or leave intersecting ranges.
}

type TextAnnotatorProps<T> = React.HTMLAttributes<HTMLDivElement> & TextBaseProps<T>

const TextAnnotator = <T extends Span>(props: TextAnnotatorProps<T>) => {
  const getSpan = (span: TextSpan): T => {
    // TODO: Better typings here.
    return (props.getSpan?.(span) ?? span) as T
  }

  const handleMouseUp = () => {
    if (!props.onChange) return

    const selection = window.getSelection()

    if (!selection.anchorNode?.parentElement || !selection.focusNode?.parentElement) {
      return
    }

    let dataStart = parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10)
    let dataEnd = parseInt(selection.focusNode.parentElement.getAttribute('data-end'), 10)

    if (selectionIsEmpty(selection)) {
      handleSplitClick({start: dataStart, end: dataEnd})
      return
    }

    let start =
      parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10) +
      selection.anchorOffset
    let end =
      parseInt(selection.focusNode.parentElement.getAttribute('data-start'), 10) +
      selection.focusOffset

    // happens when selection starts/ends 
    if (isNaN(start) || isNaN(end)) {
      window.getSelection().empty()
      return false
    }

    if (selectionIsBackwards(selection)) {
      ;[start, end] = [end, start]
    }

    const added = getSpan({start, end, text: content.slice(start, end)})
    const value = [...props.value, added]
    props.onChange(value, { added })

    window.getSelection().empty()
  }

  const handleSplitClick = ({start, end}) => {
    // Find and remove the matching split.
    const splitIndex = props.value.findIndex(s => s.start === start && s.end === end)
    if (splitIndex >= 0) {
      const removed = props.value[splitIndex]
      const value = [...props.value.slice(0, splitIndex), ...props.value.slice(splitIndex + 1)]
      props.onChange(value, { removed })
    }
  }

  const {content, value, style, customMark} = props
  const splits = splitWithOffsets(content, value)
  return (
    <div style={style} onMouseUp={handleMouseUp}>
      {splits.map(split => (
        <Split key={`${split.start}-${split.end}`} customMark={customMark} {...split} />
      ))}
    </div>
  )
}

export default TextAnnotator
