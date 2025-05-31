const Block = require("./block");
const cryptoHash = require("./crypto-hash");
class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
    return newBlock;
  }
  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      console.error("Incoming chain is not longer");
      return;
    }

    if (!Blockchain.isValidChain(chain)) {
      console.error("Incoming chain is invalid");
      return;
    }

    this.chain = chain;
  }

  static isValidChain(chain) {
    // check genesis block
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, data } = chain[i];
      const actualHash = chain[i - 1].hash;

      if (lastHash !== actualHash) return false;
      const validatedHash = cryptoHash(timestamp, lastHash, data);
      if (hash !== validatedHash) return false;
    }
    return true;
  }
}
module.exports = Blockchain;
