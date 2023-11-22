// 直接引入原文件
import { Stack } from '../../index'

var stack = new Stack()
for (var i = 0; i < 5; i++) {
    stack.push(i)
}
console.log('isEmpty: ', stack.isEmpty)
console.log('size: ', stack.size)
console.log(stack.toString())
console.log(`pop: `, stack.pop())

stack.traverse((ele,index)=>{
    console.log(`Traversing-Stack:${index}: ${ele}`)
})

stack.traverse((ele,index)=>{
    console.log(`Traversing-Stack:${index}: ${ele}`)
}, true)

console.log(`claer: `, stack.clear())
console.log('isEmpty: ', stack.isEmpty)
console.log('size: ', stack.size)