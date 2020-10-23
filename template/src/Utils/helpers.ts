import { isString, map, filter, indexOf } from 'lodash';


let helpers = {
    toggleItemFromList: (list: any[] = [], item: any, key: string = 'id', comaprisonFunction?: (currentItem: any, item: any) => boolean) => {
        let updatedList: any[] = [...list];
        let index = list.findIndex(i => comaprisonFunction ? comaprisonFunction(i, item) : i[key] === item[key]);
        index === -1 ? updatedList.push(item) : updatedList.splice(index, 1);
        return updatedList;
    },
    getDummyImageUrl: (w: number = 800, h: number = 800) => `https://source.unsplash.com/random/${w}x${h}`,
    bytesToSize: (bytes: number) => {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    },

    isListSimilar: (list1: Array<any>, list2: Array<any>) => {
        if (list1.length !== list2.length) return false;
        list1.forEach(elem => {
            let index = list2.findIndex(i => i.id === elem.id);
            if (index === -1)
                return false;
        });
        return true;
    },
    updateItemList: (list: Array<any>, item: any, action: 'ADD' | 'DELETE' | 'UPDATE' | 'PUT', key: any = 'id'): typeof list => {
        list = list || [];
        let newList = list.slice();
        let itemIndex;
        if (action === 'UPDATE') {
            itemIndex = newList.findIndex(listItem => item[key] === listItem[key]);
            if (itemIndex !== -1)
                newList.splice(itemIndex, 1, item);
            return newList;
        } else if (action === 'ADD') {
            newList.unshift(item);
            return newList;
        } else if (action === 'DELETE') {
            return newList.filter(listItem => item[key] !== listItem[key]);
        }
        else if (action === 'PUT') {
            itemIndex = newList.findIndex(listItem => item[key] === listItem[key]);
            if (itemIndex !== -1)
                newList.splice(itemIndex, 1, item);
            else {
                newList.push(item);
            }
            return newList;
        }
        return newList;
    },
    findValues: (superSet: (Array<Object>), subSet: (string | Array<string>), findKey: string = 'value', mapKey: string = 'name', isReturnItem: Boolean = false) => {
        // findKey = findKey || 'value';
        // mapKey = mapKey || 'name';
        if (isString(subSet))
            subSet = [subSet];
        let filteredValues = filter(superSet, (item: any) => {
            return (indexOf(subSet, item[findKey]) !== -1);
        });
        if (isReturnItem)
            return filteredValues;
        return map(filteredValues, mapKey);
    },
    hexToRgb: (hex: string, opacity = '0.1') => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result)
            return `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)} ,${parseInt(result[3], 16)},${opacity})`
        // r: parseInt(result[1], 16),
        // g: parseInt(result[2], 16),
        // b: parseInt(result[3], 16)
        else return '';
    }
}
export default helpers;