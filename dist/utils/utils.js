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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processApi = void 0;
const http_1 = __importDefault(require("http"));
const processApi = (options) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let data = '';
        const request = http_1.default.request(options, (response) => {
            // Set the encoding, so we don't get log to the console a bunch of gibberish binary data
            response.setEncoding('utf8');
            // As data starts streaming in, add each chunk to "data"
            response.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            response.on('end', () => {
                resolve(data);
            });
        });
        // Log errors if any occur
        request.on('error', (error) => {
            reject(error);
        });
        // End the request
        request.end();
    });
});
exports.processApi = processApi;
