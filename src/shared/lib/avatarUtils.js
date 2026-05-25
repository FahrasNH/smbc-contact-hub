function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xfffffff;
  }
  return hash;
}

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
  const hue = (hashString(String(contactId)) * 47) % 360;
  return {
    background: `linear-gradient(135deg, hsl(${hue} 58% 84%), hsl(${(hue + 20) % 360} 52% 88%), hsl(${(hue + 40) % 360} 45% 92%))`,
  };
}
