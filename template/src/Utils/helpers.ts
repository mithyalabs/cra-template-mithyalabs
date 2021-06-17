import { isString, map, filter, indexOf } from 'lodash';

const helpers = {
    toggleItemFromList: (
        list: any[] = [],
        item: any,
        key = 'id',
        comaprisonFunction?: (currentItem: any, item: any) => boolean
    ) => {
        const updatedList: any[] = [...list];
        const index = list.findIndex((i) =>
            comaprisonFunction ? comaprisonFunction(i, item) : i[key] === item[key]
        );
        index === -1 ? updatedList.push(item) : updatedList.splice(index, 1);
        return updatedList;
    },
    getDummyImageUrl: (w = 800, h = 800) =>
        `https://source.unsplash.com/random/${w}x${h}`,
    bytesToSize: (bytes: number) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        // eslint-disable-next-line no-restricted-properties
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    },

    isListSimilar: (list1: Array<any>, list2: Array<any>) => {
        if (list1.length !== list2.length) return false;
        // eslint-disable-next-line consistent-return
        list1.forEach((elem) => {
            const index = list2.findIndex((i) => i.id === elem.id);
            if (index === -1) return false;
        });
        return true;
    },
    updateItemList: (
        list: Array<any>,
        item: any,
        action: 'ADD' | 'DELETE' | 'UPDATE' | 'PUT',
        key: any = 'id'
    ): typeof list => {
        // eslint-disable-next-line no-param-reassign
        list = list || [];
        const newList = list.slice();
        let itemIndex;
        if (action === 'UPDATE') {
            itemIndex = newList.findIndex((listItem) => item[key] === listItem[key]);
            if (itemIndex !== -1) newList.splice(itemIndex, 1, item);
            return newList;
        }
        if (action === 'ADD') {
            newList.unshift(item);
            return newList;
        }
        if (action === 'DELETE') {
            return newList.filter((listItem) => item[key] !== listItem[key]);
        }
        if (action === 'PUT') {
            itemIndex = newList.findIndex((listItem) => item[key] === listItem[key]);
            if (itemIndex !== -1) newList.splice(itemIndex, 1, item);
            else {
                newList.push(item);
            }
            return newList;
        }
        return newList;
    },
    findValues: (
        superSet: Array<Record<string, unknown>>,
        subSet: string | Array<string>,
        findKey = 'value',
        mapKey = 'name',
        isReturnItem = false
    ) => {
        // findKey = findKey || 'value';
        // mapKey = mapKey || 'name';
        // eslint-disable-next-line no-param-reassign
        if (isString(subSet)) subSet = [subSet];
        const filteredValues = filter(superSet, (item: any) => {
            return indexOf(subSet, item[findKey]) !== -1;
        });
        if (isReturnItem) return filteredValues;
        return map(filteredValues, mapKey);
    },
    hexToRgb: (hex: string, opacity = '0.1') => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result)
            return `rgb(${parseInt(result[1], 16)},${parseInt(
                result[2],
                16
            )} ,${parseInt(result[3], 16)},${opacity})`;
        // r: parseInt(result[1], 16),
        // g: parseInt(result[2], 16),
        // b: parseInt(result[3], 16)
        return '';
    },
};
export default helpers;
