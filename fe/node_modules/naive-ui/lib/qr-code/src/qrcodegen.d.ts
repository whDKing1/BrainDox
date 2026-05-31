declare namespace qrcodegen {
    type bit = number;
    type byte = number;
    type int = number;
    export class QrCode {
        readonly version: int;
        readonly errorCorrectionLevel: QrCode.Ecc;
        static encodeText(text: string, ecl: QrCode.Ecc): QrCode;
        static encodeBinary(data: Readonly<byte[]>, ecl: QrCode.Ecc): QrCode;
        static encodeSegments(segs: Readonly<QrSegment[]>, ecl: QrCode.Ecc, minVersion?: int, maxVersion?: int, mask?: int, boostEcl?: boolean): QrCode;
        readonly size: int;
        readonly mask: int;
        private readonly modules;
        private readonly isFunction;
        constructor(version: int, errorCorrectionLevel: QrCode.Ecc, dataCodewords: Readonly<byte[]>, msk: int);
        getModule(x: int, y: int): boolean;
        getModules(): boolean[][];
        private drawFunctionPatterns;
        private drawFormatBits;
        private drawVersion;
        private drawFinderPattern;
        private drawAlignmentPattern;
        private setFunctionModule;
        private addEccAndInterleave;
        private drawCodewords;
        private applyMask;
        private getPenaltyScore;
        private getAlignmentPatternPositions;
        private static getNumRawDataModules;
        private static getNumDataCodewords;
        private static reedSolomonComputeDivisor;
        private static reedSolomonComputeRemainder;
        private static reedSolomonMultiply;
        private finderPenaltyCountPatterns;
        private finderPenaltyTerminateAndCount;
        private finderPenaltyAddHistory;
        static readonly MIN_VERSION: int;
        static readonly MAX_VERSION: int;
        private static readonly PENALTY_N1;
        private static readonly PENALTY_N2;
        private static readonly PENALTY_N3;
        private static readonly PENALTY_N4;
        private static readonly ECC_CODEWORDS_PER_BLOCK;
        private static readonly NUM_ERROR_CORRECTION_BLOCKS;
    }
    export class QrSegment {
        readonly mode: QrSegment.Mode;
        readonly numChars: int;
        private readonly bitData;
        static makeBytes(data: Readonly<byte[]>): QrSegment;
        static makeNumeric(digits: string): QrSegment;
        static makeAlphanumeric(text: string): QrSegment;
        static makeSegments(text: string): QrSegment[];
        static makeEci(assignVal: int): QrSegment;
        static isNumeric(text: string): boolean;
        static isAlphanumeric(text: string): boolean;
        constructor(mode: QrSegment.Mode, numChars: int, bitData: bit[]);
        getData(): bit[];
        static getTotalBits(segs: Readonly<QrSegment[]>, version: int): number;
        private static toUtf8ByteArray;
        private static readonly NUMERIC_REGEX;
        private static readonly ALPHANUMERIC_REGEX;
        private static readonly ALPHANUMERIC_CHARSET;
    }
    export {};
}
declare namespace qrcodegen.QrCode {
    type int = number;
    export class Ecc {
        readonly ordinal: int;
        readonly formatBits: int;
        static readonly LOW: Ecc;
        static readonly MEDIUM: Ecc;
        static readonly QUARTILE: Ecc;
        static readonly HIGH: Ecc;
        private constructor();
    }
    export {};
}
declare namespace qrcodegen.QrSegment {
    type int = number;
    export class Mode {
        readonly modeBits: int;
        private readonly numBitsCharCount;
        static readonly NUMERIC: Mode;
        static readonly ALPHANUMERIC: Mode;
        static readonly BYTE: Mode;
        static readonly KANJI: Mode;
        static readonly ECI: Mode;
        private constructor();
        numCharCountBits(ver: int): int;
    }
    export {};
}
export default qrcodegen;
