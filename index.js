const fs = require("fs");
const crypto = require('crypto');
const path = require("path");
const hypertrie = require("hypertrie");
const blake = require('blakejs')

const db = hypertrie('./trie.db', { valueEncoding: 'json' })
const dataHypertrieSave = async (workList, targetPath = 'sourcecode') => {


    const folderHash = await generateToken('undersourcecode')
    const saveKeyToJson = []
    const tPath = path.resolve(`${targetPath}`)
    const mkPath = path.resolve(`${targetPath}/${folderHash}`)

    // console.log('mkPath', mkPath)
    await mkdirFn(tPath)

    await mkdirFn(mkPath)
    //return
    for (const filePath of workList) {
        const file = await fs.readFileSync(filePath, { encoding: 'utf8' })
        const fileObj = JSON.parse(file)
        if (fileObj.sourceCode) {
            const sourceCodeHash = await generateToken(fileObj.sourceCode)
            if (sourceCodeHash != null) {
                var filedir = path.resolve(`${targetPath}/${folderHash}/${sourceCodeHash}`);
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
        }
    }
    //const keyPath = path.resolve(`keypath`);
    const saveKeyToJsonStr = JSON.stringify(saveKeyToJson)
    db.put(folderHash, saveKeyToJsonStr)

}

const mkdirFn = async (filedir) => {
    try {
        await fs.readdirSync(filedir)
    } catch (err) {
        console.log('no dir ', err)
        try {
            await fs.mkdirSync(filedir)
        } catch (err) {
            console.log('mkdirSync', err)
        }
    }

}
async function generateToken(sourceCodeString, opts) {
    crypto.createHash("sha1").update(sourceCodeString).digest("hex");
    let token = ''
    token = blake.blake2sHex(sourceCodeString)
    return token;
}
module.exports = dataHypertrieSave