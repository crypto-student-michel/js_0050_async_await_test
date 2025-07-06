
import fs from "fs/promises";

async function readConfig() {
    const config = (await fs.readFile("./.git/config")).toString();
    const lineas = config.split("\n").map((line) => line.trim())
    const url = lineas.find((line) => line.startsWith("url"))
    const url2 = url?.split("=")[1].trim().split("/")
    if (!url2)
        throw ("error")
    const usuario = encodeURIComponent(url2.slice(-2, -1).toString())
    const repo = encodeURIComponent(url2.slice( -1).toString())
    return { usuario, repo }
}
const {usuario, repo} = await readConfig()
const formData = new FormData();
const texto = (await fs.readFile("outfile.txt")).toString();
console.log("resultado")
const resultado =texto.split("\n").slice(-5, -3).join("\n")
const r1 = resultado.split("\n").map((linea) => linea.split(" ")[1]);
const outfile = await fs.readFile("outfile.txt")
formData.append("file",   outfile.toString());
const test =  await fs.readFile("app.test.js")
formData.append("test", test.toString());

const url = `http://localhost:3000/api/log?user=${usuario}&repo=${repo}&pass=${r1[0]}&fail=${r1[1]}`
console.log(url)
const r = await fetch(url, {
    method: "POST",
    body: formData
})
const text = await r.text();
console.log("text",text)




