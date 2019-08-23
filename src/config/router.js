const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const 

module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            res.statusCode = 200
            res.setHeader ('Content-Type', 'text/plian')
            fs.createReadStream(filePath).pipe(res)
            // fs.readFile(filePath, (err, data) => { res.end(data) })
        } else if (stats.isDirectory()) {
            const files =await readdir(filePath)
            res.statusCode = 200
            res.setHeader ('Content-Type', 'text/plian')
            res.end(files.join(','))
        }
    } catch (ex) {
        console.log(ex) // 这是输出在服务端不是浏览器中
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end(`${filePath} is not a directory or file`)
    }
}