---
to: src/Routes/AppNavigation.tsx
inject: true
after: "lazyImport"
---

const <%= name %> = lazyImport('../Screens/<%= name %>');