
let titles = ['vurah.lol','private','biolink']
let index = 0
let interval = setInterval(() => {
    document.title = titles[index]
    index += 1
    if (index === titles.length) index = 0

}, 500)
