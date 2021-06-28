# react-text-annotate
[![NPM](https://img.shields.io/npm/v/react-text-annotate)](https://www.npmjs.com/package/react-text-annotate)

<img width="380" alt="image" src="https://user-images.githubusercontent.com/860511/123715258-91e43e00-d880-11eb-9939-e4580bb2c38e.png">

A React component for interactively highlighting parts of text.

## Usage

React `16.8.0` or higher is required as a peer dependency of this package.

```
npm install --save react-text-annotate
```

[Docs](https://mcamac.github.io/react-text-annotate/)

## Examples

A simple controlled annotation.

```tsx
import {TokenAnnotator, TextAnnotator} from 'react-text-annotate'

<TokenAnnotator
  tokens={['My', 'text', 'needs', 'annotating', 'for', 'NLP', 'training']}
  value={[{start: 5, end: 6, tag: 'TOPIC', color: '#EEE'}]}
/>
```
