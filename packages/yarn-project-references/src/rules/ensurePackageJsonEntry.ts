import {set, trimStart, unset} from 'lodash';
import {PackageJson} from '../getPackageJson';
import {WorkspaceInfo} from '../getWorkspaceInfo';

export const ensurePackageJsonEntry = (
  ws: WorkspaceInfo,
  newPackgeJsonSettings: PackageJson
) => {
  const outDir = ws.tsConfigJson.effective.compilerOptions?.outDir || 'dist';

  if (
    !ws.packageJson.main ||
    !trimStart(ws.packageJson.main, './').startsWith(outDir)
  ) {
    console.log(`  - Setting 'main' in 'package.json' to '${outDir}/index.js'`);
    set(newPackgeJsonSettings, 'main', `${outDir}/index.js`);
  }

  if (
    !ws.packageJson.types ||
    !trimStart(ws.packageJson.types, './').startsWith(outDir)
  ) {
    console.log(
      `  - Setting 'types' in 'package.json' to '${outDir}/index.ts'`
    );
    set(newPackgeJsonSettings, 'types', `${outDir}/index.ts`);
  }

  if (ws.packageJson['local:main']) {
    console.log(`  - Removing 'local:main' in 'package.json'`);
    unset(newPackgeJsonSettings, 'local:main');
  }
};
