import {TsConfigJson} from './getTsConfigJson';
export const ensureDeclaration = (
  wsTsConfigJson: TsConfigJson,
  missingSettings: TsConfigJson
) => {
  if (!wsTsConfigJson.compilerOptions?.declaration) {
    console.log(`    - Setting 'declaration' to true`);
    missingSettings.compilerOptions = {
      declaration: true,
    };
  }
};
