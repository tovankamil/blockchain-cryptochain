const Block = require("./block.js");
const { GENESIS_DATA } = require("./config.js");
const cryptoHash = require("./crypto-hash.js");

describe("block", () => {
  const timestamp = "a-date";
  const lastHash = "a-lasthash";
  const hash = "a-hash";
  const data = ["blockchain", "data"];
  const block = new Block({ timestamp, lastHash, hash, data });

  it("should has a timestamp , lasthash, data and property", () => {
    expect(block.timestamp).toBe(timestamp);
    expect(block.lastHash).toBe(lastHash);
    expect(block.hash).toBe(hash);
    expect(block.data).toBe(data);
  });

  //   Genesis Block
  describe("genesis", () => {
    const genesisBlock = Block.genesis();

    it("Returns a Block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it("returns the genesis data", () => {
      expect(genesisBlock.timestamp).toBe(GENESIS_DATA.timestamp);
      expect(genesisBlock.lastHash).toBe(GENESIS_DATA.lastHash);
      expect(genesisBlock.hash).toBe(GENESIS_DATA.hash);
      expect(genesisBlock.data).toEqual(GENESIS_DATA.data);
    });

    it("returns the genesis data toEqual", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });

    it("returns the genesis data toMatchObject", () => {
      expect(genesisBlock).toMatchObject(GENESIS_DATA);
    });
  });

  describe("mine Block", () => {
    const lastBlock = Block.genesis();

    const data = "mine data";
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it("minedBlock instance of minedBlock ", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it("sets the `lastHash` to be `hash of the last block`", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets a `timestamp", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it("creates a SHA-256 `hash` based on the proper inputs", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(minedBlock.timestamp, minedBlock.lastHash, data)
      );
    });
  });
});
