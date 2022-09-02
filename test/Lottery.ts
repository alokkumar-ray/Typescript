import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { addressFromNumber, expandTo18Decimals } from ".//utilities";
import { Lottery,Lottery__factory } from "../typechain-types";

describe("Lottery Testing", async()=>{
    let signers: SignerWithAddress[];
    let owner: SignerWithAddress;
    let user1: SignerWithAddress;
    let user2: SignerWithAddress;
    let user3: SignerWithAddress;
    let lottery: Lottery;

    beforeEach("Initialize",async()=>{
        signers=await ethers.getSigners();
        owner = signers[0];
        user1 = signers[1];
        user2 = signers[2];
        user3 = signers[3];
        
        lottery = await new Lottery__factory(owner).deploy();
        console.log("Deployed address", lottery.address);
    })
    describe("Lottery Testing",async()=>{
        it("Sending ether to the contract",async()=>{
            await user1.sendTransaction({to: lottery.address, value: ethers.utils.parseEther('100')}); 
            await user2.sendTransaction({to: lottery.address, value: ethers.utils.parseEther('100')}); 
            await user3.sendTransaction({to: lottery.address, value: ethers.utils.parseEther('100')}); 
            console.log("Lottery Balance",Number (await lottery.getBalance()));
        })

        it("Selecting winner",async()=>{

            await user1.sendTransaction({to: lottery.address, value: ethers.utils.parseEther('100')}); 
            await user2.sendTransaction({to: lottery.address, value: ethers.utils.parseEther('100')}); 
            await user3.sendTransaction({to: lottery.address, value: ethers.utils.parseEther('100')}); 

            await lottery.connect(owner).selectWinner();
            console.log("Winner",await lottery.getWinner());

            let addressArray = [user1.address,user2.address,user3.address];
            let userArray = ["user1","user2", "user3"];
            let winner = (await lottery.getWinner());
            for(let i=0; i< addressArray.length; i++){
             if(addressArray[i] == winner){
                console.log("winner is ", userArray[i])};
            }
        })
    })
})