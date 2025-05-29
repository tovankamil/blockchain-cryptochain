//  step 1, Create class block
class Block {
  constructor(data, hash, lastHash) {
    this.data = data;
    this.hash = hash;
    this.lastHash = lastHash;
    this.nonce = 0;
  }
}
// step 2, calculatedHash
const calculatedHash = (data) => {
  return data + "*";
};
// step 3, Create Class Blokchain
class Blockchain {
  constructor() {
    // create genesis block
    const genesis = new Block("gen-data", "gen-hash", "gen-lastHash");
    this.chain = [genesis];
  }

  addBlock(data) {
    // find last hash of chain
    const lastHash = this.chain[this.chain.length - 1].hash;

    // new hash are calculated with lighningHash function
    const lastcalculatedHash = calculatedHash(data + lastHash);
    // push to blockchain
    this.chain.push(lastcalculatedHash);
  }
}

// instance blockchain
const fooBlockChain = new Blockchain();
fooBlockChain.addBlock("one");
fooBlockChain.addBlock("two");
fooBlockChain.addBlock("two");

console.log(fooBlockChain.chain);
