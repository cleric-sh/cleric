import {getMissingReferences} from '../getMissingReferences';
import {TsConfigJson} from '../getTsConfigJson';
import {getWorkspaceDependencies} from '../getWorkspaceDependencies';
import {WorkspaceInfo} from '../getWorkspaceInfo';

export const ensureReferences = async (
  ws: WorkspaceInfo,
  missingSettings: TsConfigJson
) => {
  const tsConfig = ws.tsConfigJson.effective;

  const wsReferences = tsConfig.references;
  const existingRefs = new Set(wsReferences?.map(ref => ref.path) || []);

  const refWorkspaces = getWorkspaceDependencies(ws);

  const missingReferences = getMissingReferences(
    refWorkspaces,
    ws,
    existingRefs
  );

  if (missingReferences.length > 0) {
    console.log(`  - adding project references:`);
    missingReferences.forEach(ref => console.log(`    - ${ref.path}`));

    missingSettings.references = [
      ...(wsReferences || []),
      ...missingReferences,
    ];
  }
};
