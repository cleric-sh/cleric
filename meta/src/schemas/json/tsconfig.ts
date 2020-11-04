/* eslint-disable */
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
     * Enable Compile-on-Save for this project.
     */
    compileOnSave?: boolean;
    /**
     * Instructs the TypeScript compiler how to compile .ts files.
     */
    compilerOptions?: TsconfigCompilerOptions;
    /**
     * Specifies a list of files to be excluded from compilation. The 'exclude' property only
     * affects the files included via the 'include' property and not the 'files' property. Glob
     * patterns require TypeScript version 2.0 or later.
     */
    exclude?: string[];
    /**
     * Path to base configuration file to inherit from. Requires TypeScript version 2.1 or later.
     */
    extends?: string;
    /**
     * If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults
     * to including all files in the containing common and subdirectories except those
     * specified by 'exclude'. When a 'files' property is specified, only those files and those
     * specified by 'include' are included.
     */
    files?: string[];
    /**
     * Specifies a list of glob patterns that match files to be included in compilation. If no
     * 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to
     * including all files in the containing common and subdirectories except those specified
     * by 'exclude'. Requires TypeScript version 2.0 or later.
     */
    include?: string[];
    /**
     * Referenced projects. Requires TypeScript version 3.0 or later.
     */
    references?: Reference[];
    /**
     * ts-node options.  See also: https://github.com/TypeStrong/ts-node#configuration-options
     *
     * ts-node offers TypeScript execution and REPL for node.js, with source map support.
     */
    "ts-node"?: TsNode;
    /**
     * Auto type (.d.ts) acquisition options for this project. Requires TypeScript version 2.1
     * or later.
     */
    typeAcquisition?: TypeAcquisition;
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
     * Base common to resolve non-relative module names.
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
     * Specify output common for generated declaration files. Requires TypeScript version 2.0
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
     * Redirect output structure to the common.
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
     * Specifies the root common of input files. Use to control the output common
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
     * Emit output files into `.ts-node` common.
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
     * Base common to resolve non-relative module names.
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
     * Specify output common for generated declaration files. Requires TypeScript version 2.0
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
     * Redirect output structure to the common.
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
     * Specifies the root common of input files. Use to control the output common
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
    return { additional, props };
}

function m(additional: any) {
    return { additional, props: [] };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
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
    "Plugin": o([
        { js: "name", json: "name", typ: u(undefined, "") },
    ], "any"),
    "Reference": o([
        { js: "path", json: "path", typ: u(undefined, "") },
    ], "any"),
    "TsNode": o([
        { js: "compiler", json: "compiler", typ: u(undefined, "") },
        { js: "compilerHost", json: "compilerHost", typ: u(undefined, true) },
        { js: "compilerOptions", json: "compilerOptions", typ: u(undefined, r("TsNodeCompilerOptions")) },
        { js: "emit", json: "emit", typ: u(undefined, true) },
        { js: "files", json: "files", typ: u(undefined, true) },
        { js: "ignore", json: "ignore", typ: u(undefined, a("")) },
        { js: "ignoreDiagnostics", json: "ignoreDiagnostics", typ: u(undefined, a(u(3.14, ""))) },
        { js: "logError", json: "logError", typ: u(undefined, true) },
        { js: "preferTsExts", json: "preferTsExts", typ: u(undefined, true) },
        { js: "pretty", json: "pretty", typ: u(undefined, true) },
        { js: "scope", json: "scope", typ: u(undefined, true) },
        { js: "skipIgnore", json: "skipIgnore", typ: u(undefined, true) },
        { js: "transpileOnly", json: "transpileOnly", typ: u(undefined, true) },
        { js: "typeCheck", json: "typeCheck", typ: u(undefined, true) },
    ], "any"),
    "TsNodeCompilerOptions": o([
        { js: "allowJs", json: "allowJs", typ: u(undefined, true) },
        { js: "allowSyntheticDefaultImports", json: "allowSyntheticDefaultImports", typ: u(undefined, true) },
        { js: "allowUmdGlobalAccess", json: "allowUmdGlobalAccess", typ: u(undefined, true) },
        { js: "allowUnreachableCode", json: "allowUnreachableCode", typ: u(undefined, true) },
        { js: "allowUnusedLabels", json: "allowUnusedLabels", typ: u(undefined, true) },
        { js: "alwaysStrict", json: "alwaysStrict", typ: u(undefined, true) },
        { js: "assumeChangesOnlyAffectDirectDependencies", json: "assumeChangesOnlyAffectDirectDependencies", typ: u(undefined, true) },
        { js: "baseUrl", json: "baseUrl", typ: u(undefined, "") },
        { js: "charset", json: "charset", typ: u(undefined, "") },
        { js: "checkJs", json: "checkJs", typ: u(undefined, true) },
        { js: "composite", json: "composite", typ: u(undefined, true) },
        { js: "declaration", json: "declaration", typ: u(undefined, true) },
        { js: "declarationDir", json: "declarationDir", typ: u(undefined, "") },
        { js: "declarationMap", json: "declarationMap", typ: u(undefined, true) },
        { js: "diagnostics", json: "diagnostics", typ: u(undefined, true) },
        { js: "disableSizeLimit", json: "disableSizeLimit", typ: u(undefined, true) },
        { js: "downlevelIteration", json: "downlevelIteration", typ: u(undefined, true) },
        { js: "emitBOM", json: "emitBOM", typ: u(undefined, true) },
        { js: "emitDeclarationOnly", json: "emitDeclarationOnly", typ: u(undefined, true) },
        { js: "emitDecoratorMetadata", json: "emitDecoratorMetadata", typ: u(undefined, true) },
        { js: "esModuleInterop", json: "esModuleInterop", typ: u(undefined, true) },
        { js: "experimentalDecorators", json: "experimentalDecorators", typ: u(undefined, true) },
        { js: "forceConsistentCasingInFileNames", json: "forceConsistentCasingInFileNames", typ: u(undefined, true) },
        { js: "importHelpers", json: "importHelpers", typ: u(undefined, true) },
        { js: "importsNotUsedAsValues", json: "importsNotUsedAsValues", typ: u(undefined, r("ImportsNotUsedAsValues")) },
        { js: "incremental", json: "incremental", typ: u(undefined, true) },
        { js: "inlineSourceMap", json: "inlineSourceMap", typ: u(undefined, true) },
        { js: "inlineSources", json: "inlineSources", typ: u(undefined, true) },
        { js: "isolatedModules", json: "isolatedModules", typ: u(undefined, true) },
        { js: "jsx", json: "jsx", typ: u(undefined, r("Jsx")) },
        { js: "jsxFactory", json: "jsxFactory", typ: u(undefined, "") },
        { js: "keyofStringsOnly", json: "keyofStringsOnly", typ: u(undefined, true) },
        { js: "lib", json: "lib", typ: u(undefined, a("")) },
        { js: "listEmittedFiles", json: "listEmittedFiles", typ: u(undefined, true) },
        { js: "listFiles", json: "listFiles", typ: u(undefined, true) },
        { js: "mapRoot", json: "mapRoot", typ: u(undefined, "") },
        { js: "maxNodeModuleJsDepth", json: "maxNodeModuleJsDepth", typ: u(undefined, 3.14) },
        { js: "module", json: "module", typ: u(undefined, "") },
        { js: "moduleResolution", json: "moduleResolution", typ: u(undefined, "") },
        { js: "newLine", json: "newLine", typ: u(undefined, "") },
        { js: "noEmit", json: "noEmit", typ: u(undefined, true) },
        { js: "noEmitHelpers", json: "noEmitHelpers", typ: u(undefined, true) },
        { js: "noEmitOnError", json: "noEmitOnError", typ: u(undefined, true) },
        { js: "noErrorTruncation", json: "noErrorTruncation", typ: u(undefined, true) },
        { js: "noFallthroughCasesInSwitch", json: "noFallthroughCasesInSwitch", typ: u(undefined, true) },
        { js: "noImplicitAny", json: "noImplicitAny", typ: u(undefined, true) },
        { js: "noImplicitReturns", json: "noImplicitReturns", typ: u(undefined, true) },
        { js: "noImplicitThis", json: "noImplicitThis", typ: u(undefined, true) },
        { js: "noImplicitUseStrict", json: "noImplicitUseStrict", typ: u(undefined, true) },
        { js: "noLib", json: "noLib", typ: u(undefined, true) },
        { js: "noResolve", json: "noResolve", typ: u(undefined, true) },
        { js: "noStrictGenericChecks", json: "noStrictGenericChecks", typ: u(undefined, true) },
        { js: "noUnusedLocals", json: "noUnusedLocals", typ: u(undefined, true) },
        { js: "noUnusedParameters", json: "noUnusedParameters", typ: u(undefined, true) },
        { js: "outDir", json: "outDir", typ: u(undefined, "") },
        { js: "outFile", json: "outFile", typ: u(undefined, "") },
        { js: "paths", json: "paths", typ: u(undefined, m(a(""))) },
        { js: "plugins", json: "plugins", typ: u(undefined, a(r("Plugin"))) },
        { js: "preserveConstEnums", json: "preserveConstEnums", typ: u(undefined, true) },
        { js: "preserveSymlinks", json: "preserveSymlinks", typ: u(undefined, true) },
        { js: "preserveWatchOutput", json: "preserveWatchOutput", typ: u(undefined, true) },
        { js: "pretty", json: "pretty", typ: u(undefined, true) },
        { js: "reactNamespace", json: "reactNamespace", typ: u(undefined, "") },
        { js: "removeComments", json: "removeComments", typ: u(undefined, true) },
        { js: "resolveJsonModule", json: "resolveJsonModule", typ: u(undefined, true) },
        { js: "rootDir", json: "rootDir", typ: u(undefined, "") },
        { js: "rootDirs", json: "rootDirs", typ: u(undefined, a("")) },
        { js: "skipDefaultLibCheck", json: "skipDefaultLibCheck", typ: u(undefined, true) },
        { js: "skipLibCheck", json: "skipLibCheck", typ: u(undefined, true) },
        { js: "sourceMap", json: "sourceMap", typ: u(undefined, true) },
        { js: "sourceRoot", json: "sourceRoot", typ: u(undefined, "") },
        { js: "strict", json: "strict", typ: u(undefined, true) },
        { js: "strictBindCallApply", json: "strictBindCallApply", typ: u(undefined, true) },
        { js: "strictFunctionTypes", json: "strictFunctionTypes", typ: u(undefined, true) },
        { js: "strictNullChecks", json: "strictNullChecks", typ: u(undefined, true) },
        { js: "strictPropertyInitialization", json: "strictPropertyInitialization", typ: u(undefined, true) },
        { js: "stripInternal", json: "stripInternal", typ: u(undefined, true) },
        { js: "suppressExcessPropertyErrors", json: "suppressExcessPropertyErrors", typ: u(undefined, true) },
        { js: "suppressImplicitAnyIndexErrors", json: "suppressImplicitAnyIndexErrors", typ: u(undefined, true) },
        { js: "target", json: "target", typ: u(undefined, "") },
        { js: "traceResolution", json: "traceResolution", typ: u(undefined, true) },
        { js: "tsBuildInfoFile", json: "tsBuildInfoFile", typ: u(undefined, "") },
        { js: "typeRoots", json: "typeRoots", typ: u(undefined, a("")) },
        { js: "types", json: "types", typ: u(undefined, a("")) },
        { js: "useDefineForClassFields", json: "useDefineForClassFields", typ: u(undefined, true) },
        { js: "watch", json: "watch", typ: u(undefined, true) },
    ], "any"),
    "Tsconfig": o([
        { js: "compilerOptions", json: "compilerOptions", typ: u(undefined, r("TsconfigCompilerOptions")) },
        { js: "compileOnSave", json: "compileOnSave", typ: u(undefined, true) },
        { js: "typeAcquisition", json: "typeAcquisition", typ: u(undefined, r("TypeAcquisition")) },
        { js: "extends", json: "extends", typ: u(undefined, "") },
        { js: "ts-node", json: "ts-node", typ: u(undefined, r("TsNode")) },
        { js: "files", json: "files", typ: u(undefined, a("")) },
        { js: "exclude", json: "exclude", typ: u(undefined, a("")) },
        { js: "include", json: "include", typ: u(undefined, a("")) },
        { js: "references", json: "references", typ: u(undefined, a(r("Reference"))) },
    ], "any"),
    "TsconfigCompilerOptions": o([
        { js: "allowJs", json: "allowJs", typ: u(undefined, true) },
        { js: "allowSyntheticDefaultImports", json: "allowSyntheticDefaultImports", typ: u(undefined, true) },
        { js: "allowUmdGlobalAccess", json: "allowUmdGlobalAccess", typ: u(undefined, true) },
        { js: "allowUnreachableCode", json: "allowUnreachableCode", typ: u(undefined, true) },
        { js: "allowUnusedLabels", json: "allowUnusedLabels", typ: u(undefined, true) },
        { js: "alwaysStrict", json: "alwaysStrict", typ: u(undefined, true) },
        { js: "assumeChangesOnlyAffectDirectDependencies", json: "assumeChangesOnlyAffectDirectDependencies", typ: u(undefined, true) },
        { js: "baseUrl", json: "baseUrl", typ: u(undefined, "") },
        { js: "charset", json: "charset", typ: u(undefined, "") },
        { js: "checkJs", json: "checkJs", typ: u(undefined, true) },
        { js: "composite", json: "composite", typ: u(undefined, true) },
        { js: "declaration", json: "declaration", typ: u(undefined, true) },
        { js: "declarationDir", json: "declarationDir", typ: u(undefined, "") },
        { js: "declarationMap", json: "declarationMap", typ: u(undefined, true) },
        { js: "diagnostics", json: "diagnostics", typ: u(undefined, true) },
        { js: "disableSizeLimit", json: "disableSizeLimit", typ: u(undefined, true) },
        { js: "downlevelIteration", json: "downlevelIteration", typ: u(undefined, true) },
        { js: "emitBOM", json: "emitBOM", typ: u(undefined, true) },
        { js: "emitDeclarationOnly", json: "emitDeclarationOnly", typ: u(undefined, true) },
        { js: "emitDecoratorMetadata", json: "emitDecoratorMetadata", typ: u(undefined, true) },
        { js: "esModuleInterop", json: "esModuleInterop", typ: u(undefined, true) },
        { js: "experimentalDecorators", json: "experimentalDecorators", typ: u(undefined, true) },
        { js: "forceConsistentCasingInFileNames", json: "forceConsistentCasingInFileNames", typ: u(undefined, true) },
        { js: "importHelpers", json: "importHelpers", typ: u(undefined, true) },
        { js: "importsNotUsedAsValues", json: "importsNotUsedAsValues", typ: u(undefined, r("ImportsNotUsedAsValues")) },
        { js: "incremental", json: "incremental", typ: u(undefined, true) },
        { js: "inlineSourceMap", json: "inlineSourceMap", typ: u(undefined, true) },
        { js: "inlineSources", json: "inlineSources", typ: u(undefined, true) },
        { js: "isolatedModules", json: "isolatedModules", typ: u(undefined, true) },
        { js: "jsx", json: "jsx", typ: u(undefined, r("Jsx")) },
        { js: "jsxFactory", json: "jsxFactory", typ: u(undefined, "") },
        { js: "keyofStringsOnly", json: "keyofStringsOnly", typ: u(undefined, true) },
        { js: "lib", json: "lib", typ: u(undefined, a("")) },
        { js: "listEmittedFiles", json: "listEmittedFiles", typ: u(undefined, true) },
        { js: "listFiles", json: "listFiles", typ: u(undefined, true) },
        { js: "mapRoot", json: "mapRoot", typ: u(undefined, "") },
        { js: "maxNodeModuleJsDepth", json: "maxNodeModuleJsDepth", typ: u(undefined, 3.14) },
        { js: "module", json: "module", typ: u(undefined, "") },
        { js: "moduleResolution", json: "moduleResolution", typ: u(undefined, "") },
        { js: "newLine", json: "newLine", typ: u(undefined, "") },
        { js: "noEmit", json: "noEmit", typ: u(undefined, true) },
        { js: "noEmitHelpers", json: "noEmitHelpers", typ: u(undefined, true) },
        { js: "noEmitOnError", json: "noEmitOnError", typ: u(undefined, true) },
        { js: "noErrorTruncation", json: "noErrorTruncation", typ: u(undefined, true) },
        { js: "noFallthroughCasesInSwitch", json: "noFallthroughCasesInSwitch", typ: u(undefined, true) },
        { js: "noImplicitAny", json: "noImplicitAny", typ: u(undefined, true) },
        { js: "noImplicitReturns", json: "noImplicitReturns", typ: u(undefined, true) },
        { js: "noImplicitThis", json: "noImplicitThis", typ: u(undefined, true) },
        { js: "noImplicitUseStrict", json: "noImplicitUseStrict", typ: u(undefined, true) },
        { js: "noLib", json: "noLib", typ: u(undefined, true) },
        { js: "noResolve", json: "noResolve", typ: u(undefined, true) },
        { js: "noStrictGenericChecks", json: "noStrictGenericChecks", typ: u(undefined, true) },
        { js: "noUnusedLocals", json: "noUnusedLocals", typ: u(undefined, true) },
        { js: "noUnusedParameters", json: "noUnusedParameters", typ: u(undefined, true) },
        { js: "outDir", json: "outDir", typ: u(undefined, "") },
        { js: "outFile", json: "outFile", typ: u(undefined, "") },
        { js: "paths", json: "paths", typ: u(undefined, m(a(""))) },
        { js: "plugins", json: "plugins", typ: u(undefined, a(r("Plugin"))) },
        { js: "preserveConstEnums", json: "preserveConstEnums", typ: u(undefined, true) },
        { js: "preserveSymlinks", json: "preserveSymlinks", typ: u(undefined, true) },
        { js: "preserveWatchOutput", json: "preserveWatchOutput", typ: u(undefined, true) },
        { js: "pretty", json: "pretty", typ: u(undefined, true) },
        { js: "reactNamespace", json: "reactNamespace", typ: u(undefined, "") },
        { js: "removeComments", json: "removeComments", typ: u(undefined, true) },
        { js: "resolveJsonModule", json: "resolveJsonModule", typ: u(undefined, true) },
        { js: "rootDir", json: "rootDir", typ: u(undefined, "") },
        { js: "rootDirs", json: "rootDirs", typ: u(undefined, a("")) },
        { js: "skipDefaultLibCheck", json: "skipDefaultLibCheck", typ: u(undefined, true) },
        { js: "skipLibCheck", json: "skipLibCheck", typ: u(undefined, true) },
        { js: "sourceMap", json: "sourceMap", typ: u(undefined, true) },
        { js: "sourceRoot", json: "sourceRoot", typ: u(undefined, "") },
        { js: "strict", json: "strict", typ: u(undefined, true) },
        { js: "strictBindCallApply", json: "strictBindCallApply", typ: u(undefined, true) },
        { js: "strictFunctionTypes", json: "strictFunctionTypes", typ: u(undefined, true) },
        { js: "strictNullChecks", json: "strictNullChecks", typ: u(undefined, true) },
        { js: "strictPropertyInitialization", json: "strictPropertyInitialization", typ: u(undefined, true) },
        { js: "stripInternal", json: "stripInternal", typ: u(undefined, true) },
        { js: "suppressExcessPropertyErrors", json: "suppressExcessPropertyErrors", typ: u(undefined, true) },
        { js: "suppressImplicitAnyIndexErrors", json: "suppressImplicitAnyIndexErrors", typ: u(undefined, true) },
        { js: "target", json: "target", typ: u(undefined, "") },
        { js: "traceResolution", json: "traceResolution", typ: u(undefined, true) },
        { js: "tsBuildInfoFile", json: "tsBuildInfoFile", typ: u(undefined, "") },
        { js: "typeRoots", json: "typeRoots", typ: u(undefined, a("")) },
        { js: "types", json: "types", typ: u(undefined, a("")) },
        { js: "useDefineForClassFields", json: "useDefineForClassFields", typ: u(undefined, true) },
        { js: "watch", json: "watch", typ: u(undefined, true) },
    ], "any"),
    "TypeAcquisition": o([
        { js: "enable", json: "enable", typ: u(undefined, true) },
        { js: "exclude", json: "exclude", typ: u(undefined, a("")) },
        { js: "include", json: "include", typ: u(undefined, a("")) },
    ], "any"),
};
export { tsconfigSchema };
