import {existsSync} from 'fs';
import {join} from 'path';
import {SRC_NAME} from './ensureProjectReferences';
import {TsConfigJson} from './getTsConfigJson';
export const ensureFilesOrInclude = (
  wsTsConfigJson: TsConfigJson,
  wsRoot: string,
  missingSettings: TsConfigJson
) => {
  if (!(wsTsConfigJson.files || wsTsConfigJson.include)) {
    const srcPath = join(wsRoot, SRC_NAME);
    const srcExists = existsSync(srcPath);

    if (srcExists) {
      console.log(`    - Including '/src/**/*.ts' by default`);
      missingSettings.include = ['src/**/*'];
    } else {
      console.log(`    - Including '**/*' by default`);
      missingSettings.include = ['**/*'];
    }
  }
};