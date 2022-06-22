import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { GreenDAO } from "../typechain";

describe("GreenDAO", function () {
  let greenDAO: GreenDAO;

  beforeEach(async () => {
    const GreenDAO = await ethers.getContractFactory("GreenDAO");
    greenDAO = await GreenDAO.deploy();
    await greenDAO.deployed();
  });

  it("Should deploy the contract correctly", async () => {
    expect(await greenDAO.name()).to.equal("GreenDAO");
    expect(await greenDAO.symbol()).to.equal("GREEN");
  });

  it("Should be able to mint a token", async () => {
    const [sender] = await ethers.getSigners();
    await greenDAO.mint("Eduardo", { from: sender.address });

    const owner = await greenDAO.ownerOf("0");
    expect(owner).to.equal(sender.address);
  });
});
