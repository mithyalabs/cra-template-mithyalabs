const JSON = require('./swagger.json');
const fs = require('fs');

generateModels(JSON);


function generateModels(JSON) {
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
    static ${methodName}${methodSignature} {
        return axios.request({
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

class ${model}Model {

    `
}

function getDefnClosingWrapper(model) {
    return `
}
export default ${model}Model
    `
}

function getMethodName(method, apiPath) {
    // => users/{id} => get_users_id
    return `${method}${apiPath.replace(/[\/-]/ig, '_').replace(/[$\{\}]/ig, '')}`
}


function writeDefn(name, data) {
    const OUT_DIR = './models';
    if (!fs.existsSync(OUT_DIR)) {
        fs.mkdirSync(OUT_DIR);
    }
    fs.writeFile(OUT_DIR + `/${name}.ts`, data, (err) => {
        if (err) throw err;
    })
}