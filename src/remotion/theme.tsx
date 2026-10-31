import { createContext, useContext, type ReactNode } from "react";
import type { Episode, Template } from "../catalog/types";
import { fontsFor } from "./fonts";

type Lesson = {
  episode: Episode;
  template: Template;
  fonts: ReturnType<typeof fontsFor>;
};

const LessonContext = createContext<Lesson | null>(null);

export function LessonProvider({
  episode,
  template,
  children,
}: {
  episode: Episode;
  template: Template;
  children: ReactNode;
}) {
  return (
    <LessonContext.Provider value={{ episode, template, fonts: fontsFor(template) }}>
      {children}
    </LessonContext.Provider>
  );
}

export function useLesson() {
  const lesson = useContext(LessonContext);
  if (!lesson) throw new Error("Lesson context missing");
  return lesson;
}
