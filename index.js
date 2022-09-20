function sheetWorker() {
  onmessage = function (e) {
    // console.debug('子线程收到', e)

    const tableStr = createTable(e.data)
    this.postMessage(tableStr)
  }

  function createTable(msgData) {
    const jsonData = msgData[0]
    const headMap = msgData[1] // 表头字典

    // console.debug('headMap', headMap)

    if (!jsonData.length) return

    // 数组第一项拿出来生成表头
    let str = ''
    for (const key in jsonData[0]) {
      if (headMap[key]) {
        str += `${headMap[key]},`
      } else {
        str += `${key},`
      }
    }

    str += `\n`

    jsonData.map((item, idx) => {
      for (let i in item) {
        str += `${item[i]},`
      }
      str += '\n'
    })

    return str
  }
}

function jsToStringBlob(f) {
  const blob = new Blob([`(${f.toString()})()`])
  return URL.createObjectURL(blob)
}

function downloadXls(str, fileName) {
  // encodeURIComponent 解决中文乱码
  let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
  // 创建a标签
  let link = document.createElement('a')
  link.href = uri
  link.download = fileName + '.xlsx'
  link.click()
}

export default function main(data, fileName = 'data', headerMap = null) {
  if (!window.Worker) {
    console.error('浏览器版本过低')
    return
  }

  const sheetWork = new Worker(jsToStringBlob(sheetWorker))
  sheetWork.postMessage([data, headerMap])

  sheetWork.onmessage = function (e) {
    // console.debug('主线程收到', e)
    downloadXls(e.data, fileName)

    sheetWork.terminate()
  }

  sheetWork.onerror = function (e) {
    console.error(e)
    sheetWork.terminate()
  }
}
