import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { GreenDAO } from "../typechain";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("GreenDAO", () => {
  let greenDAO: GreenDAO;
  let sender: SignerWithAddress;
  beforeEach(async () => {
    const GreenDAO = await ethers.getContractFactory("GreenDAO");
    greenDAO = await GreenDAO.deploy();
    await greenDAO.deployed();
  });

  it("Should deploy the contract correctly", async () => {
    expect(await greenDAO.name()).to.equal("GreenDAO");
    expect(await greenDAO.symbol()).to.equal("GREEN");
  });

  it("Signer should not have balance when contract is deployed", async () => {
    [sender] = await ethers.getSigners();
    const ownerTokens = await greenDAO.balanceOf(sender.address);
    expect(ownerTokens).to.equal(0);
  });

  it("Should be able to mint a token", async () => {
    [sender] = await ethers.getSigners();
    await greenDAO.mint("Eduardo", { from: sender.address });

    const owner = await greenDAO.ownerOf("0");
    const ownerTokens = await greenDAO.balanceOf(sender.address);
    expect(ownerTokens).to.equal(1);
    expect(owner).to.equal(sender.address);
  });
});
