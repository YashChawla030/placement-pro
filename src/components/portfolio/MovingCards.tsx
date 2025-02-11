"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfettiButton } from "../magicui/confetti";

interface Skill {
  id: number;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
}

type PropType = {
  cardDetails: { id: number; name: string }[];
};

export const MovingCards: React.FC<PropType> = ({ cardDetails }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  // const { windowSize} = useWindowSize()
  const buttonPadding = 24; // Adjusted padding for smaller screens
  const baseButtonSize = useRef<number>(); // Scaled for small screens

  const [skillsState, setSkillsState] = useState<Skill[]>([]);

  useEffect(() => {
    const tempButtonSize = window.innerWidth < 640 ? 60 : 80;
    baseButtonSize.current = tempButtonSize;
    const initialSkills = cardDetails.map((skill) => {
      const width = tempButtonSize + skill.name.length * 5 + buttonPadding;
      const height = tempButtonSize * 0.5; // Reduced height for smaller screens
      return {
        id: skill.id,
        name: skill.name,
        x: Math.random() * (window.innerWidth * 0.7 - width),
        y: Math.random() * (window.innerHeight * 0.7 - height),
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        width,
        height,
      };
    });
    setSkillsState(initialSkills);
  }, [cardDetails]);

  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      setSkillsState((prevSkills) => {
        const newSkills = prevSkills.map((skill) => {
          // eslint-disable-next-line prefer-const
          let { x, y, vx, vy, width, height } = skill;

          x += vx;
          y += vy;

          // Boundary collision
          if (x <= 0 || x + width >= containerRect.width) {
            vx = -vx;
            x = Math.max(0, Math.min(x, containerRect.width - width));
          }
          if (y <= 0 || y + height >= containerRect.height) {
            vy = -vy;
            y = Math.max(0, Math.min(y, containerRect.height - height));
          }

          return { ...skill, x, y, vx, vy };
        });

        for (let i = 0; i < newSkills.length; i++) {
          for (let j = i + 1; j < newSkills.length; j++) {
            const dx =
              newSkills[i].x +
              newSkills[i].width / 2 -
              (newSkills[j].x + newSkills[j].width / 2);
            const dy =
              newSkills[i].y +
              newSkills[i].height / 2 -
              (newSkills[j].y + newSkills[j].height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (newSkills[i].width + newSkills[j].width) / 2;

            if (distance < minDistance) {
              [newSkills[i].vx, newSkills[j].vx] = [
                newSkills[j].vx,
                newSkills[i].vx,
              ];
              [newSkills[i].vy, newSkills[j].vy] = [
                newSkills[j].vy,
                newSkills[i].vy,
              ];

              const angle = Math.atan2(dy, dx);
              const overlap = minDistance - distance;
              newSkills[i].x += Math.cos(angle) * (overlap / 2);
              newSkills[i].y += Math.sin(angle) * (overlap / 2);
              newSkills[j].x -= Math.cos(angle) * (overlap / 2);
              newSkills[j].y -= Math.sin(angle) * (overlap / 2);
            }
          }
        }

        return newSkills;
      });

      animationRef.current = requestAnimationFrame(updatePositions);
    };

    animationRef.current = requestAnimationFrame(updatePositions);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] px-2 bg-white dark:bg-black rounded-lg overflow-hidden"
    >
      <AnimatePresence>
        {skillsState.map((skill) => (
          <motion.div
            key={skill.id}
            animate={{ x: skill.x, y: skill.y }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute"
            style={{ width: skill.width, height: skill.height }}
          >
            <ConfettiButton
              variant={"outline"}
              className="w-full h-full py-3 text-xs sm:text-sm flex items-center justify-center rounded-full shadow-md scale-95 transition-all duration-200 ease-in-out hover:scale-105"
            >
              {skill.name}
            </ConfettiButton>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
