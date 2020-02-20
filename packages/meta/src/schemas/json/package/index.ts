const packageSchema = 
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "JSON schema for NPM package.json files",
  "definitions": {
    "person": {
      "description": "A person who has been involved in creating or maintaining this package",
      "type": ["object", "string"],
      "required": ["name"],
      "properties": {
        "name": {
          "type": "string"
        },
        "url": {
          "type": "string",
          "format": "uri"
        },
        "email": {
          "type": "string",
          "format": "email"
        }
      }
    },
    "bundledDependency": {
      "description": "Array of package names that will be bundled when publishing the package.",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "dependency": {
      "description": "Dependencies are specified with a simple hash of package name to version range. The version range is a string which has one or more space-separated descriptors. Dependencies can also be identified with a tarball or git URL.",
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "scriptsInstallAfter": {
      "description": "Run AFTER the package is installed",
      "type": "string"
    },
    "scriptsPublishAfter": {
      "description": "Run AFTER the package is published",
      "type": "string"
    },
    "scriptsRestart": {
      "description": "Run by the 'npm restart' command. Note: 'npm restart' will run the stop and start scripts if no restart script is provided.",
      "type": "string"
    },
    "scriptsStart": {
      "description": "Run by the 'npm start' command",
      "type": "string"
    },
    "scriptsStop": {
      "description": "Run by the 'npm stop' command",
      "type": "string"
    },
    "scriptsTest": {
      "description": "Run by the 'npm test' command",
      "type": "string"
    },
    "scriptsUninstallBefore": {
      "description": "Run BEFORE the package is uninstalled",
      "type": "string"
    },
    "scriptsVersionBefore": {
      "description": "Run BEFORE bump the package version",
      "type": "string"
    },
    "coreProperties": {
      "type": "object",

      "patternProperties": {
        "^_": {
          "description": "Any property starting with _ is valid.",
          "additionalProperties": true,
          "additionalItems": true,
          "tsType": "any"
        }
      },

      "properties": {
        "name": {
          "description": "The name of the package.",
          "type": "string",
          "maxLength": 214,
          "minLength": 1,
          "pattern": "^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$"
        },
        "version": {
          "description": "Version must be parseable by node-semver, which is bundled with npm as a dependency.",
          "type": "string"
        },
        "description": {
          "description": "This helps people discover your package, as it's listed in 'npm search'.",
          "type": "string"
        },
        "keywords": {
          "description": "This helps people discover your package as it's listed in 'npm search'.",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "homepage": {
          "description": "The url to the project homepage.",
          "type": "string"
        },
        "bugs": {
          "description": "The url to your project's issue tracker and / or the email address to which issues should be reported. These are helpful for people who encounter issues with your package.",
          "type": ["object", "string"],
          "properties": {
            "url": {
              "type": "string",
              "description": "The url to your project's issue tracker.",
              "format": "uri"
            },
            "email": {
              "type": "string",
              "description": "The email address to which issues should be reported.",
              "format": "email"
            }
          }
        },
        "license": {
          "type": "string",
          "description": "You should specify a license for your package so that people know how they are permitted to use it, and any restrictions you're placing on it."
        },
        "licenses": {
          "description": "DEPRECATED: Instead, use SPDX expressions, like this: { \"license\": \"ISC\" } or { \"license\": \"(MIT OR Apache-2.0)\" } see: 'https://docs.npmjs.com/files/package.json#license'",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string"
              },
              "url": {
                "type": "string",
                "format": "uri"
              }
            }
          }
        },
        "author": {
          "$ref": "#/definitions/person"
        },
        "contributors": {
          "description": "A list of people who contributed to this package.",
          "type": "array",
          "items": {
            "$ref": "#/definitions/person"
          }
        },
        "maintainers": {
          "description": "A list of people who maintains this package.",
          "type": "array",
          "items": {
            "$ref": "#/definitions/person"
          }
        },
        "files": {
          "description": "The 'files' field is an array of files to include in your project. If you name a folder in the array, then it will also include the files inside that folder.",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "main": {
          "description": "The main field is a module ID that is the primary entry point to your program.",
          "type": "string"
        },
        "bin": {
          "type": ["string", "object"],
          "additionalProperties": {
            "type": "string"
          }
        },
        "type": {
          "description": "The type field defines how .js and extensionless files should be treated within a particular package.json file’s package scope. Supported values: \"commonjs\" (default) or \"module\".",
          "type": "string"
        },
        "types": {
          "description": "Set the types property to point to your bundled declaration file",
          "type": "string"
        },
        "typings": {
          "description": "Note that the \"typings\" field is synonymous with \"types\", and could be used as well.",
          "type": "string"
        },
        "man": {
          "type": ["array", "string"],
          "description": "Specify either a single file or an array of filenames to put in place for the man program to find.",
          "items": {
            "type": "string"
          }
        },
        "directories": {
          "type": "object",
          "properties": {
            "bin": {
              "description": "If you specify a 'bin' directory, then all the files in that folder will be used as the 'bin' hash.",
              "type": "string"
            },
            "doc": {
              "description": "Put markdown files in here. Eventually, these will be displayed nicely, maybe, someday.",
              "type": "string"
            },
            "example": {
              "description": "Put example scripts in here. Someday, it might be exposed in some clever way.",
              "type": "string"
            },
            "lib": {
              "description": "Tell people where the bulk of your library is. Nothing special is done with the lib folder in any way, but it's useful meta info.",
              "type": "string"
            },
            "man": {
              "description": "A folder that is full of man pages. Sugar to generate a 'man' array by walking the folder.",
              "type": "string"
            },
            "test": {
              "type": "string"
            }
          }
        },
        "repository": {
          "description": "Specify the place where your code lives. This is helpful for people who want to contribute.",
          "type": ["object", "string"],
          "properties": {
            "type": {
              "type": "string"
            },
            "url": {
              "type": "string"
            },
            "directory": {
              "type": "string"
            }
          }
        },
        "scripts": {
          "description": "The 'scripts' member is an object hash of script commands that are run at various times in the lifecycle of your package. The key is the lifecycle event, and the value is the command to run at that point.",
          "type": "object",
          "properties": {
            "prepublish": {
              "type": "string",
              "description": "Run BEFORE the package is published (Also run on local npm install without any arguments)"
            },
            "prepare": {
              "type": "string",
              "description": "Run both BEFORE the package is packed and published, and on local npm install without any arguments. This is run AFTER prepublish, but BEFORE prepublishOnly"
            },
            "prepublishOnly": {
              "type": "string",
              "description": "Run BEFORE the package is prepared and packed, ONLY on npm publish"
            },
            "prepack": {
              "type": "string",
              "description": "run BEFORE a tarball is packed (on npm pack, npm publish, and when installing git dependencies)"
            },
            "postpack": {
              "type": "string",
              "description": "Run AFTER the tarball has been generated and moved to its final destination."
            },
            "publish": {
              "$ref": "#/definitions/scriptsPublishAfter"
            },
            "postpublish": {
              "$ref": "#/definitions/scriptsPublishAfter"
            },
            "preinstall": {
              "type": "string",
              "description": "Run BEFORE the package is installed"
            },
            "install": {
              "$ref": "#/definitions/scriptsInstallAfter"
            },
            "postinstall": {
              "$ref": "#/definitions/scriptsInstallAfter"
            },
            "preuninstall": {
              "$ref": "#/definitions/scriptsUninstallBefore"
            },
            "uninstall": {
              "$ref": "#/definitions/scriptsUninstallBefore"
            },
            "postuninstall": {
              "type": "string",
              "description": "Run AFTER the package is uninstalled"
            },
            "preversion": {
              "$ref": "#/definitions/scriptsVersionBefore"
            },
            "version": {
              "$ref": "#/definitions/scriptsVersionBefore"
            },
            "postversion": {
              "type": "string",
              "description": "Run AFTER bump the package version"
            },
            "pretest": {
              "$ref": "#/definitions/scriptsTest"
            },
            "test": {
              "$ref": "#/definitions/scriptsTest"
            },
            "posttest": {
              "$ref": "#/definitions/scriptsTest"
            },
            "prestop": {
              "$ref": "#/definitions/scriptsStop"
            },
            "stop": {
              "$ref": "#/definitions/scriptsStop"
            },
            "poststop": {
              "$ref": "#/definitions/scriptsStop"
            },
            "prestart": {
              "$ref": "#/definitions/scriptsStart"
            },
            "start": {
              "$ref": "#/definitions/scriptsStart"
            },
            "poststart": {
              "$ref": "#/definitions/scriptsStart"
            },
            "prerestart": {
              "$ref": "#/definitions/scriptsRestart"
            },
            "restart": {
              "$ref": "#/definitions/scriptsRestart"
            },
            "postrestart": {
              "$ref": "#/definitions/scriptsRestart"
            }
          },
          "additionalProperties": {
            "type": "string",
            "tsType": "string | undefined"
          }
        },
        "config": {
          "description": "A 'config' hash can be used to set configuration parameters used in package scripts that persist across upgrades.",
          "type": "object",
          "additionalProperties": true
        },
        "dependencies": {
          "$ref": "#/definitions/dependency"
        },
        "devDependencies": {
          "$ref": "#/definitions/dependency"
        },
        "optionalDependencies": {
          "$ref": "#/definitions/dependency"
        },
        "peerDependencies": {
          "$ref": "#/definitions/dependency"
        },
        "resolutions": {
          "$ref": "#/definitions/dependency"
        },
        "engines": {
          "type": "object",
          "additionalProperties": {
            "type": "string"
          }
        },
        "engineStrict": {
          "type": "boolean"
        },
        "os": {
          "description": "You can specify which operating systems your module will run on",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "cpu": {
          "description": "If your code only runs on certain cpu architectures, you can specify which ones.",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "preferGlobal": {
          "type": "boolean",
          "description": "DEPRECATED: This option used to trigger an npm warning, but it will no longer warn. It is purely there for informational purposes. It is now recommended that you install any binaries as local devDependencies wherever possible."
        },
        "private": {
          "type": "boolean",
          "description": "If set to true, then npm will refuse to publish it."
        },
        "publishConfig": {
          "type": "object",
          "additionalProperties": true
        },
        "dist": {
          "type": "object",
          "properties": {
            "shasum": {
              "type": "string"
            },
            "tarball": {
              "type": "string"
            }
          }
        },
        "readme": {
          "type": "string"
        },
        "module": {
          "description": "An ECMAScript module ID that is the primary entry point to your program.",
          "type": "string"
        },
        "esnext": {
          "description": "A module ID with untranspiled code that is the primary entry point to your program.",
          "type": ["string", "object"],
          "properties": {
            "main": {
              "type": "string"
            },
            "browser": {
              "type": "string"
            }
          },
          "additionalProperties": {
            "type": "string"
          }
        },
        "workspaces": {
          "description": "To configure your yarn workspaces, please note private should be set to true to use yarn workspaces",
          "anyof": [
            {
              "type": "array",
              "description":"your workspace folders also takes a glob",
              "items": "string"
            },
            {
              "type": "object",
              "properties": {
                "packages": {
                  "type": "array",
                  "description":"your workspace folder's also takes a glob",
                  "items": "string"
                },
                "nohoist": {
                  "type": "array",
                  "description":"nohoist your npm packages",
                  "items": "string"
                }
              }
            }
          ]
        }
      }
    },
    "jspmDefinition": {
      "properties": {
        "jspm": { "$ref": "#/definitions/coreProperties" }
      }
    }
  },
  "allOf": [
    { "$ref": "#/definitions/coreProperties" },
    { "$ref": "#/definitions/jspmDefinition" },
    {
      "anyOf": [
        {
          "properties": {
            "bundleDependencies": {
              "$ref": "#/definitions/bundledDependency"
            }
          },
          "not": {
            "properties": {
              "bundledDependencies": {}
            },
            "required": ["bundledDependencies"]
          }
        },
        {
          "properties": {
            "bundledDependencies": {
              "$ref": "#/definitions/bundledDependency"
            }
          },
          "not": {
            "properties": {
              "bundleDependencies": {}
            },
            "required": ["bundleDependencies"]
          }
        }
      ]
    }
  ]
}
export default packageSchema;
