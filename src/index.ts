import * as fs from "fs";
import * as path from "path";

export interface ThemeResolverOptions {
    directories: string[];
    prefix: string;
}
export class ThemeResolver {
    public static defaultOptions: ThemeResolverOptions = {
        directories: [],
        prefix: "fallback",
    };
    private cache: Map<string, string|undefined> = new Map();
    private pathRegex: RegExp[] = [];

    public constructor(private options: ThemeResolverOptions[]) {
        options.forEach((res) => {
            this.pathRegex.push(new RegExp(`^${res.prefix}/`));
        });
    }

    // Get Component (reqPath) from directories passed into the function. First File found will be returned
    public resolveComponentPath(reqPath: string, directories: string[]): string | undefined {

        if (this.cache.has(reqPath) && this.cache.get(reqPath) !== undefined) {
            return this.cache.get(reqPath);
        }

        const dirs = directories.map((dir: string) => path.resolve(path.resolve(dir), reqPath));

        const resolvedPath = dirs.find((pathName: string) => fs.existsSync(pathName));

        if (resolvedPath) {
            this.cache.set(reqPath, resolvedPath)
        }

        return resolvedPath;
    }

    // Get Options to resolve the correct File
    public getResolver(request: string): ThemeResolverOptions | undefined {
        let resolver: ThemeResolverOptions | undefined = undefined;

        this.pathRegex.forEach((reg, x) => {
            if (request.match(reg)) {
                resolver = Object.assign({}, ThemeResolver.defaultOptions, this.options[x]);
            }
        });

        return resolver;
    }

    // Get File name without alias at the start of the full Path Name
    public getFileName(fullPathName: string, resolver: ThemeResolverOptions): string {
        return fullPathName.replace(new RegExp(`^${resolver.prefix}/`), "");
    }
}
