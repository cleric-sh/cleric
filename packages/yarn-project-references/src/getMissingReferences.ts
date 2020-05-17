import {relative} from 'path';
import {Reference} from './getTsConfigJson';
import {Workspace} from './getWorkspaces';
export const getMissingReferences = (
  refWorkspaces: Workspace[],
  ws: Workspace,
  existingRefs: Set<string>
) => {
  const relativePaths = refWorkspaces.map(refWs =>
    relative(ws.location, refWs.location)
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
