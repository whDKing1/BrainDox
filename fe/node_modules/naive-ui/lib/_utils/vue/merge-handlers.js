"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeEventHandlers = mergeEventHandlers;
function mergeEventHandlers(handlers) {
    const filteredHandlers = handlers.filter(handler => handler !== undefined);
    if (filteredHandlers.length === 0)
        return undefined;
    if (filteredHandlers.length === 1)
        return filteredHandlers[0];
    return (e) => {
        handlers.forEach((handler) => {
            if (handler) {
                handler(e);
            }
        });
    };
}
