const JSON = require('./swagger.json');
const fs = require('fs');



const TYPES_MAPPING = {
    'array': 'any[]',
    'string': 'string',
    'boolean': 'boolean',
    'object': 'Record<string, any>',
    'number': 'number'
}



generateModels(JSON);


async function generateModels(JSON) {
    const paths = Object.keys(JSON.paths);
    let curModel = '';
    let curModelDef = '';
    paths.forEach((path, i) => {
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
            if (i === paths.length - 1) {
                curModelDef += getDefnClosingWrapper(curModel);
                writeDefn(curModel, curModelDef);
            }
        }
    })

}



function getMethods(path, structure) {
    let methods = '';

    methods += generateRequestMethod(path, structure, 'get');
    methods += generateRequestMethod(path, structure, 'post');
    methods += generateRequestMethod(path, structure, 'put');
    methods += generateRequestMethod(path, structure, 'patch');
    methods += generateRequestMethod(path, structure, 'delete');

    return methods;
}



function generateRequestMethod(path, structure, method = 'get') {
    const _s = structure[method];
    if (!_s) return '';
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


        // if (p.required)
        //     methodSignature += `${p.name}: ${p.type ? TYPES_MAPPING[p.type] || 'any' : 'any'},`;
        // else
        //     methodSignature += `${p.name}?: ${p.type ? TYPES_MAPPING[p.type] || 'any' : 'any'},`;

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
    static ${methodName}<T = any>${methodSignature} {
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

class ${model}Base {
`
}

function getDefnClosingWrapper(model) {
    return `
}

export default ${model}Base;
    `
}

function getMethodName(method, apiPath) {
    return `${method}${apiPath.replace(/[\/-]/ig, '_').replace(/[$\{\}]/ig, '')}`
}



function writeDefn(name, data) {
    const BASE_PATH = './src/BaseModels';


    if (!fs.existsSync(BASE_PATH)) {
        fs.mkdirSync(BASE_PATH);
    }


    fs.writeFile(BASE_PATH + `/${name}.ts`, data, (err) => {
        if (err) throw err;
    });


}