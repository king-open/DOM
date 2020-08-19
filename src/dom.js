window.dom = {
    create(string) {
        //创建节点
        const container = document.createElement('template')
        container.innerHTML = string.trim(); // trim 的功能就是把两边的空格给去掉
        return container.content.firstChild
    },
    //新增一个子元素
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    // 新增一个哥哥
    before(node,node2){
       node.parentNode.insertBefore(node2,node);
    },
    append(parent,node){
     parent.appendChild(node)
    },
    wrap(node,parent){
     dom.before(node,parent)
        dom.append(parent,node)
    },
    remove(node){
        node.parentNode.removeChild(node)
        return node
    },
    empty(node){
      //删节点、后代
      const array = []
        let x = node.firstChild
        while (x){
          array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
  attr(node,name,value){// 重载
      if (arguments.length === 3){
        return   node.setAttribute(name,value)
      }else if(arguments.length === 2){
        return  node.getAttribute(name)
      }
  },
  text(node,string){//适配
      if (arguments.length === 2){
        if('innerText' in node) {
          node.innerText = string //ie
        }else{
          node.textContent = string // firefox / Chrome
        }
      } else if(arguments.length === 1){
        if('innerText' in node){
         return node.innerText
        }else {
          return node.textContent
        }
      }
  },
  html(node,string){
      if(arguments.length === 2){
        node.innerHTML = string
      }else if (arguments.length === 1){
        return node.innerHTML
      }
    },
  style(node,name,value){
      if(arguments.length === 3){
        //dom.style.(div,'color','red')
        node.style[name] = value
      }else if(arguments.length === 2){
        if(typeof name === 'string'){
          return node.style[name]
        }else if(name instanceof Object){
          // dom.style(div,'color')
          const object = name
          for(let key in object){
            node.style[key] = object[key]
          }
        }
      }
  },
  class:{
    add(node,className){
      node.classList.add(className)
    },
    remove(node,className) {
      node.classList.remove(className)
    },
    has(node,className){
      return node.classList.contains(className)
    }
  },
  on(node,eventName,fn){
      node.addEventListener(eventName,fn)
  },
  off(node,eventName,fn){
      node.removeEventListener(eventName,fn)
  },
  //查，获取标签或者标签们
  find(selector, scope){
   return  (scope|| document).querySelectorAll(selector) // 如果有scope 就用.querySelectorAll,如果没有我就用document.querySelectorAll
  },
  //获取父元素
  parent(node){
      return node.parentNode
  },
  // 获取子元素
  children(node){
      return node.children
  },
  // 获取姐妹元素
  siblings(node){
    return Array.from(node.parentNode.children).filter(n=>n !== node)
  },
  // 获取弟弟元素
  next(node){
      let x = node. nextSibling
    while (x && x.nodeType === 3){
        x = x.nextSibling
    }
    return x
  },
  // 获取哥哥元素
  previous(node){
      let x = node.previousSibling
    while (x && node.nodeType === 3){
        x = x.previousSibling
    }
    return x
  },
  // 遍历所有节点
  each(nodeList,fn){
    for (let i = 0;i<nodeList.length;i++){
      fn.call(null,nodeList[i])
    }
  },
  // 获取一个元素排行老几
  index(node){
    const list = dom.children(node.parentNode)
    let i
    for (i = 0;i<list.length;i++){
      if(list[i] === node){
        break
      }
    }
    return i
  }
};