**Queries**
stukentUsers(where: StukentUserWhereInput): [StukentUser]!

**Mutations**
createStukentUser(data: StukentUserCreateInput!): StukentUser!

**Types**
StukentUserWhereInput
  email: String

StukentUserCreateInput
  status: Status
  email: String
  password: String
  timeZone: String

StukentUser
  status: Status!
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String
  password: String
  timeZone: String

Status
  DRAFT
  PUBLISHED
  ARCHIVED