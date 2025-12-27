export interface TimeSlot {
  hour: number;
  minute: number;
  seconds: number;
  millis: number;
}

/**
 * Returns a preffered list of time slots (in reversed to make use of .pop())that's considered
 * best time to post content. it could be optimized.
 */
export function getTimeSlotsDaily() {
  const timesSlots: TimeSlot[] = [
    {
      hour: 8,
      minute: 30,
      seconds: 0,
      millis: 0,
    },
    {
      hour: 8,
      minute: 0,
      seconds: 0,
      millis: 0,
    },
    {
      hour: 7,
      minute: 30,
      seconds: 0,
      millis: 0,
    },
    {
      hour: 19,
      minute: 30,
      seconds: 0,
      millis: 0,
    },
    {
      hour: 17,
      minute: 0,
      seconds: 0,
      millis: 0,
    },
    {
      hour: 19,
      minute: 0,
      seconds: 0,
      millis: 0,
    },
    {
      hour: 18,
      minute: 30,
      seconds: 0,
      millis: 0,
    },
    {
      hour: 18,
      minute: 0,
      seconds: 0,
      millis: 0,
    },
  ];

  return timesSlots;
}


export function formatDateSimple(d: Date): string {
 

  const pad = (n: number) => n.toString().padStart(2, '0');

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1); 
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}-${month}-${day}\n${hours}:${minutes}`;
}
