const Blockchain = require("./blockchain");
const Block = require("./block");

describe("BlockChain", () => {
  let blockchain;
  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it("contains a `chain` Array instance ", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("starts with the genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("add new block to the chain", () => {
    const newData = "foo bar";
    blockchain.addBlock({ data: newData });
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

  /* 
Chain Validation checking
1. Correct block fields presents
2. Actual last hash reference
3. Valid hash
*/

  describe("isValidChain()", () => {
    describe("when the change does not start with genesis block", () => {
      it("return false", () => {
        blockchain.chain[0] = { data: "fake-genesis" };
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe("when the chain starts with the genesis block and has multiple blocks", () => {
      const blockchain = new Blockchain();
      const isvalid = Blockchain.isValidChain(blockchain.chain[0]);
      //   console.log(blockchain.chain[0]);
      //   it("minedBlock instance of Block ", () => {
      //     expect(isvalid instanceof Blockchain).toBe(true);
      //   });

      //   beforeEach(() => {
      //     blockchain.addBlock({ data: "Bears" });
      //     blockchain.addBlock({ data: "Tiges" });
      //     blockchain.addBlock({ data: "Cat" });
      //   });
      //   describe("and a last hash reference has changed", () => {
      //     it("return false", () => {
      //       blockchain.chain[2].hash = "broken-lasthash";
      //       expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      //     });
      //   });
      //   describe("and the chain contains a block with an invalid hash", () => {
      //     it("returns false", () => {
      //       blockchain.chain[2].data = "some-bad-and-evil-data";
      //       expect(blockchain.isInvalidChain(blockchain.chain)).toBe(false);
      //     });
      //   });
      //   describe("and the chain does not contain any invalid blocks", () => {
      //     it("returns true", () => {
      //       expect(blockchain.isInvalidChain(blockchain.chain)).toBe(true);
      //     });
      //   });
    });
  });
});
