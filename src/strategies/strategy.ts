import {Output} from '../interfaces/output';

export interface Strategy {
    execute(): Promise<Output>
    output: Output
}
