---
to: src/Stores/<%= Name %>/index.ts
---
import { action, Action, thunk, Thunk } from 'easy-peasy';
import { TRootStore } from 'Stores';


export interface <%= Name %>State { }

const <%= Name %>Store: <%= Name %>State = {};

export default <%= Name %>Store;

