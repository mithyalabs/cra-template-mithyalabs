---
to: src/Models/<%= Name %>/<%= Name %>Parsers.ts
---
import { JSONType } from 'Typings/Global';
import { T<%= Name %> } from './@types';

export const parse<%=Name%> = (obj: JSONType): T<%= Name %> => {
	return { ...obj } as T<%= Name %>;
};