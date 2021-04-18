const after = dom.create(`<div>The after div</div>`)
const before = dom.create(`<div>The before div</div>`)
const div3 = dom.create(`<div id="app"></div>`)

let empty = document.querySelector(`#test`)

const nodes = dom.empty(empty)
console.log(nodes)
let a = window.test
console.log(a)

dom.attr(test, `title`, `I'm Frank`)
let title = dom.attr(test, `title`)
console.log(`title: ${title}`)

dom.text(test, `你好，这是新的内容`)
dom.style(test, {color:`red`})
dom.style(test, `font-size`, `20px`)

dom.class.add(test,`hello`,`blue`,`red`)
dom.class.remove(test,`blue`)
console.log(dom.class.check(test,`blue`))

let fn = ()=>{
    console.log(`点击了一次`)
}
dom.on(test,`click`, fn)
dom.off(test,`click`, fn)

const testDiv = dom.find(`#test`)[0]
console.log(testDiv)

console.log(dom.parent(test))
console.log(dom.next(dom.find(`#s2`)[0]))
console.log(dom.previous(dom.find(`#s2`)[0]))

let fn2 = (node)=>{
    dom.style(node, {color:`red`})
}
console.log(dom.children(dom.find(`#travel`)[0]))
dom.each(dom.children(dom.find(`#travel`)[0]), fn2)

console.log(dom.indexOf(`#s3`))