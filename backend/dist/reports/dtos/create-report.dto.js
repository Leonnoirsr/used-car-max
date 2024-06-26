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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReportDto = exports.CarType = void 0;
const class_validator_1 = require("class-validator");
var CarType;
(function (CarType) {
    CarType["SUV"] = "SUV";
    CarType["TRUCK"] = "TRUCK";
    CarType["CROSSOVER"] = "CROSSOVER";
    CarType["SEDAN"] = "SEDAN";
    CarType["COUPE"] = "COUPE";
    CarType["CONVERTIBLE"] = "CONVERTIBLE";
    CarType["LUXURY"] = "LUXURY";
    CarType["SPORTS_CAR"] = "SPORTS_CAR";
    CarType["MOTORCYCLE"] = "MOTORCYCLE";
})(CarType || (exports.CarType = CarType = {}));
class CreateReportDto {
}
exports.CreateReportDto = CreateReportDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1970),
    (0, class_validator_1.Max)(2030),
    __metadata("design:type", Number)
], CreateReportDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "make", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(500000),
    __metadata("design:type", Number)
], CreateReportDto.prototype, "mileage", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000000),
    __metadata("design:type", Number)
], CreateReportDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "imageUrl", void 0);
//# sourceMappingURL=create-report.dto.js.map