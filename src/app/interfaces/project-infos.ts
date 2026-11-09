import { ProjectId } from './translations';

export interface ProjectInfos {
  id: ProjectId;
  name: string;
  imgSrc: string;
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  devStack: DevStack[];
}

interface DevStack {
  name: string;
  iconPath: string;
}
