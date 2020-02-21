import tsconfigSchema from './tsconfig.schema.json';
// To parse this data:
//
//   import { Convert, Tsconfig } from "./file";
//
//   const tsconfig = Convert.toTsconfig(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Tsconfig {
    /**
     * Instructs the TypeScript compiler how to compile .ts files.
     */
    compilerOptions?: TsconfigCompilerOptions;
    /**
     * Enable Compile-on-Save for this project.
     */
    compileOnSave?: boolean;
    /**
     * Auto type (.d.ts) acquisition options for this project. Requires TypeScript version 2.1
     * or later.
     */
    typeAcquisition?: TypeAcquisition;
    /**
     * Path to base configuration file to inherit from. Requires TypeScript version 2.1 or later.
     */
    extends?: string;
    /**
     * ts-node options.  See also: https://github.com/TypeStrong/ts-node#configuration-options
     *
     * ts-node offers TypeScript execution and REPL for node.js, with source map support.
     */
    "ts-node"?: TsNode;
    /**
     * If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults
     * to including all files in the containing directory and subdirectories except those
     * specified by 'exclude'. When a 'files' property is specified, only those files and those
     * specified by 'include' are included.
     */
    files?: string[];
    /**
     * Specifies a list of files to be excluded from compilation. The 'exclude' property only
     * affects the files included via the 'include' property and not the 'files' property. Glob
     * patterns require TypeScript version 2.0 or later.
     */
    exclude?: string[];
    /**
     * Specifies a list of glob patterns that match files to be included in compilation. If no
     * 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to
     * including all files in the containing directory and subdirectories except those specified
     * by 'exclude'. Requires TypeScript version 2.0 or later.
     */
    include?: string[];
    /**
     * Referenced projects. Requires TypeScript version 3.0 or later.
     */
    references?: Reference[];
}

/**
 * Instructs the TypeScript compiler how to compile .ts files.
 */
export interface TsconfigCompilerOptions {
    /**
     * Allow javascript files to be compiled.
     */
    allowJs?: boolean;
    /**
     * Allow default imports from modules with no default export. This does not affect code
     * emit, just typechecking.
     */
    allowSyntheticDefaultImports?: boolean;
    /**
     * Allow accessing UMD globals from modules.
     */
    allowUmdGlobalAccess?: boolean;
    /**
     * Do not report errors on unreachable code.
     */
    allowUnreachableCode?: boolean;
    /**
     * Do not report errors on unused labels.
     */
    allowUnusedLabels?: boolean;
    /**
     * Parse in strict mode and emit 'use strict' for each source file. Requires TypeScript
     * version 2.1 or later.
     */
    alwaysStrict?: boolean;
    /**
     * Have recompiles in '--incremental' and '--watch' assume that changes within a file will
     * only affect files directly depending on it.
     */
    assumeChangesOnlyAffectDirectDependencies?: boolean;
    /**
     * Base directory to resolve non-relative module names.
     */
    baseUrl?: string;
    /**
     * The character set of the input files.
     */
    charset?: string;
    /**
     * Report errors in .js files. Requires TypeScript version 2.3 or later.
     */
    checkJs?: boolean;
    /**
     * Enables building for project references.
     */
    composite?: boolean;
    /**
     * Generates corresponding d.ts files.
     */
    declaration?: boolean;
    /**
     * Specify output directory for generated declaration files. Requires TypeScript version 2.0
     * or later.
     */
    declarationDir?: string;
    /**
     * Generates a sourcemap for each corresponding '.d.ts' file. Requires TypeScript version
     * 2.9 or later.
     */
    declarationMap?: boolean;
    /**
     * Show diagnostic information.
     */
    diagnostics?: boolean;
    /**
     * Disable size limit for JavaScript project. Requires TypeScript version 2.0 or later.
     */
    disableSizeLimit?: boolean;
    /**
     * Provide full support for iterables in 'for-of', spread, and destructuring when targeting
     * 'ES5' or 'ES3'. Requires TypeScript version 2.3 or later.
     */
    downlevelIteration?: boolean;
    /**
     * Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.
     */
    emitBOM?: boolean;
    /**
     * Only emit '.d.ts' declaration files.
     */
    emitDeclarationOnly?: boolean;
    /**
     * Emit design-type metadata for decorated declarations in source.
     */
    emitDecoratorMetadata?: boolean;
    /**
     * Emit '__importStar' and '__importDefault' helpers for runtime babel ecosystem
     * compatibility and enable '--allowSyntheticDefaultImports' for typesystem compatibility.
     * Requires TypeScript version 2.7 or later.
     */
    esModuleInterop?: boolean;
    /**
     * Enables experimental support for ES7 decorators.
     */
    experimentalDecorators?: boolean;
    /**
     * Disallow inconsistently-cased references to the same file.
     */
    forceConsistentCasingInFileNames?: boolean;
    /**
     * Import emit helpers (e.g. '__extends', '__rest', etc..) from tslib. Requires TypeScript
     * version 2.1 or later.
     */
    importHelpers?: boolean;
    /**
     * Specify emit/checking behavior for imports that are only used for types
     */
    importsNotUsedAsValues?: ImportsNotUsedAsValues;
    /**
     * Enable incremental compilation.
     */
    incremental?: boolean;
    /**
     * Emit a single file with source maps instead of having a separate file.
     */
    inlineSourceMap?: boolean;
    /**
     * Emit the source alongside the sourcemaps within a single file; requires --inlineSourceMap
     * to be set.
     */
    inlineSources?: boolean;
    /**
     * Unconditionally emit imports for unresolved files.
     */
    isolatedModules?: boolean;
    /**
     * Specify JSX code generation: 'preserve', 'react', or 'react-native'.
     */
    jsx?: Jsx;
    /**
     * Specify the JSX factory function to use when targeting react JSX emit, e.g.
     * 'React.createElement' or 'h'. Requires TypeScript version 2.1 or later.
     */
    jsxFactory?: string;
    /**
     * Resolve 'keyof' to string valued property names only (no numbers or symbols). Requires
     * TypeScript version 2.9 or later.
     */
    keyofStringsOnly?: boolean;
    /**
     * List of library files to be included in the compilation. Possible values are: 'ES5',
     * 'ES6', 'ES2015', 'ES7', 'ES2016', 'ES2017', 'ES2018', 'ESNext', 'DOM', 'DOM.Iterable',
     * 'WebWorker', 'ScriptHost', 'ES2015.Core', 'ES2015.Collection', 'ES2015.Generator',
     * 'ES2015.Iterable', 'ES2015.Promise', 'ES2015.Proxy', 'ES2015.Reflect', 'ES2015.Symbol',
     * 'ES2015.Symbol.WellKnown', 'ES2016.Array.Include', 'ES2017.object', 'ES2017.Intl',
     * 'ES2017.SharedMemory', 'ES2017.String', 'ES2017.TypedArrays', 'ES2018.Intl',
     * 'ES2018.Promise', 'ES2018.RegExp', 'ESNext.AsyncIterable', 'ESNext.Array', 'ESNext.Intl',
     * 'ESNext.Symbol'. Requires TypeScript version 2.0 or later.
     */
    lib?: string[];
    /**
     * Enable to list all emitted files. Requires TypeScript version 2.0 or later.
     */
    listEmittedFiles?: boolean;
    /**
     * Print names of files part of the compilation.
     */
    listFiles?: boolean;
    /**
     * Specifies the location where debugger should locate map files instead of generated
     * locations
     */
    mapRoot?: string;
    /**
     * The maximum dependency depth to search under node_modules and load JavaScript files. Only
     * applicable with --allowJs.
     */
    maxNodeModuleJsDepth?: number;
    /**
     * Specify module code generation: 'None', 'CommonJS', 'AMD', 'System', 'UMD', 'ES6',
     * 'ES2015', 'ES2020' or 'ESNext'. Only 'AMD' and 'System' can be used in conjunction with
     * --outFile.
     */
    module?: string;
    /**
     * Specifies module resolution strategy: 'node' (Node) or 'classic' (TypeScript pre 1.6) .
     */
    moduleResolution?: string;
    /**
     * Specifies the end of line sequence to be used when emitting files: 'crlf' (Windows) or
     * 'lf' (Unix).
     */
    newLine?: string;
    /**
     * Do not emit output.
     */
    noEmit?: boolean;
    /**
     * Do not generate custom helper functions like __extends in compiled output.
     */
    noEmitHelpers?: boolean;
    /**
     * Do not emit outputs if any type checking errors were reported.
     */
    noEmitOnError?: boolean;
    /**
     * Do not truncate error messages.
     */
    noErrorTruncation?: boolean;
    /**
     * Report errors for fallthrough cases in switch statement.
     */
    noFallthroughCasesInSwitch?: boolean;
    /**
     * Warn on expressions and declarations with an implied 'any' type.
     */
    noImplicitAny?: boolean;
    /**
     * Report error when not all code paths in function return a value.
     */
    noImplicitReturns?: boolean;
    /**
     * Raise error on 'this' expressions with an implied any type.
     */
    noImplicitThis?: boolean;
    /**
     * Do not emit 'use strict' directives in module output.
     */
    noImplicitUseStrict?: boolean;
    /**
     * Do not include the default library file (lib.d.ts).
     */
    noLib?: boolean;
    /**
     * Do not add triple-slash references or module import targets to the list of compiled files.
     */
    noResolve?: boolean;
    /**
     * Disable strict checking of generic signatures in function types.
     */
    noStrictGenericChecks?: boolean;
    /**
     * Report errors on unused locals. Requires TypeScript version 2.0 or later.
     */
    noUnusedLocals?: boolean;
    /**
     * Report errors on unused parameters. Requires TypeScript version 2.0 or later.
     */
    noUnusedParameters?: boolean;
    /**
     * Redirect output structure to the directory.
     */
    outDir?: string;
    /**
     * Concatenate and emit output to single file.
     */
    outFile?: string;
    /**
     * Specify path mapping to be computed relative to baseUrl option.
     */
    paths?: { [key: string]: string[] };
    /**
     * List of TypeScript language server plugins to load. Requires TypeScript version 2.3 or
     * later.
     */
    plugins?: Plugin[];
    /**
     * Do not erase const enum declarations in generated code.
     */
    preserveConstEnums?: boolean;
    /**
     * Do not resolve symlinks to their real path; treat a symlinked file like a real one.
     */
    preserveSymlinks?: boolean;
    /**
     * Keep outdated console output in watch mode instead of clearing the screen.
     */
    preserveWatchOutput?: boolean;
    /**
     * Stylize errors and messages using color and context (experimental).
     */
    pretty?: boolean;
    /**
     * Specifies the object invoked for createElement and __spread when targeting 'react' JSX
     * emit.
     */
    reactNamespace?: string;
    /**
     * Do not emit comments to output.
     */
    removeComments?: boolean;
    /**
     * Include modules imported with '.json' extension. Requires TypeScript version 2.9 or later.
     */
    resolveJsonModule?: boolean;
    /**
     * Specifies the root directory of input files. Use to control the output directory
     * structure with --outDir.
     */
    rootDir?: string;
    /**
     * Specify list of root directories to be used when resolving modules.
     */
    rootDirs?:            string[];
    skipDefaultLibCheck?: boolean;
    /**
     * Skip type checking of declaration files. Requires TypeScript version 2.0 or later.
     */
    skipLibCheck?: boolean;
    /**
     * Generates corresponding '.map' file.
     */
    sourceMap?: boolean;
    /**
     * Specifies the location where debugger should locate TypeScript files instead of source
     * locations.
     */
    sourceRoot?: string;
    /**
     * Enable all strict type checking options. Requires TypeScript version 2.3 or later.
     */
    strict?: boolean;
    /**
     * Enable stricter checking of of the `bind`, `call`, and `apply` methods on functions.
     */
    strictBindCallApply?: boolean;
    /**
     * Disable bivariant parameter checking for function types. Requires TypeScript version 2.6
     * or later.
     */
    strictFunctionTypes?: boolean;
    /**
     * Enable strict null checks. Requires TypeScript version 2.0 or later.
     */
    strictNullChecks?: boolean;
    /**
     * Ensure non-undefined class properties are initialized in the constructor. Requires
     * TypeScript version 2.7 or later.
     */
    strictPropertyInitialization?: boolean;
    /**
     * Do not emit declarations for code that has an '@internal' annotation.
     */
    stripInternal?: boolean;
    /**
     * Suppress excess property checks for object literals.
     */
    suppressExcessPropertyErrors?: boolean;
    /**
     * Suppress noImplicitAny errors for indexing objects lacking index signatures.
     */
    suppressImplicitAnyIndexErrors?: boolean;
    /**
     * Specify ECMAScript target version: 'ES3', 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017',
     * 'ES2018', 'ES2019', 'ES2020', 'ESNext'
     */
    target?: string;
    /**
     * Enable tracing of the name resolution process.
     */
    traceResolution?: boolean;
    /**
     * Specify file to store incremental compilation information.
     */
    tsBuildInfoFile?: string;
    /**
     * Specify list of directories for type definition files to be included. Requires TypeScript
     * version 2.0 or later.
     */
    typeRoots?: string[];
    /**
     * Type declaration files to be included in compilation. Requires TypeScript version 2.0 or
     * later.
     */
    types?: string[];
    /**
     * Emit ECMAScript standard class fields. Requires TypeScript version 3.7 or later.
     */
    useDefineForClassFields?: boolean;
    /**
     * Watch input files.
     */
    watch?: boolean;
}

/**
 * Specify emit/checking behavior for imports that are only used for types
 */
export enum ImportsNotUsedAsValues {
    Error = "error",
    Preserve = "preserve",
    Remove = "remove",
}

/**
 * Specify JSX code generation: 'preserve', 'react', or 'react-native'.
 */
export enum Jsx {
    Preserve = "preserve",
    React = "react",
    ReactNative = "react-native",
}

export interface Plugin {
    /**
     * Plugin name.
     */
    name?: string;
}

/**
 * Project reference.
 */
export interface Reference {
    /**
     * Path to referenced tsconfig or to folder containing tsconfig.
     */
    path?: string;
}

/**
 * ts-node options.  See also: https://github.com/TypeStrong/ts-node#configuration-options
 *
 * ts-node offers TypeScript execution and REPL for node.js, with source map support.
 */
export interface TsNode {
    /**
     * Specify a custom TypeScript compiler.
     */
    compiler?: string;
    /**
     * Use TypeScript's compiler host API.
     */
    compilerHost?: boolean;
    /**
     * JSON object to merge with compiler options.
     */
    compilerOptions?: TsNodeCompilerOptions;
    /**
     * Emit output files into `.ts-node` directory.
     */
    emit?: boolean;
    /**
     * Load files from `tsconfig.json` on startup.
     */
    files?: boolean;
    /**
     * Override the path patterns to skip compilation.
     */
    ignore?: string[];
    /**
     * Ignore TypeScript warnings by diagnostic code.
     */
    ignoreDiagnostics?: Array<number | string>;
    /**
     * Logs TypeScript errors to stderr instead of throwing exceptions.
     */
    logError?: boolean;
    /**
     * Re-order file extensions so that TypeScript imports are preferred.
     */
    preferTsExts?: boolean;
    /**
     * Use pretty diagnostic formatter.
     */
    pretty?: boolean;
    /**
     * Scope compiler to files within `cwd`.
     */
    scope?: boolean;
    /**
     * Skip ignore check.
     */
    skipIgnore?: boolean;
    /**
     * Use TypeScript's faster `transpileModule`.
     */
    transpileOnly?: boolean;
    /**
     * **DEPRECATED** Specify type-check is enabled (e.g. `transpileOnly == false`).
     */
    typeCheck?: boolean;
}

/**
 * JSON object to merge with compiler options.
 *
 * Instructs the TypeScript compiler how to compile .ts files.
 */
export interface TsNodeCompilerOptions {
    /**
     * Allow javascript files to be compiled.
     */
    allowJs?: boolean;
    /**
     * Allow default imports from modules with no default export. This does not affect code
     * emit, just typechecking.
     */
    allowSyntheticDefaultImports?: boolean;
    /**
     * Allow accessing UMD globals from modules.
     */
    allowUmdGlobalAccess?: boolean;
    /**
     * Do not report errors on unreachable code.
     */
    allowUnreachableCode?: boolean;
    /**
     * Do not report errors on unused labels.
     */
    allowUnusedLabels?: boolean;
    /**
     * Parse in strict mode and emit 'use strict' for each source file. Requires TypeScript
     * version 2.1 or later.
     */
    alwaysStrict?: boolean;
    /**
     * Have recompiles in '--incremental' and '--watch' assume that changes within a file will
     * only affect files directly depending on it.
     */
    assumeChangesOnlyAffectDirectDependencies?: boolean;
    /**
     * Base directory to resolve non-relative module names.
     */
    baseUrl?: string;
    /**
     * The character set of the input files.
     */
    charset?: string;
    /**
     * Report errors in .js files. Requires TypeScript version 2.3 or later.
     */
    checkJs?: boolean;
    /**
     * Enables building for project references.
     */
    composite?: boolean;
    /**
     * Generates corresponding d.ts files.
     */
    declaration?: boolean;
    /**
     * Specify output directory for generated declaration files. Requires TypeScript version 2.0
     * or later.
     */
    declarationDir?: string;
    /**
     * Generates a sourcemap for each corresponding '.d.ts' file. Requires TypeScript version
     * 2.9 or later.
     */
    declarationMap?: boolean;
    /**
     * Show diagnostic information.
     */
    diagnostics?: boolean;
    /**
     * Disable size limit for JavaScript project. Requires TypeScript version 2.0 or later.
     */
    disableSizeLimit?: boolean;
    /**
     * Provide full support for iterables in 'for-of', spread, and destructuring when targeting
     * 'ES5' or 'ES3'. Requires TypeScript version 2.3 or later.
     */
    downlevelIteration?: boolean;
    /**
     * Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.
     */
    emitBOM?: boolean;
    /**
     * Only emit '.d.ts' declaration files.
     */
    emitDeclarationOnly?: boolean;
    /**
     * Emit design-type metadata for decorated declarations in source.
     */
    emitDecoratorMetadata?: boolean;
    /**
     * Emit '__importStar' and '__importDefault' helpers for runtime babel ecosystem
     * compatibility and enable '--allowSyntheticDefaultImports' for typesystem compatibility.
     * Requires TypeScript version 2.7 or later.
     */
    esModuleInterop?: boolean;
    /**
     * Enables experimental support for ES7 decorators.
     */
    experimentalDecorators?: boolean;
    /**
     * Disallow inconsistently-cased references to the same file.
     */
    forceConsistentCasingInFileNames?: boolean;
    /**
     * Import emit helpers (e.g. '__extends', '__rest', etc..) from tslib. Requires TypeScript
     * version 2.1 or later.
     */
    importHelpers?: boolean;
    /**
     * Specify emit/checking behavior for imports that are only used for types
     */
    importsNotUsedAsValues?: ImportsNotUsedAsValues;
    /**
     * Enable incremental compilation.
     */
    incremental?: boolean;
    /**
     * Emit a single file with source maps instead of having a separate file.
     */
    inlineSourceMap?: boolean;
    /**
     * Emit the source alongside the sourcemaps within a single file; requires --inlineSourceMap
     * to be set.
     */
    inlineSources?: boolean;
    /**
     * Unconditionally emit imports for unresolved files.
     */
    isolatedModules?: boolean;
    /**
     * Specify JSX code generation: 'preserve', 'react', or 'react-native'.
     */
    jsx?: Jsx;
    /**
     * Specify the JSX factory function to use when targeting react JSX emit, e.g.
     * 'React.createElement' or 'h'. Requires TypeScript version 2.1 or later.
     */
    jsxFactory?: string;
    /**
     * Resolve 'keyof' to string valued property names only (no numbers or symbols). Requires
     * TypeScript version 2.9 or later.
     */
    keyofStringsOnly?: boolean;
    /**
     * List of library files to be included in the compilation. Possible values are: 'ES5',
     * 'ES6', 'ES2015', 'ES7', 'ES2016', 'ES2017', 'ES2018', 'ESNext', 'DOM', 'DOM.Iterable',
     * 'WebWorker', 'ScriptHost', 'ES2015.Core', 'ES2015.Collection', 'ES2015.Generator',
     * 'ES2015.Iterable', 'ES2015.Promise', 'ES2015.Proxy', 'ES2015.Reflect', 'ES2015.Symbol',
     * 'ES2015.Symbol.WellKnown', 'ES2016.Array.Include', 'ES2017.object', 'ES2017.Intl',
     * 'ES2017.SharedMemory', 'ES2017.String', 'ES2017.TypedArrays', 'ES2018.Intl',
     * 'ES2018.Promise', 'ES2018.RegExp', 'ESNext.AsyncIterable', 'ESNext.Array', 'ESNext.Intl',
     * 'ESNext.Symbol'. Requires TypeScript version 2.0 or later.
     */
    lib?: string[];
    /**
     * Enable to list all emitted files. Requires TypeScript version 2.0 or later.
     */
    listEmittedFiles?: boolean;
    /**
     * Print names of files part of the compilation.
     */
    listFiles?: boolean;
    /**
     * Specifies the location where debugger should locate map files instead of generated
     * locations
     */
    mapRoot?: string;
    /**
     * The maximum dependency depth to search under node_modules and load JavaScript files. Only
     * applicable with --allowJs.
     */
    maxNodeModuleJsDepth?: number;
    /**
     * Specify module code generation: 'None', 'CommonJS', 'AMD', 'System', 'UMD', 'ES6',
     * 'ES2015', 'ES2020' or 'ESNext'. Only 'AMD' and 'System' can be used in conjunction with
     * --outFile.
     */
    module?: string;
    /**
     * Specifies module resolution strategy: 'node' (Node) or 'classic' (TypeScript pre 1.6) .
     */
    moduleResolution?: string;
    /**
     * Specifies the end of line sequence to be used when emitting files: 'crlf' (Windows) or
     * 'lf' (Unix).
     */
    newLine?: string;
    /**
     * Do not emit output.
     */
    noEmit?: boolean;
    /**
     * Do not generate custom helper functions like __extends in compiled output.
     */
    noEmitHelpers?: boolean;
    /**
     * Do not emit outputs if any type checking errors were reported.
     */
    noEmitOnError?: boolean;
    /**
     * Do not truncate error messages.
     */
    noErrorTruncation?: boolean;
    /**
     * Report errors for fallthrough cases in switch statement.
     */
    noFallthroughCasesInSwitch?: boolean;
    /**
     * Warn on expressions and declarations with an implied 'any' type.
     */
    noImplicitAny?: boolean;
    /**
     * Report error when not all code paths in function return a value.
     */
    noImplicitReturns?: boolean;
    /**
     * Raise error on 'this' expressions with an implied any type.
     */
    noImplicitThis?: boolean;
    /**
     * Do not emit 'use strict' directives in module output.
     */
    noImplicitUseStrict?: boolean;
    /**
     * Do not include the default library file (lib.d.ts).
     */
    noLib?: boolean;
    /**
     * Do not add triple-slash references or module import targets to the list of compiled files.
     */
    noResolve?: boolean;
    /**
     * Disable strict checking of generic signatures in function types.
     */
    noStrictGenericChecks?: boolean;
    /**
     * Report errors on unused locals. Requires TypeScript version 2.0 or later.
     */
    noUnusedLocals?: boolean;
    /**
     * Report errors on unused parameters. Requires TypeScript version 2.0 or later.
     */
    noUnusedParameters?: boolean;
    /**
     * Redirect output structure to the directory.
     */
    outDir?: string;
    /**
     * Concatenate and emit output to single file.
     */
    outFile?: string;
    /**
     * Specify path mapping to be computed relative to baseUrl option.
     */
    paths?: { [key: string]: string[] };
    /**
     * List of TypeScript language server plugins to load. Requires TypeScript version 2.3 or
     * later.
     */
    plugins?: Plugin[];
    /**
     * Do not erase const enum declarations in generated code.
     */
    preserveConstEnums?: boolean;
    /**
     * Do not resolve symlinks to their real path; treat a symlinked file like a real one.
     */
    preserveSymlinks?: boolean;
    /**
     * Keep outdated console output in watch mode instead of clearing the screen.
     */
    preserveWatchOutput?: boolean;
    /**
     * Stylize errors and messages using color and context (experimental).
     */
    pretty?: boolean;
    /**
     * Specifies the object invoked for createElement and __spread when targeting 'react' JSX
     * emit.
     */
    reactNamespace?: string;
    /**
     * Do not emit comments to output.
     */
    removeComments?: boolean;
    /**
     * Include modules imported with '.json' extension. Requires TypeScript version 2.9 or later.
     */
    resolveJsonModule?: boolean;
    /**
     * Specifies the root directory of input files. Use to control the output directory
     * structure with --outDir.
     */
    rootDir?: string;
    /**
     * Specify list of root directories to be used when resolving modules.
     */
    rootDirs?:            string[];
    skipDefaultLibCheck?: boolean;
    /**
     * Skip type checking of declaration files. Requires TypeScript version 2.0 or later.
     */
    skipLibCheck?: boolean;
    /**
     * Generates corresponding '.map' file.
     */
    sourceMap?: boolean;
    /**
     * Specifies the location where debugger should locate TypeScript files instead of source
     * locations.
     */
    sourceRoot?: string;
    /**
     * Enable all strict type checking options. Requires TypeScript version 2.3 or later.
     */
    strict?: boolean;
    /**
     * Enable stricter checking of of the `bind`, `call`, and `apply` methods on functions.
     */
    strictBindCallApply?: boolean;
    /**
     * Disable bivariant parameter checking for function types. Requires TypeScript version 2.6
     * or later.
     */
    strictFunctionTypes?: boolean;
    /**
     * Enable strict null checks. Requires TypeScript version 2.0 or later.
     */
    strictNullChecks?: boolean;
    /**
     * Ensure non-undefined class properties are initialized in the constructor. Requires
     * TypeScript version 2.7 or later.
     */
    strictPropertyInitialization?: boolean;
    /**
     * Do not emit declarations for code that has an '@internal' annotation.
     */
    stripInternal?: boolean;
    /**
     * Suppress excess property checks for object literals.
     */
    suppressExcessPropertyErrors?: boolean;
    /**
     * Suppress noImplicitAny errors for indexing objects lacking index signatures.
     */
    suppressImplicitAnyIndexErrors?: boolean;
    /**
     * Specify ECMAScript target version: 'ES3', 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017',
     * 'ES2018', 'ES2019', 'ES2020', 'ESNext'
     */
    target?: string;
    /**
     * Enable tracing of the name resolution process.
     */
    traceResolution?: boolean;
    /**
     * Specify file to store incremental compilation information.
     */
    tsBuildInfoFile?: string;
    /**
     * Specify list of directories for type definition files to be included. Requires TypeScript
     * version 2.0 or later.
     */
    typeRoots?: string[];
    /**
     * Type declaration files to be included in compilation. Requires TypeScript version 2.0 or
     * later.
     */
    types?: string[];
    /**
     * Emit ECMAScript standard class fields. Requires TypeScript version 3.7 or later.
     */
    useDefineForClassFields?: boolean;
    /**
     * Watch input files.
     */
    watch?: boolean;
}

/**
 * Auto type (.d.ts) acquisition options for this project. Requires TypeScript version 2.1
 * or later.
 */
export interface TypeAcquisition {
    /**
     * Enable auto type acquisition
     */
    enable?: boolean;
    /**
     * Specifies a list of type declarations to be excluded from auto type acquisition. Ex.
     * ["jquery", "lodash"]
     */
    exclude?: string[];
    /**
     * Specifies a list of type declarations to be included in auto type acquisition. Ex.
     * ["jquery", "lodash"]
     */
    include?: string[];
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toTsconfig(json: string): Tsconfig {
        return cast(JSON.parse(json), r("Tsconfig"));
    }

    public static tsconfigToJson(value: Tsconfig): string {
        return JSON.stringify(uncast(value, r("Tsconfig")), null, 2);
    }
}

function invalidValue(typ: any, val: any): never {
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        var map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        var map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        var l = typs.length;
        for (var i = 0; i < l; i++) {
            var typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(typ: any, val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        var result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(typ, val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Tsconfig": o([
        { json: "compilerOptions", js: "compilerOptions", typ: u(undefined, r("TsconfigCompilerOptions")) },
        { json: "compileOnSave", js: "compileOnSave", typ: u(undefined, true) },
        { json: "typeAcquisition", js: "typeAcquisition", typ: u(undefined, r("TypeAcquisition")) },
        { json: "extends", js: "extends", typ: u(undefined, "") },
        { json: "ts-node", js: "ts-node", typ: u(undefined, r("TsNode")) },
        { json: "files", js: "files", typ: u(undefined, a("")) },
        { json: "exclude", js: "exclude", typ: u(undefined, a("")) },
        { json: "include", js: "include", typ: u(undefined, a("")) },
        { json: "references", js: "references", typ: u(undefined, a(r("Reference"))) },
    ], "any"),
    "TsconfigCompilerOptions": o([
        { json: "allowJs", js: "allowJs", typ: u(undefined, true) },
        { json: "allowSyntheticDefaultImports", js: "allowSyntheticDefaultImports", typ: u(undefined, true) },
        { json: "allowUmdGlobalAccess", js: "allowUmdGlobalAccess", typ: u(undefined, true) },
        { json: "allowUnreachableCode", js: "allowUnreachableCode", typ: u(undefined, true) },
        { json: "allowUnusedLabels", js: "allowUnusedLabels", typ: u(undefined, true) },
        { json: "alwaysStrict", js: "alwaysStrict", typ: u(undefined, true) },
        { json: "assumeChangesOnlyAffectDirectDependencies", js: "assumeChangesOnlyAffectDirectDependencies", typ: u(undefined, true) },
        { json: "baseUrl", js: "baseUrl", typ: u(undefined, "") },
        { json: "charset", js: "charset", typ: u(undefined, "") },
        { json: "checkJs", js: "checkJs", typ: u(undefined, true) },
        { json: "composite", js: "composite", typ: u(undefined, true) },
        { json: "declaration", js: "declaration", typ: u(undefined, true) },
        { json: "declarationDir", js: "declarationDir", typ: u(undefined, "") },
        { json: "declarationMap", js: "declarationMap", typ: u(undefined, true) },
        { json: "diagnostics", js: "diagnostics", typ: u(undefined, true) },
        { json: "disableSizeLimit", js: "disableSizeLimit", typ: u(undefined, true) },
        { json: "downlevelIteration", js: "downlevelIteration", typ: u(undefined, true) },
        { json: "emitBOM", js: "emitBOM", typ: u(undefined, true) },
        { json: "emitDeclarationOnly", js: "emitDeclarationOnly", typ: u(undefined, true) },
        { json: "emitDecoratorMetadata", js: "emitDecoratorMetadata", typ: u(undefined, true) },
        { json: "esModuleInterop", js: "esModuleInterop", typ: u(undefined, true) },
        { json: "experimentalDecorators", js: "experimentalDecorators", typ: u(undefined, true) },
        { json: "forceConsistentCasingInFileNames", js: "forceConsistentCasingInFileNames", typ: u(undefined, true) },
        { json: "importHelpers", js: "importHelpers", typ: u(undefined, true) },
        { json: "importsNotUsedAsValues", js: "importsNotUsedAsValues", typ: u(undefined, r("ImportsNotUsedAsValues")) },
        { json: "incremental", js: "incremental", typ: u(undefined, true) },
        { json: "inlineSourceMap", js: "inlineSourceMap", typ: u(undefined, true) },
        { json: "inlineSources", js: "inlineSources", typ: u(undefined, true) },
        { json: "isolatedModules", js: "isolatedModules", typ: u(undefined, true) },
        { json: "jsx", js: "jsx", typ: u(undefined, r("Jsx")) },
        { json: "jsxFactory", js: "jsxFactory", typ: u(undefined, "") },
        { json: "keyofStringsOnly", js: "keyofStringsOnly", typ: u(undefined, true) },
        { json: "lib", js: "lib", typ: u(undefined, a("")) },
        { json: "listEmittedFiles", js: "listEmittedFiles", typ: u(undefined, true) },
        { json: "listFiles", js: "listFiles", typ: u(undefined, true) },
        { json: "mapRoot", js: "mapRoot", typ: u(undefined, "") },
        { json: "maxNodeModuleJsDepth", js: "maxNodeModuleJsDepth", typ: u(undefined, 3.14) },
        { json: "module", js: "module", typ: u(undefined, "") },
        { json: "moduleResolution", js: "moduleResolution", typ: u(undefined, "") },
        { json: "newLine", js: "newLine", typ: u(undefined, "") },
        { json: "noEmit", js: "noEmit", typ: u(undefined, true) },
        { json: "noEmitHelpers", js: "noEmitHelpers", typ: u(undefined, true) },
        { json: "noEmitOnError", js: "noEmitOnError", typ: u(undefined, true) },
        { json: "noErrorTruncation", js: "noErrorTruncation", typ: u(undefined, true) },
        { json: "noFallthroughCasesInSwitch", js: "noFallthroughCasesInSwitch", typ: u(undefined, true) },
        { json: "noImplicitAny", js: "noImplicitAny", typ: u(undefined, true) },
        { json: "noImplicitReturns", js: "noImplicitReturns", typ: u(undefined, true) },
        { json: "noImplicitThis", js: "noImplicitThis", typ: u(undefined, true) },
        { json: "noImplicitUseStrict", js: "noImplicitUseStrict", typ: u(undefined, true) },
        { json: "noLib", js: "noLib", typ: u(undefined, true) },
        { json: "noResolve", js: "noResolve", typ: u(undefined, true) },
        { json: "noStrictGenericChecks", js: "noStrictGenericChecks", typ: u(undefined, true) },
        { json: "noUnusedLocals", js: "noUnusedLocals", typ: u(undefined, true) },
        { json: "noUnusedParameters", js: "noUnusedParameters", typ: u(undefined, true) },
        { json: "outDir", js: "outDir", typ: u(undefined, "") },
        { json: "outFile", js: "outFile", typ: u(undefined, "") },
        { json: "paths", js: "paths", typ: u(undefined, m(a(""))) },
        { json: "plugins", js: "plugins", typ: u(undefined, a(r("Plugin"))) },
        { json: "preserveConstEnums", js: "preserveConstEnums", typ: u(undefined, true) },
        { json: "preserveSymlinks", js: "preserveSymlinks", typ: u(undefined, true) },
        { json: "preserveWatchOutput", js: "preserveWatchOutput", typ: u(undefined, true) },
        { json: "pretty", js: "pretty", typ: u(undefined, true) },
        { json: "reactNamespace", js: "reactNamespace", typ: u(undefined, "") },
        { json: "removeComments", js: "removeComments", typ: u(undefined, true) },
        { json: "resolveJsonModule", js: "resolveJsonModule", typ: u(undefined, true) },
        { json: "rootDir", js: "rootDir", typ: u(undefined, "") },
        { json: "rootDirs", js: "rootDirs", typ: u(undefined, a("")) },
        { json: "skipDefaultLibCheck", js: "skipDefaultLibCheck", typ: u(undefined, true) },
        { json: "skipLibCheck", js: "skipLibCheck", typ: u(undefined, true) },
        { json: "sourceMap", js: "sourceMap", typ: u(undefined, true) },
        { json: "sourceRoot", js: "sourceRoot", typ: u(undefined, "") },
        { json: "strict", js: "strict", typ: u(undefined, true) },
        { json: "strictBindCallApply", js: "strictBindCallApply", typ: u(undefined, true) },
        { json: "strictFunctionTypes", js: "strictFunctionTypes", typ: u(undefined, true) },
        { json: "strictNullChecks", js: "strictNullChecks", typ: u(undefined, true) },
        { json: "strictPropertyInitialization", js: "strictPropertyInitialization", typ: u(undefined, true) },
        { json: "stripInternal", js: "stripInternal", typ: u(undefined, true) },
        { json: "suppressExcessPropertyErrors", js: "suppressExcessPropertyErrors", typ: u(undefined, true) },
        { json: "suppressImplicitAnyIndexErrors", js: "suppressImplicitAnyIndexErrors", typ: u(undefined, true) },
        { json: "target", js: "target", typ: u(undefined, "") },
        { json: "traceResolution", js: "traceResolution", typ: u(undefined, true) },
        { json: "tsBuildInfoFile", js: "tsBuildInfoFile", typ: u(undefined, "") },
        { json: "typeRoots", js: "typeRoots", typ: u(undefined, a("")) },
        { json: "types", js: "types", typ: u(undefined, a("")) },
        { json: "useDefineForClassFields", js: "useDefineForClassFields", typ: u(undefined, true) },
        { json: "watch", js: "watch", typ: u(undefined, true) },
    ], "any"),
    "Plugin": o([
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "Reference": o([
        { json: "path", js: "path", typ: u(undefined, "") },
    ], "any"),
    "TsNode": o([
        { json: "compiler", js: "compiler", typ: u(undefined, "") },
        { json: "compilerHost", js: "compilerHost", typ: u(undefined, true) },
        { json: "compilerOptions", js: "compilerOptions", typ: u(undefined, r("TsNodeCompilerOptions")) },
        { json: "emit", js: "emit", typ: u(undefined, true) },
        { json: "files", js: "files", typ: u(undefined, true) },
        { json: "ignore", js: "ignore", typ: u(undefined, a("")) },
        { json: "ignoreDiagnostics", js: "ignoreDiagnostics", typ: u(undefined, a(u(3.14, ""))) },
        { json: "logError", js: "logError", typ: u(undefined, true) },
        { json: "preferTsExts", js: "preferTsExts", typ: u(undefined, true) },
        { json: "pretty", js: "pretty", typ: u(undefined, true) },
        { json: "scope", js: "scope", typ: u(undefined, true) },
        { json: "skipIgnore", js: "skipIgnore", typ: u(undefined, true) },
        { json: "transpileOnly", js: "transpileOnly", typ: u(undefined, true) },
        { json: "typeCheck", js: "typeCheck", typ: u(undefined, true) },
    ], "any"),
    "TsNodeCompilerOptions": o([
        { json: "allowJs", js: "allowJs", typ: u(undefined, true) },
        { json: "allowSyntheticDefaultImports", js: "allowSyntheticDefaultImports", typ: u(undefined, true) },
        { json: "allowUmdGlobalAccess", js: "allowUmdGlobalAccess", typ: u(undefined, true) },
        { json: "allowUnreachableCode", js: "allowUnreachableCode", typ: u(undefined, true) },
        { json: "allowUnusedLabels", js: "allowUnusedLabels", typ: u(undefined, true) },
        { json: "alwaysStrict", js: "alwaysStrict", typ: u(undefined, true) },
        { json: "assumeChangesOnlyAffectDirectDependencies", js: "assumeChangesOnlyAffectDirectDependencies", typ: u(undefined, true) },
        { json: "baseUrl", js: "baseUrl", typ: u(undefined, "") },
        { json: "charset", js: "charset", typ: u(undefined, "") },
        { json: "checkJs", js: "checkJs", typ: u(undefined, true) },
        { json: "composite", js: "composite", typ: u(undefined, true) },
        { json: "declaration", js: "declaration", typ: u(undefined, true) },
        { json: "declarationDir", js: "declarationDir", typ: u(undefined, "") },
        { json: "declarationMap", js: "declarationMap", typ: u(undefined, true) },
        { json: "diagnostics", js: "diagnostics", typ: u(undefined, true) },
        { json: "disableSizeLimit", js: "disableSizeLimit", typ: u(undefined, true) },
        { json: "downlevelIteration", js: "downlevelIteration", typ: u(undefined, true) },
        { json: "emitBOM", js: "emitBOM", typ: u(undefined, true) },
        { json: "emitDeclarationOnly", js: "emitDeclarationOnly", typ: u(undefined, true) },
        { json: "emitDecoratorMetadata", js: "emitDecoratorMetadata", typ: u(undefined, true) },
        { json: "esModuleInterop", js: "esModuleInterop", typ: u(undefined, true) },
        { json: "experimentalDecorators", js: "experimentalDecorators", typ: u(undefined, true) },
        { json: "forceConsistentCasingInFileNames", js: "forceConsistentCasingInFileNames", typ: u(undefined, true) },
        { json: "importHelpers", js: "importHelpers", typ: u(undefined, true) },
        { json: "importsNotUsedAsValues", js: "importsNotUsedAsValues", typ: u(undefined, r("ImportsNotUsedAsValues")) },
        { json: "incremental", js: "incremental", typ: u(undefined, true) },
        { json: "inlineSourceMap", js: "inlineSourceMap", typ: u(undefined, true) },
        { json: "inlineSources", js: "inlineSources", typ: u(undefined, true) },
        { json: "isolatedModules", js: "isolatedModules", typ: u(undefined, true) },
        { json: "jsx", js: "jsx", typ: u(undefined, r("Jsx")) },
        { json: "jsxFactory", js: "jsxFactory", typ: u(undefined, "") },
        { json: "keyofStringsOnly", js: "keyofStringsOnly", typ: u(undefined, true) },
        { json: "lib", js: "lib", typ: u(undefined, a("")) },
        { json: "listEmittedFiles", js: "listEmittedFiles", typ: u(undefined, true) },
        { json: "listFiles", js: "listFiles", typ: u(undefined, true) },
        { json: "mapRoot", js: "mapRoot", typ: u(undefined, "") },
        { json: "maxNodeModuleJsDepth", js: "maxNodeModuleJsDepth", typ: u(undefined, 3.14) },
        { json: "module", js: "module", typ: u(undefined, "") },
        { json: "moduleResolution", js: "moduleResolution", typ: u(undefined, "") },
        { json: "newLine", js: "newLine", typ: u(undefined, "") },
        { json: "noEmit", js: "noEmit", typ: u(undefined, true) },
        { json: "noEmitHelpers", js: "noEmitHelpers", typ: u(undefined, true) },
        { json: "noEmitOnError", js: "noEmitOnError", typ: u(undefined, true) },
        { json: "noErrorTruncation", js: "noErrorTruncation", typ: u(undefined, true) },
        { json: "noFallthroughCasesInSwitch", js: "noFallthroughCasesInSwitch", typ: u(undefined, true) },
        { json: "noImplicitAny", js: "noImplicitAny", typ: u(undefined, true) },
        { json: "noImplicitReturns", js: "noImplicitReturns", typ: u(undefined, true) },
        { json: "noImplicitThis", js: "noImplicitThis", typ: u(undefined, true) },
        { json: "noImplicitUseStrict", js: "noImplicitUseStrict", typ: u(undefined, true) },
        { json: "noLib", js: "noLib", typ: u(undefined, true) },
        { json: "noResolve", js: "noResolve", typ: u(undefined, true) },
        { json: "noStrictGenericChecks", js: "noStrictGenericChecks", typ: u(undefined, true) },
        { json: "noUnusedLocals", js: "noUnusedLocals", typ: u(undefined, true) },
        { json: "noUnusedParameters", js: "noUnusedParameters", typ: u(undefined, true) },
        { json: "outDir", js: "outDir", typ: u(undefined, "") },
        { json: "outFile", js: "outFile", typ: u(undefined, "") },
        { json: "paths", js: "paths", typ: u(undefined, m(a(""))) },
        { json: "plugins", js: "plugins", typ: u(undefined, a(r("Plugin"))) },
        { json: "preserveConstEnums", js: "preserveConstEnums", typ: u(undefined, true) },
        { json: "preserveSymlinks", js: "preserveSymlinks", typ: u(undefined, true) },
        { json: "preserveWatchOutput", js: "preserveWatchOutput", typ: u(undefined, true) },
        { json: "pretty", js: "pretty", typ: u(undefined, true) },
        { json: "reactNamespace", js: "reactNamespace", typ: u(undefined, "") },
        { json: "removeComments", js: "removeComments", typ: u(undefined, true) },
        { json: "resolveJsonModule", js: "resolveJsonModule", typ: u(undefined, true) },
        { json: "rootDir", js: "rootDir", typ: u(undefined, "") },
        { json: "rootDirs", js: "rootDirs", typ: u(undefined, a("")) },
        { json: "skipDefaultLibCheck", js: "skipDefaultLibCheck", typ: u(undefined, true) },
        { json: "skipLibCheck", js: "skipLibCheck", typ: u(undefined, true) },
        { json: "sourceMap", js: "sourceMap", typ: u(undefined, true) },
        { json: "sourceRoot", js: "sourceRoot", typ: u(undefined, "") },
        { json: "strict", js: "strict", typ: u(undefined, true) },
        { json: "strictBindCallApply", js: "strictBindCallApply", typ: u(undefined, true) },
        { json: "strictFunctionTypes", js: "strictFunctionTypes", typ: u(undefined, true) },
        { json: "strictNullChecks", js: "strictNullChecks", typ: u(undefined, true) },
        { json: "strictPropertyInitialization", js: "strictPropertyInitialization", typ: u(undefined, true) },
        { json: "stripInternal", js: "stripInternal", typ: u(undefined, true) },
        { json: "suppressExcessPropertyErrors", js: "suppressExcessPropertyErrors", typ: u(undefined, true) },
        { json: "suppressImplicitAnyIndexErrors", js: "suppressImplicitAnyIndexErrors", typ: u(undefined, true) },
        { json: "target", js: "target", typ: u(undefined, "") },
        { json: "traceResolution", js: "traceResolution", typ: u(undefined, true) },
        { json: "tsBuildInfoFile", js: "tsBuildInfoFile", typ: u(undefined, "") },
        { json: "typeRoots", js: "typeRoots", typ: u(undefined, a("")) },
        { json: "types", js: "types", typ: u(undefined, a("")) },
        { json: "useDefineForClassFields", js: "useDefineForClassFields", typ: u(undefined, true) },
        { json: "watch", js: "watch", typ: u(undefined, true) },
    ], "any"),
    "TypeAcquisition": o([
        { json: "enable", js: "enable", typ: u(undefined, true) },
        { json: "exclude", js: "exclude", typ: u(undefined, a("")) },
        { json: "include", js: "include", typ: u(undefined, a("")) },
    ], "any"),
    "ImportsNotUsedAsValues": [
        "error",
        "preserve",
        "remove",
    ],
    "Jsx": [
        "preserve",
        "react",
        "react-native",
    ],
};
export { tsconfigSchema };
