"use client";
import React from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useAppStore } from "@/store/appStore";
import { SkillsEditableWithAuth } from "portfolioui/placement-pro";
import { SliderIconType } from "portfolioui";

export const Skills = () => {
  const {
    portfolio: { skillsInfo },
    isLoading,
    saveSkillsInfo,
  } = usePortfolioStore();
  const { isEditing } = useAppStore();

  return (
    <SkillsEditableWithAuth
      saveSkillsInfo={saveSkillsInfo}
      skillsInfo={skillsInfo}
      isEditing={isEditing}
      isLoading={isLoading}
      containerClassName="bg-white dark:bg-black"
      showTick={true}
      showOutput={false}
      sliderIconClassName={SliderIconType.TINY_THUMB}
    />
  );
};
