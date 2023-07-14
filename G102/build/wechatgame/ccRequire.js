let moduleMap = {
'src/assets/Scripts/NetWork/crypto-js.min.js' () { return require('src/assets/Scripts/NetWork/crypto-js.min.js') },
'assets/internal/index.js' () { return require('assets/internal/index.js') },
'src/scripts/resources/index.js' () { return require('src/scripts/resources/index.js') },
'assets/main/index.js' () { return require('assets/main/index.js') },
// tail
};

window.__cocos_require__ = function (moduleName) {
    let func = moduleMap[moduleName];
    if (!func) {
        throw new Error(`cannot find module ${moduleName}`);
    }
    return func();
};