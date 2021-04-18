window.dom = {}

//创建元素函数
dom.create = (string) => {
    const container = document.createElement(`template`)
    container.innerHTML = string.trim()  //trim用于忽略空格换行等文本
    return container.content.firstChild  //template必须用content.firstChild获取
}

//创建弟弟元素函数
dom.after = (node,node2) => {
    node.parentNode.insertBefore(node2, node.nextSibling)
}

//创建哥哥元素函数
dom.before = (node,node2) => {
    node.parentNode.insertBefore(node2, node)
}

//创建子元素函数
dom.append = (parent, node) => {
    parent.appendChild(node)
}

//创建父元素函数
dom.wrap = (node, parent) => {
    dom.before(node, parent)
    dom.append(parent, node)
}

//删除节点
dom.remove = (node) => {
    node.parentNode.removeChild(node)
    return node
}

//删除后代（清空节点内部）
dom.empty = (node) => {
    const array = []
    let x = node.firstChild
    while(x){
        array.push(dom.remove(x))
        x = node.firstChild
    }
    return array
}

//改或者查一个属性
dom.attr = function (node, name, value) {  //重载
    if (arguments.length === 3){
        node.setAttribute(name, value)
    }else if (arguments.length === 2){
        return node.getAttribute(name)
    }
}

//改或者查文本内容
dom.text = function (node, string) {   //适配
    if (arguments.length === 2){
        if (`innerText` in node){
            node.innerText = string
        }else{
            node.textContent = string
        }
    }else if (arguments.length === 1){
        if (`innerText` in node){
            return node.innerText
        }else{
            return node.textContent
        }
    }
}

//改或者查HTML内容
dom.html = function (node, string) {
    if (arguments.length === 2){
        node.innerHTML = string
    }else if (arguments.length ===1){
        return node.innerHTML
    }
}

//改或者查style内容
dom.style = function (node, name, value) {
    if (arguments.length === 3){
        node.style[name] = value
    }else if (arguments.length === 2) {
        if (typeof name === `string`){
            return node.style[name]
        }else if (name instanceof Object){
            for (let key in name){
                node.style[key] = name[key]
            }
        }
    }
}

//添加、移除、检查 class
dom.class = {
    add(node, className) {
        if (arguments.length === 2) {
            node.classList.add(className)
        }else if (arguments.length > 2){
            for (let i = 1; i<arguments.length; i++){
                node.classList.add(arguments[i])
            }
        }
    },
    remove(node, className) {
        node.classList.remove(className)
    },
    check(node, className) {
        return node.classList.contains(className)
    },
}

//添加事件
dom.on = function (node, eventName, fn) {
    node.addEventListener(eventName, fn)
}

//移除事件
dom.off = function (node, eventName, fn) {
    node.removeEventListener(eventName, fn)
}

//查节点的内容
dom.find = function (selector, scope) {
    return (scope || document).querySelectorAll(selector)
}

//查节点的父元素
dom.parent = function (node) {
    return node.parentNode
}

//查节点的子元素
dom.children = function (node) {
    return node.children
}

//查节点的兄弟姐妹元素
dom.siblings = function (node) {
    return Array.from(node.parentNode.children).filter(n=>n!==node)
}

//查节点的弟弟
dom.next = function (node) {
    let x = node.nextSibling
    while(x && x.nodeType === 3){
        x = x.nextSibling
    }
    return x
}

//查节点的哥哥
dom.previous = function (node) {
    let x = node.previousSibling
    while(x && x.nodeType === 3){
        x = x.previousSibling
    }
    return x
}

//遍历子元素
dom.each = function (nodeList, fn) {
    if (arguments.length === 1) {
        return dom.children(nodeList)
    }else if (arguments.length === 2) {
        for (let i = 0; i < nodeList.length; i++){
            fn.call(null, nodeList[i])
        }
    }
}

//节点在兄弟姐们中排行第几
dom.indexOf = function (node) {
    let a = dom.parent(dom.find(node)[0]).children
    let i = 0
    for (i = 0; i<a.length;i++){
        if (dom.find(node)[0] === a[i]){
            break;
        }
    }
    return i+1
}