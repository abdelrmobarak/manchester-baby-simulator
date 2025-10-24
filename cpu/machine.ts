import { newMachine, stepInstruction } from './cpu';
import { encode } from './ops';
import { Op } from './types';

const machine = newMachine();
// Write your machine instructions here
machine.memory[0] = encode(Op.LDN, 10);
machine.memory[1] = encode(Op.SUB, 11);
machine.memory[2] = encode(Op.STO, 12);
machine.memory[3] = encode(Op.STP, 0);

machine.memory[10] = -5; // Enter your initial value
machine.memory[11] = 3; // Enter your other value 
machine.memory[12] = 0;  

let steps = 0;
while (machine.running && steps < 100) {
    stepInstruction(machine);
    steps++;
}

//Logging the final results
console.log("A =", machine.A);
console.log("M12 =", machine.memory[12]);
console.log("CI =", machine.CI);
console.log("running =", machine.running);