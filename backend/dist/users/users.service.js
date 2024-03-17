"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
const bson_objectid_1 = __importDefault(require("bson-objectid"));
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(firstName, lastName, email, password, role) {
        const newUser = await this.prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password,
                role,
            },
        });
        console.log('A new user has been created', newUser);
        return newUser;
    }
    async findAll() {
        return this.prisma.user.findMany();
    }
    async findById(id) {
        if (!bson_objectid_1.default.isValid(id)) {
            return null;
        }
        return this.prisma.user.findFirst({
            where: { id },
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findFirst({ where: { email: email } });
    }
    async updateByEmail(oldEmail, newEmail, newRole) {
        if (newEmail) {
            const emailInUse = await this.prisma.user.findFirst({ where: { email: newEmail } });
            if (emailInUse) {
                throw new Error('Email is already in use');
            }
        }
        if (newRole && !Object.values(client_1.Role).includes(newRole)) {
            throw new Error('Invalid role');
        }
        const user = await this.prisma.user.findFirst({ where: { email: oldEmail } });
        if (!user) {
            return null;
        }
        else {
            const updatedUser = await this.prisma.user.update({
                where: {
                    email: oldEmail,
                },
                data: {
                    ...(newEmail ? { email: newEmail } : {}),
                    ...(newRole ? { role: newRole } : {}),
                },
            });
            console.log('User Updated', updatedUser);
            return updatedUser;
        }
    }
    async deleteByEmail(email) {
        const user = await this.prisma.user.findFirst({ where: { email: email } });
        if (!user) {
            return null;
        }
        else {
            await this.prisma.user.delete({
                where: {
                    email: email,
                },
            });
            return user;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map