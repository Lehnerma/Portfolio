import { ProjectId } from './translations';

/** Language-independent project data. Description and alt text live in the translations. */
export interface ProjectInfos {
  id: ProjectId;
  name: string;
  imgSrc: string;
  route: string;
}
