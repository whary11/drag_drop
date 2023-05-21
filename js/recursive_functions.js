const viewOutputs = false
const customLog = (...data)=>{
    if (viewOutputs) {
        console.log("----------------------")
        console.log(...data)
        console.log("----------------------")
    }
}