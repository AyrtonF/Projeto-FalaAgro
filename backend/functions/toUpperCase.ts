export function toUpperCaseStrings<T extends object>(obj: T): T {
    const result: any = {};
    for (const key in obj) {
        if(typeof obj[key] === 'string' && !key.toLowerCase().includes('id')){
            console.log(key)
        }
        else if (typeof obj[key] === 'string') {
            
            result[key] = (obj[key] as string).toUpperCase();
        } else if (Array.isArray(obj[key])) {
            result[key] = obj[key].map(item => typeof item === 'string' ? item.toUpperCase() : item);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}
