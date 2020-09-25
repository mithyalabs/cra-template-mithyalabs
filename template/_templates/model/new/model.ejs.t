---
to: src/Models/<%= name %>/index.ts
---
import axios from 'axios';
import { T<%= name %> } from './@types';

class <%= name %>Model {

    static findAll(params?: Record<string, any>) {
        return axios.request<T<%= name %>[]>({
            url: '/<%= api %>',
            params
        })
    }
    static findOne(id: string, params?: Record<string, any>) {
        return axios.request({
            url: `/<%= api %>/${id}`,
            params
        })
    }
}

export default <%= name %>Model;
