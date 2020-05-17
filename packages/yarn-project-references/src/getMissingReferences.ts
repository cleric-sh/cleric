import {relative} from 'path';
import {Reference} from './getTsConfigJson';
import {WorkspaceInfo} from './getWorkspaceInfo';
import {Workspace} from './getWorkspaces';

export const getMissingReferences = (
  refWorkspaces: Workspace[],
  ws: WorkspaceInfo,
  existingRefs: Set<string>
) => {
  const relativePaths = refWorkspaces.map(refWs =>
    relative(ws.workspace.location, refWs.location)
  );

  const requiredReferences = relativePaths.map(
    rel =>
      ({
        path: rel,
      } as Reference)
  );

  const missingReferences = requiredReferences.filter(
    ref => !existingRefs.has(ref.path)
  );
  return missingReferences;
};
