import * as _ from 'lodash';
import {ActorSystem, createSystem} from 'comedy';
import {Promise} from 'bluebird';

function allSkippingErrors(promises) {
  return Promise.all(
    promises.map(p => p.catch(error => null))
  )
}

let maxNumber: number = Number.MAX_SAFE_INTEGER;
let numWorkers = 16;

let actorSystem = createSystem({});

let root: Promise<any> = actorSystem.rootActor(); // Get a root actor reference.

root.then(rootActor => rootActor.createChild('/dist/test-01/actors/PrimeFinder', {
      mode: 'forked',
      clusterSize: numWorkers
    }))
    .then(myActor => {
      // Sequentially send 6 messages to our newly-created actor cluster.
      // The messages will be load-balanced between 3 forked actors using
      // the default balancing strategy (round-robin).
      return Promise.each(numWorkers, numbers => {
        return myActor.sendAndReceive('calc', process.pid, numbers)
          .then(reply => {
            console.log(`Actor replied: [${reply.numbers.join(',')}]`);
          });
      })
    })
    .then(() => actorSystem.destroy());
