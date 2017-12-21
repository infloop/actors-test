
import * as _ from 'lodash';

export class Actor {
  calc(to: string, numbers: number[]) {

    return { to, pid: process.pid, sum: _.reduce(numbers, (i, r) => r + i, 0) };
  }
}

export default Actor;

