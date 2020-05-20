# Shared tsconfig.json configuration

> Shared [TypeScript config](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for typescript projects.

Idea based on https://github.com/sindresorhus/tsconfig


## Install

```
$ yarn add --dev @cleric/tsconfig
```


## Usage

`tsconfig.json`

```json
{
    "extends": "@cleric/tsconfig/tsconfig.base.config",
	"compilerOptions": {
		// Override base settings here...
	}
}
```

## License

MIT © [Sebastian Nemeth](https://sebastiannemeth.com)