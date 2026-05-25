export function mapRandomUserToContact(user) {
  return {
    id: user.login.uuid,
    firstName: user.name?.first ?? "",
    lastName: user.name?.last ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    company: "",
    city: user.location?.city ?? "",
    picture: user.picture?.medium ?? "",
    updatedAt: user.registered?.date ?? new Date().toISOString(),
  };
}
