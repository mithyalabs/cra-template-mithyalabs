const JSON = require('./swagger.json');
const fs = require('fs');



generateModels(JSON);


async function generateModels(JSON) {
    const paths = Object.keys(JSON.paths);

    let curModel = '';
    let curModelDef = '';
    paths.forEach(path => {
        const _curModel = path.split('/').filter(p => !!p)[0];
        if (_curModel !== curModel) {
            if (curModelDef) {
                curModelDef += getDefnClosingWrapper(curModel);
                writeDefn(curModel, curModelDef);
                curModelDef = getDefnOpeningWrapper(_curModel);
                curModelDef += getMethods(path, JSON.paths[path]);
            } else {
                curModelDef = getDefnOpeningWrapper(_curModel);
                curModelDef += getMethods(path, JSON.paths[path]);
            }
            curModel = _curModel;
        } else {
            curModelDef += getMethods(path, JSON.paths[path]);
        }
    })

}



function getMethods(path, structure) {
    let methods = '';

    methods += getRequestMethods(path, structure, 'get');
    methods += getRequestMethods(path, structure, 'post');
    methods += getRequestMethods(path, structure, 'put');
    methods += getRequestMethods(path, structure, 'patch');
    methods += getRequestMethods(path, structure, 'delete');

    return methods;
}



function getRequestMethods(path, structure, method = 'get') {
    const _s = structure[method];
    if (!_s) return '';
    // => /users/{id} => /users/${id}
    let methodApiUrl = `${path.replace(/\{/ig, '${')}`;
    const summary = _s['summary'];
    const params = _s['parameters'] || [];
    let methodName = getMethodName(method, methodApiUrl);

    let defn = '';

    defn += `
/** 
 * ${summary ? summary : ''}
 */ `;


    let methodSignature = `(`;
    let requestParams = [];
    let requestBody = [];

    params.sort(p => p.required ? -1 : 1).forEach(p => {
        if (p.required)
            methodSignature += `${p.name}: ${p.name === 'id' || p.name === 'fk' ? 'string' : 'any'},`;
        else
            methodSignature += `${p.name}?: ${p.name === 'id' || p.name === 'fk' ? 'string' : 'any'},`;

        if (p.in === 'query') {
            requestParams.push(p.name);
        }
        if (p.in === 'body') {
            requestBody.push('...' + p.name);
        }
        if (p.in === 'formData') {
            requestBody.push(p.name);
        }
    })
    methodSignature += `)`;

    defn += `
export function ${methodName}<T = any>${methodSignature} {
    return axios.request<T>({
        url: \`${methodApiUrl}\`,
        method: '${method}',
        ${requestParams.length ? `params: {
            ${requestParams.join(', ')}
        },`: ''}
        ${requestBody.length ? `data: {
            ${requestBody.join(', ')}
        },`: ''}
    })
}
`


    return defn;


}


function getDefnOpeningWrapper(model) {
    return `
import axios from 'axios';

// THIS IS A GENERATED FILE; PLEASE DO NOT MAKE CHANGES HERE
`
}

function getDefnClosingWrapper(model) {
    return ``
}

function getMethodName(method, apiPath) {
    // => users/{id} => get_users_id
    return `${method}${apiPath.replace(/[\/-]/ig, '_').replace(/[$\{\}]/ig, '')}`
}





function getUtilFileDefn(name) {
    return `
// INCLUDE YOUR CUSTOM UTILITIES HERE

export function getModelName() {
    return '${name}'
}
`
}


function getIndexFileDefn() {
    return `
import * as API from './api';
import * as utils from './utils';
import * as types from './@types';

export default {
    ...API,
    ...utils,
    ...types
}
    `
}


function getTypesFileDefn(name) {
    return `
// INCLUDE YOUR TYPE DEFINITIONS HERE

export interface T${name} {
    
}
    `
}

function writeDefn(name, data) {


    const BASE_PATH = './src/Models';
    const OUT_DIR = BASE_PATH + '/' + name;

    if (!fs.existsSync(BASE_PATH)) {
        fs.mkdirSync(BASE_PATH);
    }

    if (!fs.existsSync(OUT_DIR)) {
        fs.mkdirSync(OUT_DIR);
    }

    fs.writeFile(OUT_DIR + `/api.ts`, data, (err) => {
        if (err) throw err;
    });

    if (!fs.existsSync(OUT_DIR + '/utils.ts')) {
        fs.writeFile(OUT_DIR + '/utils.ts', getUtilFileDefn(name), (err) => {
            if (err) throw err;
        })
    }

    if (!fs.existsSync(OUT_DIR + '/@types.ts')) {
        fs.writeFile(OUT_DIR + '/@types.ts', getTypesFileDefn(name), (err) => {
            if (err) throw err;
        })
    }


    if (!fs.existsSync(OUT_DIR + '/index.ts')) {
        fs.writeFile(OUT_DIR + '/index.ts', getIndexFileDefn(), (err) => {
            if (err) throw err;
        })
    }

}