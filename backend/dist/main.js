"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const cookieSession = require('cookie-session');
async function bootstrap() {
    const server = express();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    app.use(cookieSession({
        keys: ['oatmeal']
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true
    }));
    app.enableCors({
        origin: 'https://used-car-max.vercel.app/',
        credentials: true,
    });
    app.setGlobalPrefix('api');
    await app.init();
}
bootstrap();
//# sourceMappingURL=main.js.map