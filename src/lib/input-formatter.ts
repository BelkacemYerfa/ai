export interface ParsedData {
  reserve: number;
  dailybud: number;
  dailyinc: number;
  remainingDays: number;
}

const SPLITTER_REGEX = /[\n#?=&\t,/-]+/;


export function parseInput(input: string): ParsedData {
  const lines = input.split(SPLITTER_REGEX);
  const parsedData: ParsedData = {
    reserve: 0,
    dailyinc: 0,
    dailybud: 0,
    remainingDays: 0,
  };
  for (const line of lines) {
    const [key, value] = line.split(":").map((part) => part.trim());
    const mainKey = key.toLowerCase()
    if(mainKey.includes("reserve")) {
      parsedData.reserve = parseInt(value, 10);
    } else if (mainKey.includes("daily income")) {
      parsedData.dailyinc = parseInt(value, 10);
    } else if (mainKey.includes('daily budget')) {
      parsedData.dailybud = parseInt(value, 10);
    } else if (mainKey.includes("remaining days")) {
      parsedData.remainingDays = parseInt(value, 10);
    }
  }

  return parsedData;
}