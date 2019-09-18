# get-evm-smart-contracts

##  save https://github.com/blockscout/evm-smart-contracts data  tohypertrie


## This solution
 
 save github evm-smart-contracts data to hypertrie

## Installation

yarn or npm install
      
 
## Usage

yarn start 

##  sample code



save file path

```

     const sourceCodeHash = await generateToken(fileObj.sourceCode)
            if (sourceCodeHash != null) {
                var filedir = path.resolve(`sourcecode/${folderHash}/${sourceCodeHash}`);
                await mkdirFn(filedir)
                try {
                    await fs.writeFileSync(`${filedir}/source.sol`, fileObj.sourceCode, { encoding: 'utf8' })
                    const address = fileObj.address
                    await mkdirFn(`${filedir}/${address}`)
                    await fs.writeFileSync(`${filedir}/${address}/contract.json`, JSON.stringify(fileObj), { encoding: 'utf8' })
                    saveKeyToJson.push({
                        key: address,
                        value: {
                            sourceAbsoultePath: `${filedir}/source.sol`,
                            contractAbsoultePath: `${filedir}/${address}/contract.json`,
                            sourcePath: `${folderHash}/${address}/source.sol`,
                            contractPath: `${folderHash}/${address}/contract.json`
                        }
                    })

                    if (sourceCodeHash != null) { saveKeyToJson.push({ key: address, }) }
                } catch (err) {
                    console.log('save source.sol have question', err)
                }
            }

```            



generateToken

```
 async function generateToken(sourceCodeString, opts) {
    crypto.createHash("sha1").update(sourceCodeString).digest("hex");
    let token = ''
    token = blake.blake2sHex(sourceCodeString)
    return token;
}
```
 




# evm-update-data
# evm-data-hypertrie
