let fooArray = [1, 2, 'foo', 'bar', true, false]
fooArray = ['foo', 'bar', 'goo']

console.log(fooArray);

const runLoop = (paramOne, paramTwo) => {
    for (let i = 0; i < 5; i++) {
        if (i == 3)
            console.log("i is 3!");
        console.log(i);
    }

    console.log(paramOne, paramTwo);

    paramTwo();
}

const logBam = () => console.log("Bam!");

runLoop('zoo', logBam);

class Lion {
    constructor(name, hairColor) {
        this.name = name;
        this.hairColor = hairColor;
    }

    logName() {
        console.log('Roar! I am', this.name, "!");
    }
}

const goldenLion = new Lion('Mufasa', 'golden')
const redLion = new Lion('Scar', 'red')

console.log(goldenLion);
console.log(redLion);

goldenLion.logName();
redLion.logName();