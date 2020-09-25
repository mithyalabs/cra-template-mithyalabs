---
to: src/Stores/index.ts
inject: true
skip_if: "import <%= name %>Store from './<%= name %>'"
after: import
---
import <%= name %>Store from './<%= name %>'