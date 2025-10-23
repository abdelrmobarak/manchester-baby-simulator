import { Op, Word, Addr, Decoded } from './types';

export const OPCODE_BITS = 3; 
export const ADDR_BITS = 5;

export const OPCODE_MASK = 0b111;
export const ADDR_MASK = 0b11111;
export const ADDR_SHIFT = 3;

export function encode(op: Op, addr: number){
    return ((op & OPCODE_MASK) | ((addr & ADDR_MASK) << ADDR_SHIFT)) | 0;
}

export function decode(word: number): Decoded {
    const op = (word & OPCODE_MASK) >>> 0;
    const addr = ((word >>> ADDR_SHIFT) & ADDR_MASK) >>> 0;
    return {op: op as Op, addr };
}

export function add32(a: Word, b: Word): Word {
    return (a + b) | 0;
}

export function sub32(a: Word, b: Word): Word {
    return (a - b) | 0;
}