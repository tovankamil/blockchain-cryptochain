class Block {
  constructor(data, hash, lasHash) {
    this.data = data;
    this.hash = hash;
    this.lastHash = lasHash;
  }
}

class Blockchain {
  constructor() {
    const genenesis = new Block("gen-data", "gen-hash", "gen-lastHash");
    this.chain = [genenesis];
  }
  addBlockdata(data) {
    const lastHash = this.chain[this.chain.length - 1].data;

    const hash = lightningHash(data + lastHash);
    const block = new Block(data, hash, lastHash);
    this.chain.push(block);
  }
}
const lightningHash = (data) => {
  return data + "*";
};

const fooBlockChain = new Blockchain();

fooBlockChain.addBlockdata("one");
fooBlockChain.addBlockdata("two");
fooBlockChain.addBlockdata("three");
console.log(fooBlockChain.chain);
