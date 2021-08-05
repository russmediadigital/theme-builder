"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeResolver = void 0;
const fs = require("fs");
const path = require("path");
class ThemeResolver {
    constructor(options) {
        this.options = options;
        this.cache = new Map();
        this.pathRegex = [];
        options.forEach((res) => {
            this.pathRegex.push(new RegExp(`^${res.prefix}/`));
        });
    }
    resolveComponentPath(reqPath, directories) {
        if (this.cache.has(reqPath) && this.cache.get(reqPath) !== undefined) {
            return this.cache.get(reqPath);
        }
        const dirs = directories.map((dir) => path.resolve(path.resolve(dir), reqPath));
        const resolvedPath = dirs.find((pathName) => fs.existsSync(pathName));
        if (resolvedPath) {
            this.cache.set(reqPath, resolvedPath);
        }
        return resolvedPath;
    }
    getResolver(request) {
        let resolver = undefined;
        this.pathRegex.forEach((reg, x) => {
            if (request.match(reg)) {
                resolver = Object.assign({}, ThemeResolver.defaultOptions, this.options[x]);
            }
        });
        return resolver;
    }
    getFileName(fullPathName, resolver) {
        return fullPathName.replace(new RegExp(`^${resolver.prefix}/`), "");
    }
}
exports.ThemeResolver = ThemeResolver;
ThemeResolver.defaultOptions = {
    directories: [],
    prefix: "fallback",
};
