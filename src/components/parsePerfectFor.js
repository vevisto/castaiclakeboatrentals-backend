export function parsePerfectFor(perfectFor) {
  // If perfectFor is missing or empty, return empty array
  if (!perfectFor || !Array.isArray(perfectFor) || perfectFor.length === 0) {
    return [];
  }

  let result = perfectFor[0];
  let counter = 10; // prevent infinite loop

  while (typeof result === "string" && counter > 0) {
    try {
      result = JSON.parse(result);
    } catch {
      break;
    }
    counter--;
  }

  if (Array.isArray(result) && typeof result[0] === "string") {
    let inner = result[0];
    while (typeof inner === "string" && counter > 0) {
      try {
        inner = JSON.parse(inner);
      } catch {
        break;
      }
      counter--;
    }
    result = inner;
  }

  return Array.isArray(result) ? result : [];
}
