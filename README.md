# UrlParts

**Tiny (≈ 1 kB gzipped) zero‑dependency URL parser & builder.** Works everywhere from evergreen browsers to IE 11 (fallback via hidden `<a>` element if `URL` is missing).

```html
<script src="urlparts.js"></script>
```

---

## Why another library?

* Native APIs (`location`, `URL`) return a mix of properties, `undefined`s and browser‑specific quirks.
* Heavyweights like URI.js or qs add 10–30 kB when all you need is «split URL into parts» and «assemble back».
* UrlParts does **exactly** that – no query‑builders, no routing, zero dependencies.

---

## Quick Start

```js
// parse a string → object
const obj = UrlParts.parse('https://u:p@ex.com:8080/a/b?x=1&y=2#top');
/*  obj = {
      protocol : 'https',
      username : 'u',
      password : 'p',
      host     : 'ex.com:8080',
      hostname : 'ex.com',
      port     : '8080',
      path     : '/a/b',
      query    : { x:'1', y:'2' },
      hash     : 'top',
      href     : 'https://u:p@ex.com:8080/a/b?x=1&y=2#top'
    }
*/

// build a string from parts
const url = UrlParts.build({
  protocol:'https',
  username:'u', password:'p',
  hostname:'ex.com', port:8080,
  path:'/a/b',
  query:{ x:1, y:2 },
  hash:'top'
});
// → "https://u:p@ex.com:8080/a/b?x=1&y=2#top"
```

---

## API Reference

### `UrlParts.parse(url: string): Parsed`

Returns an object with the following keys (missing parts are **`null`**):

| key                     | example            | note                  |
| ----------------------- | ------------------ | --------------------- |
| `protocol`              | `'https'`          | **without** `:`       |
| `username` / `password` | `'u'` / `'p'`      | `null` if not present |
| `host`                  | `'ex.com:8080'`    | hostname + port       |
| `hostname`              | `'ex.com'`         |                       |
| `port`                  | `'8080'`           |                       |
| `path`                  | `'/a/b'`           |                       |
| `query`                 | `{ x:'1', y:'2' }` | always plain object   |
| `hash`                  | `'top'`            | without `#`           |
| `href`                  | original string    |                       |

---

### `UrlParts.build(parts: ParsedLike): string`

Creates a URL string. Provide only the parts you need; the rest will be omitted.

* `query` – plain object → serialised with `encodeURIComponent`.
* `hash` – give value **without** leading `#`.

---

### Helpers

| function                  | description                                 |
| ------------------------- | ------------------------------------------- |
| `UrlParts.qParse(search)` | `'?a=1&b=2' → { a:'1', b:'2' }`             |
| `UrlParts.qBuild(obj)`    | `{ a:1, b:2 } → 'a=1&b=2'` (no leading `?`) |

---

## File Size

```
urlparts.js  •  2.2 kB raw  •  ≈ 1.0 kB gzipped
```

---

## License

MIT © 2025
