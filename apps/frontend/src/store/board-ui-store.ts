import { create } from "zustand";

type DragOverride = {
  [taskId: string]: {
    isCompleted: boolean;
  };
};

type BoardUIState = {
  overrides: DragOverride;
  setOverride: (id: string, isCompleted: boolean) => void;
  clearOverride: (id: string) => void;
};

export const useBoardUIStore = create<BoardUIState>((set) => ({
  overrides: {},

  setOverride: (id, isCompleted) =>
    set((s) => ({
      overrides: {
        ...s.overrides,
        [id]: { isCompleted },
      },
    })),

  clearOverride: (id) =>
    set((s) => {
      const copy = { ...s.overrides };
      delete copy[id];
      return { overrides: copy };
    }),
}));
