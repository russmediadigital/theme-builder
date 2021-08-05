export interface ThemeResolverOptions {
    directories: string[];
    prefix: string;
}
export declare class ThemeResolver {
    private options;
    static defaultOptions: ThemeResolverOptions;
    private cache;
    private pathRegex;
    constructor(options: ThemeResolverOptions[]);
    resolveComponentPath(reqPath: string, directories: string[]): string | undefined;
    getResolver(request: string): ThemeResolverOptions | undefined;
    getFileName(fullPathName: string, resolver: ThemeResolverOptions): string;
}
