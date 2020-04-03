/* eslint-disable */
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
    bin?:    string | { [key: string]: string };
    /**
     * The url to your project's issue tracker and / or the email address to which issues should
     * be reported. These are helpful for people who encounter issues with your package.
     */
    bugs?: BugsObject | string;
    bundleDependencies?:  string[];
    bundledDependencies?: string[];
    /**
     * A list of people who contributed to this package.
     */
    contributors?: Array<PersonObject | string>;
    /**
     * If your code only runs on certain cpu architectures, you can specify which ones.
     */
    cpu?:          string[];
    /**
     * This helps people discover your package, as it's listed in 'npm search'.
     */
    description?:     string;
    directories?:     Directories;
    dist?:            Dist;
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
    jspm?:                CoreProperties;
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
    man?: string | string[];
    /**
     * An ECMAScript module ID that is the primary entry point to your program.
     */
    module?: string;
    /**
     * The name of the package.
     */
    name?:                 string;
    /**
     * You can specify which operating systems your module will run on
     */
    os?:               string[];
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
    readme?:        string;
    /**
     * Specify the place where your code lives. This is helpful for people who want to
     * contribute.
     */
    repository?:  RepositoryObject | string;
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
    /**
     * A 'config' hash can be used to set configuration parameters used in package scripts that
     * persist across upgrades.
     */
    config?: { [key: string]: any };
    dependencies?: { [key: string]: string };
    devDependencies?: { [key: string]: string };
    engines?:         { [key: string]: string };
    optionalDependencies?: { [key: string]: string };
    peerDependencies?: { [key: string]: string };
    publishConfig?: { [key: string]: any };
    resolutions?: { [key: string]: string };
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
    bin?:    string | { [key: string]: string };
    /**
     * The url to your project's issue tracker and / or the email address to which issues should
     * be reported. These are helpful for people who encounter issues with your package.
     */
    bugs?: BugsObject | string;
    /**
     * A list of people who contributed to this package.
     */
    contributors?: Array<PersonObject | string>;
    /**
     * If your code only runs on certain cpu architectures, you can specify which ones.
     */
    cpu?:          string[];
    /**
     * This helps people discover your package, as it's listed in 'npm search'.
     */
    description?:     string;
    directories?:     Directories;
    dist?:            Dist;
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
    man?: string | string[];
    /**
     * An ECMAScript module ID that is the primary entry point to your program.
     */
    module?: string;
    /**
     * The name of the package.
     */
    name?:                 string;
    /**
     * You can specify which operating systems your module will run on
     */
    os?:               string[];
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
    readme?:        string;
    /**
     * Specify the place where your code lives. This is helpful for people who want to
     * contribute.
     */
    repository?:  RepositoryObject | string;
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
    /**
     * A 'config' hash can be used to set configuration parameters used in package scripts that
     * persist across upgrades.
     */
    config?: { [key: string]: any };
    dependencies?: { [key: string]: string };
    devDependencies?: { [key: string]: string };
    engines?:         { [key: string]: string };
    optionalDependencies?: { [key: string]: string };
    peerDependencies?: { [key: string]: string };
    publishConfig?: { [key: string]: any };
    resolutions?: { [key: string]: string };
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
    return { additional, props };
}

function m(additional: any) {
    return { additional, props: [] };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "BugsObject": o([
        { js: "email", json: "email", typ: u(undefined, "") },
        { js: "url", json: "url", typ: u(undefined, "") },
    ], "any"),
    "CoreProperties": o([
        { js: "author", json: "author", typ: u(undefined, u(r("PersonObject"), "")) },
        { js: "bin", json: "bin", typ: u(undefined, u(m(""), "")) },
        { js: "bugs", json: "bugs", typ: u(undefined, u(r("BugsObject"), "")) },
        { js: "config", json: "config", typ: u(undefined, m("any")) },
        { js: "contributors", json: "contributors", typ: u(undefined, a(u(r("PersonObject"), ""))) },
        { js: "cpu", json: "cpu", typ: u(undefined, a("")) },
        { js: "dependencies", json: "dependencies", typ: u(undefined, m("")) },
        { js: "description", json: "description", typ: u(undefined, "") },
        { js: "devDependencies", json: "devDependencies", typ: u(undefined, m("")) },
        { js: "directories", json: "directories", typ: u(undefined, r("Directories")) },
        { js: "dist", json: "dist", typ: u(undefined, r("Dist")) },
        { js: "engines", json: "engines", typ: u(undefined, m("")) },
        { js: "engineStrict", json: "engineStrict", typ: u(undefined, true) },
        { js: "esnext", json: "esnext", typ: u(undefined, u(r("EsnextObject"), "")) },
        { js: "files", json: "files", typ: u(undefined, a("")) },
        { js: "homepage", json: "homepage", typ: u(undefined, "") },
        { js: "keywords", json: "keywords", typ: u(undefined, a("")) },
        { js: "license", json: "license", typ: u(undefined, "") },
        { js: "licenses", json: "licenses", typ: u(undefined, a(r("License"))) },
        { js: "main", json: "main", typ: u(undefined, "") },
        { js: "maintainers", json: "maintainers", typ: u(undefined, a(u(r("PersonObject"), ""))) },
        { js: "man", json: "man", typ: u(undefined, u(a(""), "")) },
        { js: "module", json: "module", typ: u(undefined, "") },
        { js: "name", json: "name", typ: u(undefined, "") },
        { js: "optionalDependencies", json: "optionalDependencies", typ: u(undefined, m("")) },
        { js: "os", json: "os", typ: u(undefined, a("")) },
        { js: "peerDependencies", json: "peerDependencies", typ: u(undefined, m("")) },
        { js: "preferGlobal", json: "preferGlobal", typ: u(undefined, true) },
        { js: "private", json: "private", typ: u(undefined, true) },
        { js: "publishConfig", json: "publishConfig", typ: u(undefined, m("any")) },
        { js: "readme", json: "readme", typ: u(undefined, "") },
        { js: "repository", json: "repository", typ: u(undefined, u(r("RepositoryObject"), "")) },
        { js: "resolutions", json: "resolutions", typ: u(undefined, m("")) },
        { js: "scripts", json: "scripts", typ: u(undefined, r("Scripts")) },
        { js: "type", json: "type", typ: u(undefined, "") },
        { js: "types", json: "types", typ: u(undefined, "") },
        { js: "typings", json: "typings", typ: u(undefined, "") },
        { js: "version", json: "version", typ: u(undefined, "") },
        { js: "workspaces", json: "workspaces", typ: u(undefined, "any") },
    ], "any"),
    "Directories": o([
        { js: "bin", json: "bin", typ: u(undefined, "") },
        { js: "doc", json: "doc", typ: u(undefined, "") },
        { js: "example", json: "example", typ: u(undefined, "") },
        { js: "lib", json: "lib", typ: u(undefined, "") },
        { js: "man", json: "man", typ: u(undefined, "") },
        { js: "test", json: "test", typ: u(undefined, "") },
    ], "any"),
    "Dist": o([
        { js: "shasum", json: "shasum", typ: u(undefined, "") },
        { js: "tarball", json: "tarball", typ: u(undefined, "") },
    ], "any"),
    "EsnextObject": o([
        { js: "browser", json: "browser", typ: u(undefined, "") },
        { js: "main", json: "main", typ: u(undefined, "") },
    ], ""),
    "License": o([
        { js: "type", json: "type", typ: u(undefined, "") },
        { js: "url", json: "url", typ: u(undefined, "") },
    ], "any"),
    "Package": o([
        { js: "author", json: "author", typ: u(undefined, u(r("PersonObject"), "")) },
        { js: "bin", json: "bin", typ: u(undefined, u(m(""), "")) },
        { js: "bugs", json: "bugs", typ: u(undefined, u(r("BugsObject"), "")) },
        { js: "config", json: "config", typ: u(undefined, m("any")) },
        { js: "contributors", json: "contributors", typ: u(undefined, a(u(r("PersonObject"), ""))) },
        { js: "cpu", json: "cpu", typ: u(undefined, a("")) },
        { js: "dependencies", json: "dependencies", typ: u(undefined, m("")) },
        { js: "description", json: "description", typ: u(undefined, "") },
        { js: "devDependencies", json: "devDependencies", typ: u(undefined, m("")) },
        { js: "directories", json: "directories", typ: u(undefined, r("Directories")) },
        { js: "dist", json: "dist", typ: u(undefined, r("Dist")) },
        { js: "engines", json: "engines", typ: u(undefined, m("")) },
        { js: "engineStrict", json: "engineStrict", typ: u(undefined, true) },
        { js: "esnext", json: "esnext", typ: u(undefined, u(r("EsnextObject"), "")) },
        { js: "files", json: "files", typ: u(undefined, a("")) },
        { js: "homepage", json: "homepage", typ: u(undefined, "") },
        { js: "keywords", json: "keywords", typ: u(undefined, a("")) },
        { js: "license", json: "license", typ: u(undefined, "") },
        { js: "licenses", json: "licenses", typ: u(undefined, a(r("License"))) },
        { js: "main", json: "main", typ: u(undefined, "") },
        { js: "maintainers", json: "maintainers", typ: u(undefined, a(u(r("PersonObject"), ""))) },
        { js: "man", json: "man", typ: u(undefined, u(a(""), "")) },
        { js: "module", json: "module", typ: u(undefined, "") },
        { js: "name", json: "name", typ: u(undefined, "") },
        { js: "optionalDependencies", json: "optionalDependencies", typ: u(undefined, m("")) },
        { js: "os", json: "os", typ: u(undefined, a("")) },
        { js: "peerDependencies", json: "peerDependencies", typ: u(undefined, m("")) },
        { js: "preferGlobal", json: "preferGlobal", typ: u(undefined, true) },
        { js: "private", json: "private", typ: u(undefined, true) },
        { js: "publishConfig", json: "publishConfig", typ: u(undefined, m("any")) },
        { js: "readme", json: "readme", typ: u(undefined, "") },
        { js: "repository", json: "repository", typ: u(undefined, u(r("RepositoryObject"), "")) },
        { js: "resolutions", json: "resolutions", typ: u(undefined, m("")) },
        { js: "scripts", json: "scripts", typ: u(undefined, r("Scripts")) },
        { js: "type", json: "type", typ: u(undefined, "") },
        { js: "types", json: "types", typ: u(undefined, "") },
        { js: "typings", json: "typings", typ: u(undefined, "") },
        { js: "version", json: "version", typ: u(undefined, "") },
        { js: "workspaces", json: "workspaces", typ: u(undefined, "any") },
        { js: "jspm", json: "jspm", typ: u(undefined, r("CoreProperties")) },
        { js: "bundleDependencies", json: "bundleDependencies", typ: u(undefined, a("")) },
        { js: "bundledDependencies", json: "bundledDependencies", typ: u(undefined, a("")) },
    ], "any"),
    "PersonObject": o([
        { js: "email", json: "email", typ: u(undefined, "") },
        { js: "name", json: "name", typ: "" },
        { js: "url", json: "url", typ: u(undefined, "") },
    ], "any"),
    "RepositoryObject": o([
        { js: "directory", json: "directory", typ: u(undefined, "") },
        { js: "type", json: "type", typ: u(undefined, "") },
        { js: "url", json: "url", typ: u(undefined, "") },
    ], "any"),
    "Scripts": o([
        { js: "install", json: "install", typ: u(undefined, "") },
        { js: "postinstall", json: "postinstall", typ: u(undefined, "") },
        { js: "postpack", json: "postpack", typ: u(undefined, "") },
        { js: "postpublish", json: "postpublish", typ: u(undefined, "") },
        { js: "postrestart", json: "postrestart", typ: u(undefined, "") },
        { js: "poststart", json: "poststart", typ: u(undefined, "") },
        { js: "poststop", json: "poststop", typ: u(undefined, "") },
        { js: "posttest", json: "posttest", typ: u(undefined, "") },
        { js: "postuninstall", json: "postuninstall", typ: u(undefined, "") },
        { js: "postversion", json: "postversion", typ: u(undefined, "") },
        { js: "preinstall", json: "preinstall", typ: u(undefined, "") },
        { js: "prepack", json: "prepack", typ: u(undefined, "") },
        { js: "prepare", json: "prepare", typ: u(undefined, "") },
        { js: "prepublish", json: "prepublish", typ: u(undefined, "") },
        { js: "prepublishOnly", json: "prepublishOnly", typ: u(undefined, "") },
        { js: "prerestart", json: "prerestart", typ: u(undefined, "") },
        { js: "prestart", json: "prestart", typ: u(undefined, "") },
        { js: "prestop", json: "prestop", typ: u(undefined, "") },
        { js: "pretest", json: "pretest", typ: u(undefined, "") },
        { js: "preuninstall", json: "preuninstall", typ: u(undefined, "") },
        { js: "preversion", json: "preversion", typ: u(undefined, "") },
        { js: "publish", json: "publish", typ: u(undefined, "") },
        { js: "restart", json: "restart", typ: u(undefined, "") },
        { js: "start", json: "start", typ: u(undefined, "") },
        { js: "stop", json: "stop", typ: u(undefined, "") },
        { js: "test", json: "test", typ: u(undefined, "") },
        { js: "uninstall", json: "uninstall", typ: u(undefined, "") },
        { js: "version", json: "version", typ: u(undefined, "") },
    ], ""),
};
export { packageSchema };
