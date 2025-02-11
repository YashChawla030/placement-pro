export type ProjectType = {
  projectName: string;
  designation: string;
  link: string;
  skills: string[];
  companyName: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
};

export type ProjectsInfoType = {
  displayName: string;
  projects: ProjectType[];
};

export type ProjectTimelineType = {
  rank?: number;
  timeline: string;
  projectName: string;
  headline1: string;
  headline2: string;
  designation: string;
  link: string;
  skills: string;
  companyName: string;
  images: string[];
};

export type ProjectsTimelineInfoType = {
  displayName: string;
  projects: ProjectTimelineType[];
};
