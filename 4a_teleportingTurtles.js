// @ts-nocheck

// page 145
// Tortoises, Hares, and Teleporting Turtles
// "Write and algorithm to detect a loop in a linked list, in constant spaces

/*

Traveling Tortoise

    tortoise = head
    hare = head
    Forever:
        if end==hare : return 'No loop' : else : hare = hare.next
        if end==hare : return 'No loop' : else : hare = hare.next
        tortoise = tortoise.next
        if hare==tortoise: return 'Loop found'

*/

const EMPTY = null;

const isEmpty = (node) => node === EMPTY;

const pair = (first, rest = EMPTY) => ({
    first,
    rest
});

const list = (...elements) => {
    const [first, ...rest] = elements;

    return elements.length === 0 ?
        EMPTY :
        pair(first, list(...rest));
}

console.log(list([1, 2, 3], ['a']));

const forceAppend = (list1, list2) => {
    if (isEmpty(list1)) {
        return "FAIL!"
    }
    if (isEmpty(list1.rest)) {
        list1.rest = list2;
    } else {
        forceAppend(list1.rest, list2);
    }
}

const tortoiseAndHare = (aPair) => {
    let tortoisePair = aPair,
        harePair = aPair.rest;

    while (true) {
        if (isEmpty(tortoisePair) || isEmpty(harePair)) {
            return false;
        }

        if (tortoisePair.first === harePair.first) {
            return true;
        }

        harePair = harePair.rest;

        if (isEmpty(harePair)) {
            return false;
        }

        if (tortoisePair.first === harePair.first) {
            return true;
        }

        tortoisePair = tortoisePair.rest;
        harePair = harePair.rest;
    }
};

const aList = list(1, 2, 3, 4, 5);

console.log(aList);
console.log(tortoiseAndHare(aList));

forceAppend(aList, aList.rest.rest);

console.log(aList);
console.log(tortoiseAndHare(aList));

/*

Teleporting Turtle

    turtle, rabbit = head, head
    steps_taken, step_limit = 0,2
    rabbit = head
    Forever:
        if end==rabbit : return 'No loop' : else : rabbit = rabbit.next
        steps_taken += 1
        if rabbit==turtle : return 'Loop found'
        if steps_taken==step_limit:
            steps_taken = 0
            step_limit *= 2
            turtle = rabbit

*/

const teleportingTurtle = (list) => {
    let speed = 1,
        rabbit = list,
        turtle = rabbit;

    while (true) {
        for (let i = 0; i <= speed; i += 1) {
            rabbit = rabbit.rest;
            if (rabbit == null) {
                return false;
            }

            if (rabbit === turtle) {
                return true;
            }
        }
        turtle = rabbit;
        speed *= 2;
    }
    return false;
}

const bList = list(1, 2, 3, 4, 5);

console.log(teleportingTurtle(bList));

forceAppend(bList, bList.rest.rest);

console.log(teleportingTurtle(bList));