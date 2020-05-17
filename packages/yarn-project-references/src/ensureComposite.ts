import {TsConfigJson} from './getTsConfigJson';
export const ensureComposite = (
  wsTsConfigJson: TsConfigJson,
  missingSettings: TsConfigJson
) => {
  if (!wsTsConfigJson.composite) {
    console.log(`    - Setting 'composite' to true`);
    missingSettings.composite = true;
  }
};
