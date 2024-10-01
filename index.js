const fs = require("fs")

function parseSong(song, pl) {
    const lines = song.match(/[^\n\r]+/gm)
	let id = 3
    let grav = 0.25
	let p = 0
	let s = []
	const notes = []
	let x = 0
	let y = 1500
	let measure = 32
	let size = 20
	let scale = 1
	function parseLine(e) {
		let arg = e.match(/[^\s]+/gm)
		let cmd = arg.shift()
        switch (cmd) {
			case "//": {
				
			} break
			case "size": {
				size = parseInt(arg.shift())
			} break
			case "measure": {
				measure = parseFloat(arg.shift())
			} break
			case "scale": {
				scale = parseFloat(arg.shift())
			} break
			case "new": {
				x = arg[0] == null ? (x + 50) : parseFloat(arg[0])
				y = arg[1] == null ? y : parseFloat(arg[1])
				p = 0
				s = []
			} break
			case "trigger": {
				notes.push(`mb ${x} ${y-30-scale*((arg[0] || 0)+measure*(arg[1] || 0))} 10 3 0.01 20 0 20
< ${id++}`)
			} break
			case "grav": {
				grav = parseFloat(arg.shift())
			} break
			case "push": {
				s.push(p)
			} break
			case "pop": {
				p = s.pop()
			} break
			case "d": {
				p += parseFloat(arg.shift())*scale
			} break
			case "p": {
				p = parseFloat(arg.shift())*scale
			} break
			case "from": {
				const f = fs.readFileSync(arg[0], "utf8")
				const lines = f.match(/[^\n\r]+/gm)
				s.push(p)
				lines.forEach(parseLine)
				p = s.pop()
			} break
			case "use": {
				const f = fs.readFileSync(arg[0], "utf8")
				const lines = f.match(/[^\n\r]+/gm)
				lines.forEach(parseLine)
			} break
			case "end": {
				x = x + 50
				y = y
				p = 0
				notes.push(`ic 'io' ${x} ${y} 1
sfx 'none'
< ${id++}`)
				notes.push(`mb ${x} ${y-30-scale*(parseFloat(arg.shift())+measure*parseFloat(arg.shift()))} 10 3 0.01 20 0 20
< ${id++}`)
				
			} break
			default: {
				p += parseFloat(cmd)*scale
				notes.push(`ic 'io' ${x} ${y+p} 1 
trigger
sfx '${arg.shift()}'
< ${id++}`)
			}
		}
	}
	lines.forEach(parseLine)
    return `/
/ circloO level
/ Made with circloO Level Editor
totalCircles ${size} 1
/ EDITOR_TOOL 11 collectcircles
/ EDITOR_VIEW 1425.37 -401.43 2.93
/ EDT 60870
/ _SAVE_TIME_1727703703000_END
levelscriptVersion 8
COLORS 116
grav ${grav} 270
music 2 4
y 22559 -452 1 0 1
bullet
< 0
ic 'i' 22560 -453 1 
zoomFactor -2
trigger
sfx 'none'
< 1
${notes.join("\n")}`
}

fs.writeFileSync("out.lvl", parseSong(fs.readFileSync(process.argv[2] || "main.mus", "utf8")))