import packageSchema from './package.schema.json';
// To parse this data:
//
//   import { Convert, Package } from "./file";
//
//   const package = Convert.toPackage(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Package {
    author?: PersonObject | string;
    bin?:    { [key: string]: string } | string;
    /**
     * The url to your project's issue tracker and / or the email address to which issues should
     * be reported. These are helpful for people who encounter issues with your package.
     */
    bugs?: BugsObject | string;
    /**
     * A 'config' hash can be used to set configuration parameters used in package scripts that
     * persist across upgrades.
     */
    config?: { [key: string]: any };
    /**
     * A list of people who contributed to this package.
     */
    contributors?: Array<PersonObject | string>;
    /**
     * If your code only runs on certain cpu architectures, you can specify which ones.
     */
    cpu?:          string[];
    dependencies?: { [key: string]: string };
    /**
     * This helps people discover your package, as it's listed in 'npm search'.
     */
    description?:     string;
    devDependencies?: { [key: string]: string };
    directories?:     Directories;
    dist?:            Dist;
    engines?:         { [key: string]: string };
    engineStrict?:    boolean;
    /**
     * A module ID with untranspiled code that is the primary entry point to your program.
     */
    esnext?: EsnextObject | string;
    /**
     * The 'files' field is an array of files to include in your project. If you name a folder
     * in the array, then it will also include the files inside that folder.
     */
    files?: string[];
    /**
     * The url to the project homepage.
     */
    homepage?: string;
    /**
     * This helps people discover your package as it's listed in 'npm search'.
     */
    keywords?: string[];
    /**
     * You should specify a license for your package so that people know how they are permitted
     * to use it, and any restrictions you're placing on it.
     */
    license?: string;
    /**
     * DEPRECATED: Instead, use SPDX expressions, like this: { "license": "ISC" } or {
     * "license": "(MIT OR Apache-2.0)" } see:
     * 'https://docs.npmjs.com/files/package.json#license'
     */
    licenses?: License[];
    /**
     * The main field is a module ID that is the primary entry point to your program.
     */
    main?: string;
    /**
     * A list of people who maintains this package.
     */
    maintainers?: Array<PersonObject | string>;
    /**
     * Specify either a single file or an array of filenames to put in place for the man program
     * to find.
     */
    man?: string[] | string;
    /**
     * An ECMAScript module ID that is the primary entry point to your program.
     */
    module?: string;
    /**
     * The name of the package.
     */
    name?:                 string;
    optionalDependencies?: { [key: string]: string };
    /**
     * You can specify which operating systems your module will run on
     */
    os?:               string[];
    peerDependencies?: { [key: string]: string };
    /**
     * DEPRECATED: This option used to trigger an npm warning, but it will no longer warn. It is
     * purely there for informational purposes. It is now recommended that you install any
     * binaries as local devDependencies wherever possible.
     */
    preferGlobal?: boolean;
    /**
     * If set to true, then npm will refuse to publish it.
     */
    private?:       boolean;
    publishConfig?: { [key: string]: any };
    readme?:        string;
    /**
     * Specify the place where your code lives. This is helpful for people who want to
     * contribute.
     */
    repository?:  RepositoryObject | string;
    resolutions?: { [key: string]: string };
    /**
     * The 'scripts' member is an object hash of script commands that are run at various times
     * in the lifecycle of your package. The key is the lifecycle event, and the value is the
     * command to run at that point.
     */
    scripts?: Scripts;
    /**
     * The type field defines how .js and extensionless files should be treated within a
     * particular package.json file’s package scope. Supported values: "commonjs" (default) or
     * "module".
     */
    type?: string;
    /**
     * Set the types property to point to your bundled declaration file
     */
    types?: string;
    /**
     * Note that the "typings" field is synonymous with "types", and could be used as well.
     */
    typings?: string;
    /**
     * Version must be parseable by node-semver, which is bundled with npm as a dependency.
     */
    version?: string;
    /**
     * To configure your yarn workspaces, please note private should be set to true to use yarn
     * workspaces
     */
    workspaces?:          any;
    jspm?:                CoreProperties;
    bundleDependencies?:  string[];
    bundledDependencies?: string[];
}

export interface PersonObject {
    email?: string;
    name:   string;
    url?:   string;
}

export interface BugsObject {
    /**
     * The email address to which issues should be reported.
     */
    email?: string;
    /**
     * The url to your project's issue tracker.
     */
    url?: string;
}

export interface Directories {
    /**
     * If you specify a 'bin' directory, then all the files in that folder will be used as the
     * 'bin' hash.
     */
    bin?: string;
    /**
     * Put markdown files in here. Eventually, these will be displayed nicely, maybe, someday.
     */
    doc?: string;
    /**
     * Put example scripts in here. Someday, it might be exposed in some clever way.
     */
    example?: string;
    /**
     * Tell people where the bulk of your library is. Nothing special is done with the lib
     * folder in any way, but it's useful meta info.
     */
    lib?: string;
    /**
     * A folder that is full of man pages. Sugar to generate a 'man' array by walking the folder.
     */
    man?:  string;
    test?: string;
}

export interface Dist {
    shasum?:  string;
    tarball?: string;
}

export interface EsnextObject {
    browser?: string;
    main?:    string;
}

export interface CoreProperties {
    author?: PersonObject | string;
    bin?:    { [key: string]: string } | string;
    /**
     * The url to your project's issue tracker and / or the email address to which issues should
     * be reported. These are helpful for people who encounter issues with your package.
     */
    bugs?: BugsObject | string;
    /**
     * A 'config' hash can be used to set configuration parameters used in package scripts that
     * persist across upgrades.
     */
    config?: { [key: string]: any };
    /**
     * A list of people who contributed to this package.
     */
    contributors?: Array<PersonObject | string>;
    /**
     * If your code only runs on certain cpu architectures, you can specify which ones.
     */
    cpu?:          string[];
    dependencies?: { [key: string]: string };
    /**
     * This helps people discover your package, as it's listed in 'npm search'.
     */
    description?:     string;
    devDependencies?: { [key: string]: string };
    directories?:     Directories;
    dist?:            Dist;
    engines?:         { [key: string]: string };
    engineStrict?:    boolean;
    /**
     * A module ID with untranspiled code that is the primary entry point to your program.
     */
    esnext?: EsnextObject | string;
    /**
     * The 'files' field is an array of files to include in your project. If you name a folder
     * in the array, then it will also include the files inside that folder.
     */
    files?: string[];
    /**
     * The url to the project homepage.
     */
    homepage?: string;
    /**
     * This helps people discover your package as it's listed in 'npm search'.
     */
    keywords?: string[];
    /**
     * You should specify a license for your package so that people know how they are permitted
     * to use it, and any restrictions you're placing on it.
     */
    license?: string;
    /**
     * DEPRECATED: Instead, use SPDX expressions, like this: { "license": "ISC" } or {
     * "license": "(MIT OR Apache-2.0)" } see:
     * 'https://docs.npmjs.com/files/package.json#license'
     */
    licenses?: License[];
    /**
     * The main field is a module ID that is the primary entry point to your program.
     */
    main?: string;
    /**
     * A list of people who maintains this package.
     */
    maintainers?: Array<PersonObject | string>;
    /**
     * Specify either a single file or an array of filenames to put in place for the man program
     * to find.
     */
    man?: string[] | string;
    /**
     * An ECMAScript module ID that is the primary entry point to your program.
     */
    module?: string;
    /**
     * The name of the package.
     */
    name?:                 string;
    optionalDependencies?: { [key: string]: string };
    /**
     * You can specify which operating systems your module will run on
     */
    os?:               string[];
    peerDependencies?: { [key: string]: string };
    /**
     * DEPRECATED: This option used to trigger an npm warning, but it will no longer warn. It is
     * purely there for informational purposes. It is now recommended that you install any
     * binaries as local devDependencies wherever possible.
     */
    preferGlobal?: boolean;
    /**
     * If set to true, then npm will refuse to publish it.
     */
    private?:       boolean;
    publishConfig?: { [key: string]: any };
    readme?:        string;
    /**
     * Specify the place where your code lives. This is helpful for people who want to
     * contribute.
     */
    repository?:  RepositoryObject | string;
    resolutions?: { [key: string]: string };
    /**
     * The 'scripts' member is an object hash of script commands that are run at various times
     * in the lifecycle of your package. The key is the lifecycle event, and the value is the
     * command to run at that point.
     */
    scripts?: Scripts;
    /**
     * The type field defines how .js and extensionless files should be treated within a
     * particular package.json file’s package scope. Supported values: "commonjs" (default) or
     * "module".
     */
    type?: string;
    /**
     * Set the types property to point to your bundled declaration file
     */
    types?: string;
    /**
     * Note that the "typings" field is synonymous with "types", and could be used as well.
     */
    typings?: string;
    /**
     * Version must be parseable by node-semver, which is bundled with npm as a dependency.
     */
    version?: string;
    /**
     * To configure your yarn workspaces, please note private should be set to true to use yarn
     * workspaces
     */
    workspaces?: any;
}

export interface License {
    type?: string;
    url?:  string;
}

export interface RepositoryObject {
    directory?: string;
    type?:      string;
    url?:       string;
}

/**
 * The 'scripts' member is an object hash of script commands that are run at various times
 * in the lifecycle of your package. The key is the lifecycle event, and the value is the
 * command to run at that point.
 */
export interface Scripts {
    install?:     string;
    postinstall?: string;
    /**
     * Run AFTER the tarball has been generated and moved to its final destination.
     */
    postpack?:    string;
    postpublish?: string;
    postrestart?: string;
    poststart?:   string;
    poststop?:    string;
    posttest?:    string;
    /**
     * Run AFTER the package is uninstalled
     */
    postuninstall?: string;
    /**
     * Run AFTER bump the package version
     */
    postversion?: string;
    /**
     * Run BEFORE the package is installed
     */
    preinstall?: string;
    /**
     * run BEFORE a tarball is packed (on npm pack, npm publish, and when installing git
     * dependencies)
     */
    prepack?: string;
    /**
     * Run both BEFORE the package is packed and published, and on local npm install without any
     * arguments. This is run AFTER prepublish, but BEFORE prepublishOnly
     */
    prepare?: string;
    /**
     * Run BEFORE the package is published (Also run on local npm install without any arguments)
     */
    prepublish?: string;
    /**
     * Run BEFORE the package is prepared and packed, ONLY on npm publish
     */
    prepublishOnly?: string;
    prerestart?:     string;
    prestart?:       string;
    prestop?:        string;
    pretest?:        string;
    preuninstall?:   string;
    preversion?:     string;
    publish?:        string;
    restart?:        string;
    start?:          string;
    stop?:           string;
    test?:           string;
    uninstall?:      string;
    version?:        string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toPackage(json: string): Package {
        return cast(JSON.parse(json), r("Package"));
    }

    public static packageToJson(value: Package): string {
        return JSON.stringify(uncast(value, r("Package")), null, 2);
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
    "Package": o([
        { json: "author", js: "author", typ: u(undefined, u(r("PersonObject"), "")) },
        { json: "bin", js: "bin", typ: u(undefined, u(m(""), "")) },
        { json: "bugs", js: "bugs", typ: u(undefined, u(r("BugsObject"), "")) },
        { json: "config", js: "config", typ: u(undefined, m("any")) },
        { json: "contributors", js: "contributors", typ: u(undefined, a(u(r("PersonObject"), ""))) },
        { json: "cpu", js: "cpu", typ: u(undefined, a("")) },
        { json: "dependencies", js: "dependencies", typ: u(undefined, m("")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "devDependencies", js: "devDependencies", typ: u(undefined, m("")) },
        { json: "directories", js: "directories", typ: u(undefined, r("Directories")) },
        { json: "dist", js: "dist", typ: u(undefined, r("Dist")) },
        { json: "engines", js: "engines", typ: u(undefined, m("")) },
        { json: "engineStrict", js: "engineStrict", typ: u(undefined, true) },
        { json: "esnext", js: "esnext", typ: u(undefined, u(r("EsnextObject"), "")) },
        { json: "files", js: "files", typ: u(undefined, a("")) },
        { json: "homepage", js: "homepage", typ: u(undefined, "") },
        { json: "keywords", js: "keywords", typ: u(undefined, a("")) },
        { json: "license", js: "license", typ: u(undefined, "") },
        { json: "licenses", js: "licenses", typ: u(undefined, a(r("License"))) },
        { json: "main", js: "main", typ: u(undefined, "") },
        { json: "maintainers", js: "maintainers", typ: u(undefined, a(u(r("PersonObject"), ""))) },
        { json: "man", js: "man", typ: u(undefined, u(a(""), "")) },
        { json: "module", js: "module", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "optionalDependencies", js: "optionalDependencies", typ: u(undefined, m("")) },
        { json: "os", js: "os", typ: u(undefined, a("")) },
        { json: "peerDependencies", js: "peerDependencies", typ: u(undefined, m("")) },
        { json: "preferGlobal", js: "preferGlobal", typ: u(undefined, true) },
        { json: "private", js: "private", typ: u(undefined, true) },
        { json: "publishConfig", js: "publishConfig", typ: u(undefined, m("any")) },
        { json: "readme", js: "readme", typ: u(undefined, "") },
        { json: "repository", js: "repository", typ: u(undefined, u(r("RepositoryObject"), "")) },
        { json: "resolutions", js: "resolutions", typ: u(undefined, m("")) },
        { json: "scripts", js: "scripts", typ: u(undefined, r("Scripts")) },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "types", js: "types", typ: u(undefined, "") },
        { json: "typings", js: "typings", typ: u(undefined, "") },
        { json: "version", js: "version", typ: u(undefined, "") },
        { json: "workspaces", js: "workspaces", typ: u(undefined, "any") },
        { json: "jspm", js: "jspm", typ: u(undefined, r("CoreProperties")) },
        { json: "bundleDependencies", js: "bundleDependencies", typ: u(undefined, a("")) },
        { json: "bundledDependencies", js: "bundledDependencies", typ: u(undefined, a("")) },
    ], "any"),
    "PersonObject": o([
        { json: "email", js: "email", typ: u(undefined, "") },
        { json: "name", js: "name", typ: "" },
        { json: "url", js: "url", typ: u(undefined, "") },
    ], "any"),
    "BugsObject": o([
        { json: "email", js: "email", typ: u(undefined, "") },
        { json: "url", js: "url", typ: u(undefined, "") },
    ], "any"),
    "Directories": o([
        { json: "bin", js: "bin", typ: u(undefined, "") },
        { json: "doc", js: "doc", typ: u(undefined, "") },
        { json: "example", js: "example", typ: u(undefined, "") },
        { json: "lib", js: "lib", typ: u(undefined, "") },
        { json: "man", js: "man", typ: u(undefined, "") },
        { json: "test", js: "test", typ: u(undefined, "") },
    ], "any"),
    "Dist": o([
        { json: "shasum", js: "shasum", typ: u(undefined, "") },
        { json: "tarball", js: "tarball", typ: u(undefined, "") },
    ], "any"),
    "EsnextObject": o([
        { json: "browser", js: "browser", typ: u(undefined, "") },
        { json: "main", js: "main", typ: u(undefined, "") },
    ], ""),
    "CoreProperties": o([
        { json: "author", js: "author", typ: u(undefined, u(r("PersonObject"), "")) },
        { json: "bin", js: "bin", typ: u(undefined, u(m(""), "")) },
        { json: "bugs", js: "bugs", typ: u(undefined, u(r("BugsObject"), "")) },
        { json: "config", js: "config", typ: u(undefined, m("any")) },
        { json: "contributors", js: "contributors", typ: u(undefined, a(u(r("PersonObject"), ""))) },
        { json: "cpu", js: "cpu", typ: u(undefined, a("")) },
        { json: "dependencies", js: "dependencies", typ: u(undefined, m("")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "devDependencies", js: "devDependencies", typ: u(undefined, m("")) },
        { json: "directories", js: "directories", typ: u(undefined, r("Directories")) },
        { json: "dist", js: "dist", typ: u(undefined, r("Dist")) },
        { json: "engines", js: "engines", typ: u(undefined, m("")) },
        { json: "engineStrict", js: "engineStrict", typ: u(undefined, true) },
        { json: "esnext", js: "esnext", typ: u(undefined, u(r("EsnextObject"), "")) },
        { json: "files", js: "files", typ: u(undefined, a("")) },
        { json: "homepage", js: "homepage", typ: u(undefined, "") },
        { json: "keywords", js: "keywords", typ: u(undefined, a("")) },
        { json: "license", js: "license", typ: u(undefined, "") },
        { json: "licenses", js: "licenses", typ: u(undefined, a(r("License"))) },
        { json: "main", js: "main", typ: u(undefined, "") },
        { json: "maintainers", js: "maintainers", typ: u(undefined, a(u(r("PersonObject"), ""))) },
        { json: "man", js: "man", typ: u(undefined, u(a(""), "")) },
        { json: "module", js: "module", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "optionalDependencies", js: "optionalDependencies", typ: u(undefined, m("")) },
        { json: "os", js: "os", typ: u(undefined, a("")) },
        { json: "peerDependencies", js: "peerDependencies", typ: u(undefined, m("")) },
        { json: "preferGlobal", js: "preferGlobal", typ: u(undefined, true) },
        { json: "private", js: "private", typ: u(undefined, true) },
        { json: "publishConfig", js: "publishConfig", typ: u(undefined, m("any")) },
        { json: "readme", js: "readme", typ: u(undefined, "") },
        { json: "repository", js: "repository", typ: u(undefined, u(r("RepositoryObject"), "")) },
        { json: "resolutions", js: "resolutions", typ: u(undefined, m("")) },
        { json: "scripts", js: "scripts", typ: u(undefined, r("Scripts")) },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "types", js: "types", typ: u(undefined, "") },
        { json: "typings", js: "typings", typ: u(undefined, "") },
        { json: "version", js: "version", typ: u(undefined, "") },
        { json: "workspaces", js: "workspaces", typ: u(undefined, "any") },
    ], "any"),
    "License": o([
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "url", js: "url", typ: u(undefined, "") },
    ], "any"),
    "RepositoryObject": o([
        { json: "directory", js: "directory", typ: u(undefined, "") },
        { json: "type", js: "type", typ: u(undefined, "") },
        { json: "url", js: "url", typ: u(undefined, "") },
    ], "any"),
    "Scripts": o([
        { json: "install", js: "install", typ: u(undefined, "") },
        { json: "postinstall", js: "postinstall", typ: u(undefined, "") },
        { json: "postpack", js: "postpack", typ: u(undefined, "") },
        { json: "postpublish", js: "postpublish", typ: u(undefined, "") },
        { json: "postrestart", js: "postrestart", typ: u(undefined, "") },
        { json: "poststart", js: "poststart", typ: u(undefined, "") },
        { json: "poststop", js: "poststop", typ: u(undefined, "") },
        { json: "posttest", js: "posttest", typ: u(undefined, "") },
        { json: "postuninstall", js: "postuninstall", typ: u(undefined, "") },
        { json: "postversion", js: "postversion", typ: u(undefined, "") },
        { json: "preinstall", js: "preinstall", typ: u(undefined, "") },
        { json: "prepack", js: "prepack", typ: u(undefined, "") },
        { json: "prepare", js: "prepare", typ: u(undefined, "") },
        { json: "prepublish", js: "prepublish", typ: u(undefined, "") },
        { json: "prepublishOnly", js: "prepublishOnly", typ: u(undefined, "") },
        { json: "prerestart", js: "prerestart", typ: u(undefined, "") },
        { json: "prestart", js: "prestart", typ: u(undefined, "") },
        { json: "prestop", js: "prestop", typ: u(undefined, "") },
        { json: "pretest", js: "pretest", typ: u(undefined, "") },
        { json: "preuninstall", js: "preuninstall", typ: u(undefined, "") },
        { json: "preversion", js: "preversion", typ: u(undefined, "") },
        { json: "publish", js: "publish", typ: u(undefined, "") },
        { json: "restart", js: "restart", typ: u(undefined, "") },
        { json: "start", js: "start", typ: u(undefined, "") },
        { json: "stop", js: "stop", typ: u(undefined, "") },
        { json: "test", js: "test", typ: u(undefined, "") },
        { json: "uninstall", js: "uninstall", typ: u(undefined, "") },
        { json: "version", js: "version", typ: u(undefined, "") },
    ], ""),
};
export { packageSchema };
