"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = __importDefault(require("./version"));
function create({ componentPrefix = 'N', components = [] } = {}) {
    const installTargets = [];
    function registerComponent(app, name, component) {
        const registered = app.component(componentPrefix + name);
        if (!registered) {
            app.component(componentPrefix + name, component);
        }
    }
    function install(app) {
        if (installTargets.includes(app))
            return;
        installTargets.push(app);
        components.forEach((component) => {
            const { name, alias } = component;
            registerComponent(app, name, component);
            if (alias) {
                alias.forEach((aliasName) => {
                    registerComponent(app, aliasName, component);
                });
            }
        });
    }
    return {
        version: version_1.default,
        componentPrefix,
        install
    };
}
exports.default = create;
