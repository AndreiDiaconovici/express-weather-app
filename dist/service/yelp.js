"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YelpService = void 0;
const constants_1 = require("../constants/constants");
const utils_1 = require("../utils/utils");
class YelpService {
    retrieveBusinesses(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrBusinesses = [];
            for (const city of input.cities) {
                arrBusinesses.push(this.getBusiness(constants_1.YELP_HOSTNAME, `/v3/businesses/search?latitude=${city.lat}&longitude=${city.lon}`, 'GET', city));
            }
            const cities = yield Promise.all(arrBusinesses);
            console.debug('YelpService | retrieveBusinesses | ' + JSON.stringify(cities));
            return {
                cities: cities
            };
        });
    }
    getBusiness(hostname, path, method, city) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const API_KEY = (_a = process.env.YELP_API_KEY) !== null && _a !== void 0 ? _a : 'NOT_DEFINED';
            const options = {
                hostname: hostname,
                path: path,
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${API_KEY}`
                },
            };
            const result = yield (0, utils_1.processApi)(options);
            const parsedResult = JSON.parse(result);
            return Object.assign(Object.assign({}, city), { business: parsedResult.businesses });
        });
    }
}
exports.YelpService = YelpService;
