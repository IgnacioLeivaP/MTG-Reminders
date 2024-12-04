import { create } from 'zustand';
import { Reminder } from '../types';

interface RemindersStore {
  reminders: Reminder[];
  addReminder: (text: string, phase: string, id?: string) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
  hasReminder: (id: string) => boolean;
}

export const useRemindersStore = create<RemindersStore>((set, get) => ({
  reminders: [],
  addReminder: (text, phase, id) => {
    const state = get();
    // Don't add if reminder with this ID already exists
    if (id && state.reminders.some(r => r.id === id)) {
      return;
    }
    set((state) => ({
      reminders: [...state.reminders, {
        id: id || crypto.randomUUID(),
        text,
        phase,
        isActive: true
      }]
    }));
  },
  toggleReminder: (id) => set((state) => ({
    reminders: state.reminders.map(reminder =>
      reminder.id === id
        ? { ...reminder, isActive: !reminder.isActive }
        : reminder
    )
  })),
  deleteReminder: (id) => set((state) => ({
    reminders: state.reminders.filter(reminder => reminder.id !== id)
  })),
  hasReminder: (id) => get().reminders.some(r => r.id === id)
}));