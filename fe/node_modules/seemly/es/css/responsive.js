export function parseResponsiveProp(reponsiveProp) {
    if (typeof reponsiveProp === "number") {
        return {
            '': reponsiveProp.toString()
        };
    }
    const params = {};
    reponsiveProp.split(/ +/).forEach((pairLiteral) => {
        if (pairLiteral === '')
            return;
        const [prefix, value] = pairLiteral.split(':');
        if (value === undefined) {
            params[''] = prefix;
        }
        else {
            params[prefix] = value;
        }
    });
    return params;
}
function parseResponsivePropValue(reponsiveProp, activeKeyOrSize) {
    var _a;
    if (reponsiveProp === undefined || reponsiveProp === null)
        return undefined;
    const classObj = parseResponsiveProp(reponsiveProp);
    if (activeKeyOrSize === undefined)
        return classObj[''];
    if (typeof activeKeyOrSize === 'string') {
        return (_a = classObj[activeKeyOrSize]) !== null && _a !== void 0 ? _a : classObj[''];
    }
    else if (Array.isArray(activeKeyOrSize)) {
        for (let i = activeKeyOrSize.length - 1; i >= 0; --i) {
            const key = activeKeyOrSize[i];
            if (key in classObj)
                return classObj[key];
        }
        return classObj[''];
    }
    else {
        // Here we suppose all the keys are number formatted
        let activeValue = undefined;
        let activeKey = -1;
        Object.keys(classObj).forEach((key) => {
            const keyAsNum = Number(key);
            if (!Number.isNaN(keyAsNum) &&
                activeKeyOrSize >= keyAsNum &&
                keyAsNum >= activeKey) {
                activeKey = keyAsNum;
                activeValue = classObj[key];
            }
        });
        return activeValue;
    }
}
export { parseResponsivePropValue };
