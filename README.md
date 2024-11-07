![](https://github.com/carloitaben/react-liquid/raw/main/.github/assets/39hvucmkymma1.png)

# react-liquid

A middleground between writing a Shopify theme with Liquid and going headless.

## The Vision™

- Write Server Components that prerender Liquid [ahead of time](https://react.dev/reference/rsc/server-components#server-components-without-a-server). No penalty in rendering.
- Fetch data at build time with [Async components](https://react.dev/reference/rsc/server-components#async-components-with-server-components).
- Add [Client Components](https://react.dev/reference/rsc/server-components#adding-interactivity-to-server-components) for rich interactivity.
- Use your favorite libraries, like `shadcn`, `frame-motion` and `radix-ui`.

## How would it look?

You should be able to collocate React Components with Liquid for incremental adoption.

```
 .
 ├── assets
 ├── config
 ├── layout
 ├── locales
 ├── sections
 │   ├── footer.liquid
 │   ├── header-group.liquid
 │   └── header.tsx <-- 😮
 ├── snippets
 │   └── container.tsx <-- 😮
 └── templates
 vite.config.ts <-- 😮
```

A Vite plugin would then render the RSC tree with a custom reconciler and output it as `.liquid` files. It should look quite normal.

```diff
 .
 ├── assets
+│   └── .build.rsc...
+│   └── .build.rsc...
+│   └── .build.rsc...
 ├── config
 ├── layout
 ├── locales
 ├── sections
 │   ├── footer.liquid
 │   ├── header-group.liquid
+│   └── header.liquid
 │   └── header.tsx
 ├── snippets
+│   └── container.liquid
 │   └── container.tsx
 └── templates
 vite.config.ts
```

The Client Component payload would be placed in the `assets` directory, and used for hydration.

You would then `render` within Liquid or directly from React if you make the `theme.liquid` layout a Server Component 😈

```diff
 .
 ├── assets
 ├── config
 ├── layout
-│   └── theme.liquid
+│   └── theme.tsx
 ├── locales
 ├── sections
 ├── snippets
 └── templates
 vite.config.ts
```

On server components, Liquid tags should be JSX. Objects should be available as globals.

```tsx
function Header() {
  return <unless condition={request.pageType === "index"}>{shop.name}</unless>
}
```

I should be able to detect references to global objects with some AST which is neat.

That component would output something like this

```liquid
{%- unless request.page_type == 'index' -%}
 {shop.name}
{%- endunless -%}
```

The reconciler would have to translate the expression passed to the `condition` prop to prevent LSPs from reporting syntax errors all over the place. Imagine writing a javascript to liquid translation library 🤪

On Client Components, the reconciler could use the translation layer to dynamically render basic Liquid templates. Globals would have to be passed as props from Server Components. As a starting point I would simply error when trying to render Liquid JSX on the client.

## Things to figure out

- [] get the reconciler working for real
- [] get `renderToLiquid` working
- [] make some components
- [] use the vite environment api to render both the RSC and RCC trees
- [] wire shit up (useful ref https://github.com/odestry/adastra)
- [] .d.ts file with types for all new jsx elements
- [] autogenerate typescript types based on the grammar definitions they have here https://github.com/Shopify/theme-tools/tree/main/packages/vscode-extension.

## Will I finish this?

Probably not

## License

MIT
