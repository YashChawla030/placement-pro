export interface SkillsSlidersType {
  skills: SkillSliderType[];
  displayName: string;
  showMovingSkills: boolean;
}
export type SkillSliderType = {
  name: string;
  rating: number;
};
