---
to: src/Models/<%= Name %>/index.ts
---
import { request } from 'Resources/AxiosUtils';
import { JSONType } from 'Typings/Global';
import { parse<%= Name %> } from './<%= Name %>Parsers';


class <%= name %>Model {

    static getAll<%= h.inflection.pluralize(Name) %> = async (params?: Record<string, any>) => {
        const res = await request<JSONType[]>({
            url: '/<%= api %>',
            method: 'GET',
            params
        });
        return res.map(parse<%= Name %>);
    }
    static get<%= Name %>= async(id: string, params?: Record<string, any>) => {
        const res = await request<JSONType>({
            url: `/<%= api %>/${id}`,
            method: 'GET',
            params
        });
        return parse<%= Name %>(res);
    }
}

export default <%= Name %>Model;
