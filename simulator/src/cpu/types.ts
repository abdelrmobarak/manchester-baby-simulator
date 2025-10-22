export const MEM_SIZE = 32 as const;
export type Addr = number;
export type Word = number;

export enum Op {
    JMP = 0,
    JRP = 1,
    LDN = 2,
    STOP = 3,
    SUB = 4,
    CMP = 5,
    STP = 6,
}

export interface State {
    memory: Word[];
    A: Word;
    CI: Addr;
    PI: Word;
    running: boolean;
}

export enum MicroStep {
    FETCH_SELECT,
    FETCH_TRANSFER,
    CI_INCREMENT,
    DECODE_SPLIT,
    EXEC_PREP,
    EXEC_ALU,
    EXEC_WRITE,
    EXEC_JUMP,
    HALT,
}

export interface Decoded { op: Op; addr: Addr }

export function toInt32(x: number): Word {
    return x | 0;
}

export function mask5(x: number): Addr {
    return (x&31) >>> 0;
}

export function isNegative(x: Word): boolean {
    return ((x >> 31) & 1) === 1;
}

export function toBitArray(word: Word, width = 32): number[] {
    const bits: number[] = [];
    for (let i = width - 1; i >= 0; i--) {
        bits.push((word >>> i) & 1);
    }
    return bits;
}

export function signed(word: Word): number {
    return toInt32(word);
}