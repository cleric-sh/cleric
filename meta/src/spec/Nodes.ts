import {Directory} from './directory/Directory';
import {File} from './file/File';

export type Node = Directory | File;
export type Nodes = Array<Node>;
