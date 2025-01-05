export interface TimeSlot {
  time: string;
  is_selected: boolean;
  is_occupied: boolean;
}

export interface SlotsData {
  morning: { slots: TimeSlot[] };
  afternoon: { slots: TimeSlot[] };
  evening: { slots: TimeSlot[] };
}
