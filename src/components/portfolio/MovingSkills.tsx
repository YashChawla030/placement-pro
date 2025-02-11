"use client";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { MovingCards } from "./MovingCards";
import { SkillSliderType } from "portfolioui/types";

const movement = [
  { x: 0, y: 0, vx: 0.3, vy: 0.3 },
  { x: 100, y: 100, vx: -0.3, vy: 0.3 },
  { x: 200, y: 200, vx: 0.3, vy: -0.3 },
  { x: 300, y: 300, vx: -0.3, vy: -0.3 },
  { x: 150, y: 50, vx: 0.2, vy: -0.4 },
  { x: 250, y: 150, vx: -0.4, vy: 0.2 },
  { x: 50, y: 250, vx: 0.5, vy: 0.1 },
  { x: 350, y: 50, vx: -0.1, vy: 0.5 },
  { x: 100, y: 350, vx: 0.4, vy: -0.2 },
  { x: 300, y: 200, vx: -0.2, vy: 0.4 },
  { x: 200, y: 100, vx: 0.3, vy: 0.3 },
  { x: 150, y: 300, vx: -0.3, vy: -0.3 },
  { x: 250, y: 250, vx: 0.2, vy: -0.4 },
  { x: 50, y: 150, vx: -0.4, vy: 0.2 },
];

export const MovingSkills = ({
  skills,
  containerClassName,
}: {
  skills: SkillSliderType[];
  containerClassName?: string;
}) => {
  const newSkills = useMemo(() => {
    return skills.map((skill, index) => ({
      id: index + 1,
      name: skill.name,
      ...movement[index % movement.length],
    }));
  }, [skills]);

  if (newSkills.length === 0) return <></>;
  return (
    <div
      className={cn(
        "bg-background w-full px-2 hidden md:block",
        containerClassName
      )}
    >
      <MovingCards cardDetails={newSkills} />
    </div>
  );
};
