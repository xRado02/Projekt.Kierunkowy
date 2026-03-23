export enum Role{
  Admin,
  Client
}

export const UserRoleNames: { [key in Role]: string } = {
  [Role.Admin]: "Admin",
  [Role.Client]: "Client"
}
