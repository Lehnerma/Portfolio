import { ColleagueId } from './translations';

export interface ColleagueCard {
  id: ColleagueId;
  name: string;
  link: string;
  jobtitle: string;
  backgroundUrl: string;
  socialMediaType: 'github' | 'linkedin';
  socialLogoPath: string;
}
