---
to: src/Stores/index.ts
inject: true
skip_if: <%= name %>
after: "const RootStore = {"
---
    <%= name %>Store,