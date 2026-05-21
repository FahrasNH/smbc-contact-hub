export function initialsFromName(firstName, lastName) {
  const full = [firstName, lastName].filter(Boolean).join(" ").trim();
  const nameParts = full.split(/\s+/).filter(Boolean);
  if (nameParts.length === 0) return "?";
  if (nameParts.length === 1) return nameParts[0].slice(0, 2).toUpperCase();
  const firstInitial = nameParts[0][0] ?? "";
  const lastInitial = nameParts[nameParts.length - 1][0] ?? "";
  return `${firstInitial}${lastInitial}`.toUpperCase();
}

export function avatarBackgroundStyle(contactId) {
  const hue = (contactId * 47) % 360;
  return {
    background: `linear-gradient(135deg, hsl(${hue} 58% 46%), hsl(${(hue + 40) % 360} 52% 38%))`,
  };
}
