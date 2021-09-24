async function main() {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  })
  await waveContract.deployed()
  console.log("Contract deployed to: ", waveContract.address)

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  )
  console.log(
    "Contract balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  )

  let waveTnx = await waveContract.wave("This is wave one!")
  await waveTnx.wait()

  waveTnx = await waveContract.wave("This is wave two!")
  await waveTnx.wait()

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log(
    "Contract balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
