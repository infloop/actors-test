import * as _ from 'lodash';
import {ActorSystem, createSystem} from 'comedy';
import {Promise} from 'bluebird';

export interface Interval {
  min: number;
  max: number;
}

function diviteToIntervals(end: number, n: number): Interval[] {
  let size = Math.floor(end/n);
  let r: Interval[] = [];

  for (let i = 0; i < end; i+=size) {
    r.push({ min: i, max: i+size});
  }

  return r;
}

let maxNumber: number = 100000;
let numWorkers = 8;

let actorSystem = createSystem({});

let root: Promise<any> = actorSystem.rootActor(); // Get a root actor reference.

let totalResult: number[] = [];

root.then(rootActor => rootActor.createChild('/dist/test-01/actors/PrimeFinder', {
      mode: 'forked',
      clusterSize: numWorkers
    }))
    .then(actor => {
      // Sequentially send 'numWorkers' messages to our newly-created actor cluster.
      // The messages will be load-balanced between 'numWorkers' forked actors using
      // the default balancing strategy (round-robin).
      return Promise.each(diviteToIntervals(maxNumber, numWorkers), (interval: Interval) => {
        return actor.sendAndReceive('findPrimes', interval.min, interval.max)
          .then(reply => {
            totalResult.push(...reply);
            console.log(`Actor replied. min:${interval.min}, max:${interval.max}  length: [${reply.length}]`);
          });
      })
    })
    .then(() => actorSystem.destroy());
