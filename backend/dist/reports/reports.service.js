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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bson_objectid_1 = __importDefault(require("bson-objectid"));
let ReportsService = class ReportsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    isValidId(id) {
        return bson_objectid_1.default.isValid(id);
    }
    async createReport(year, make, model, type, mileage, price, user, imageUrl) {
        if (!this.isValidId(user.id)) {
            throw new Error('Invalid UserId');
        }
        const newReport = await this.prisma.report.create({
            data: {
                year,
                make,
                model,
                type,
                mileage,
                price,
                userId: user.id,
                imageUrl
            }
        });
        console.log('A new report has been created', newReport);
        return newReport;
    }
    async findAll() {
        return this.prisma.report.findMany({
            include: {
                user: true,
            },
        });
    }
    async findReportsByUser(userId) {
        return this.prisma.report.findMany({ where: { userId: userId } });
    }
    async findById(id) {
        if (!this.isValidId(id)) {
            throw new Error('Invalid ID');
        }
        return this.prisma.report.findFirst({ where: { id: id } });
    }
    async updateById(id, newMake, newModel, newYear, newMileage, newPrice) {
        if (!this.isValidId(id)) {
            throw new Error('Invalid ID');
        }
        const report = await this.prisma.report.findFirst({ where: { id: id } });
        if (!report) {
            throw new Error('Report not found');
        }
        else {
            const updatedReport = await this.prisma.report.update({
                where: {
                    id: id
                },
                data: {
                    ...(newMake ? { make: newMake } : {}),
                    ...(newModel ? { model: newModel } : {}),
                    ...(newYear ? { year: newYear } : {}),
                    ...(newMileage ? { mileage: newMileage } : {}),
                    ...(newPrice ? { price: newPrice } : {}),
                }
            });
            console.log('Report Updated', updatedReport);
            return updatedReport;
        }
    }
    async deleteById(id) {
        if (!this.isValidId(id)) {
            throw new Error('Invalid ID');
        }
        const report = await this.prisma.report.findFirst({ where: { id: id } });
        if (!report) {
            throw new Error('Report not found');
        }
        else {
            await this.prisma.report.delete({
                where: {
                    id: id
                }
            });
            console.log('Report Deleted', report);
            return report;
        }
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map