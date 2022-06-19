import { expect } from "chai";
import { ethers } from "hardhat";

describe("GreenDAO", function () {
  it("Should deploy the contract correctly", async () => {
    const GreenDAO = await ethers.getContractFactory("GreenDAO");
    const greenDAO = await GreenDAO.deploy();
    await greenDAO.deployed();

    expect(await greenDAO.name()).to.equal("GreenDAO");
    expect(await greenDAO.symbol()).to.equal("GREEN");
  });
});
