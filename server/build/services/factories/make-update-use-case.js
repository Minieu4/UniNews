"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/factories/make-update-use-case.ts
var make_update_use_case_exports = {};
__export(make_update_use_case_exports, {
  makeUpdateUserUseCase: () => makeUpdateUserUseCase
});
module.exports = __toCommonJS(make_update_use_case_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: process.env.NODE_ENV === "dev" ? ["query", "info", "warn", "error"] : []
});

// src/repositories/prisma/prisma-users-repository.ts
var PrismaUsersRepository = class {
  async findById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    return user;
  }
  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }
  async create(data) {
    const user = await prisma.user.create({
      data
    });
    return user;
  }
  async findAll() {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }
  async deleteUser(id) {
    const user = await prisma.user.delete({
      where: {
        id
      }
    });
    return user;
  }
  async updateUser(id, data) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: /* @__PURE__ */ new Date()
      }
    });
    return user;
  }
  async createPasswordResetToken(userId, token, expiresAt) {
    const passwordReset = await prisma.passwordReset.create({
      data: {
        userId,
        token,
        expiresAt
      }
    });
    return passwordReset;
  }
  async findPasswordResetByToken(token) {
    const passwordReset = await prisma.passwordReset.findUnique({
      where: {
        token
      }
    });
    return passwordReset;
  }
  async deletePasswordResetToken(token) {
    const passwordReset = await prisma.passwordReset.delete({
      where: {
        token
      }
    });
    return passwordReset;
  }
  async updatePassword(userId, hashedPassword) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: hashedPassword,
        updatedAt: /* @__PURE__ */ new Date()
      }
    });
    return user;
  }
};

// src/services/users/update-user.ts
var import_bcryptjs = require("bcryptjs");

// src/services/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource Not Found.");
  }
};

// src/services/users/update-user.ts
var UpdateUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    userId,
    name,
    email,
    passwordHash,
    role
  }) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    const dataToUpdate = {};
    if (name)
      dataToUpdate.name = name;
    if (email)
      dataToUpdate.email = email;
    if (passwordHash)
      dataToUpdate.passwordHash = await (0, import_bcryptjs.hash)(passwordHash, 6);
    if (role !== void 0)
      dataToUpdate.role = role;
    const updatedUser = await this.usersRepository.updateUser(userId, dataToUpdate);
    return {
      user: updatedUser
    };
  }
};

// src/services/factories/make-update-use-case.ts
function makeUpdateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository);
  return updateUserUseCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeUpdateUserUseCase
});