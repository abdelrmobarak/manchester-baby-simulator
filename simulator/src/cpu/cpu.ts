import { MEM_SIZE, State, Word, Addr, MicroStep, Decoded, Op, toInt32, mask5, isNegative } from './types';
import { decode, sub32 } from './ops';

export function newMachine(initial?: Word[]): State {
    const mem = new Array<Word>(MEM_SIZE).fill(0);

    if (initial) {
        for (let i = 0; i < Math.min(initial.length, MEM_SIZE); i++) {
            mem[i] = toInt32(initial[i]);
        }
    }
    return {memory: mem, A: 0, CI: 0, PI: 0, running: true};
}

export function resetMachine(s: State, initial?: Word[]): void {
    s.memory.fill(0);
    if (initial) {
        for (let i = 0; i < Math.min(initial.length, MEM_SIZE); i++) {
            s.memory[i] = toInt32(initial[i]);
        }
    }
    s.A = 0;
    s.PI = 0;
    s.CI = 0;
    s.running = true;
}

export function fetchInstr(s: State): void { 
    s.PI = s.memory[s.CI];
    s.CI = mask5(s.CI + 1);
}

export function executeDecoded(s: State, decoded: Decoded): void { 
    const addr = decoded.addr as Addr;
    switch (decoded.op) {
        case Op.JMP:
            s.CI = mask5(s.memory[addr]);
            break;
        case Op.JRP:
            s.CI = mask5(s.CI + s.memory[addr]);
            break;
        case Op.LDN:
            s.A = toInt32(-s.memory[addr]);
            break;
        case Op.STO:
            s.memory[addr] = s.A;
            break;
        case Op.SUB:
            s.A = sub32(s.A, s.memory[addr]);
            break;
        case Op.CMP:
            if (isNegative(s.A)) {
                s.CI = mask5(s.CI + 1);
            }
            break;
        case Op.STP:
            s.running = false;
            break;
    }
}

export function stepInstruction(s: State): State {
    if (!s.running) return s;
    fetchInstr(s);
    const decoded = decode(s.PI);
    executeDecoded(s, decoded);
    return s;
}

