const fs = require('fs')

const frameworks = fs.readdirSync(__dirname + '/server')
const _autocannon = require('autocannon')
const Table = require('cli-table')

function autocannon() {
  return new Promise(resolve => {
    _autocannon(
      {
        url: 'http://localhost:3000',
        connections: 100,
        pipelining: 10,
        duration: 5
      },
      (err, result) => resolve(result)
    )
  })
}

function delay(ts) {
  return new Promise(resolve => {
    setTimeout(resolve, ts)
  })
}

const tableSeparatorCharsMdTable = {
  top: '',
  'top-left': '',
  'top-mid': '',
  'top-right': '',
  bottom: '',
  'bottom-left': '',
  'bottom-mid': '',
  'bottom-right': '',
  mid: '',
  'left-mid': '',
  'mid-mid': '',
  'right-mid': '',
  left: '|',
  right: '|',
  middle: '|'
}

const pidusage = require('pidusage')

const cp = require('child_process')
const path = require('path')

const pu = pid =>
  new Promise(resolve => {
    pidusage(pid, function(err, stats) {
      resolve(stats)
    })
  })

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json')).toString()
)

function bold(_, str) {
  return str
}

function info(name) {
  if (name === 'node') return 'N/A'
  if (name === 'rouy') return pkg.version
  return pkg.devDependencies[name]
}

;(async function() {
  let data = []

  for (let fw of frameworks) {
    console.log('#', fw)
    const proc = cp.spawn('node', [path.resolve(__dirname, 'server', fw)])

    let result = await autocannon()

    let memUsage = await pu(proc.pid)

    data.push({
      ...result,
      server: fw.split('.')[0],
      memUsage: memUsage.memory / (1024 * 1024)
    })

    proc.kill()
    await delay(1e3)
  }

  data.sort((a, b) => {
    return parseFloat(b.requests.mean) - parseFloat(a.requests.mean)
  })
  const base = Object.assign(
    {},
    {
      name: data[0].server,
      request: data[0].requests.mean,
      latency: data[0].latency.mean,
      throughput: data[0].throughput.mean,
      memUsage: data[0].memUsage
    }
  )
  const table = new Table({
    chars: tableSeparatorCharsMdTable,
    head: [
      '',
      'Version',
      `Requests/s (% of ${base.name})`,
      `Latency (% of ${base.name})`,
      `Throughput/Mb (% of ${base.name})`,
      `Memory MB (% of ${base.name})`
    ]
  })

  table.push([':--', '--:', ':-:', '--:', '--:', '--:'])

  data.forEach(result => {
    const beBold = result.server === 'rouy'
    const version = info(result.server)

    const getPct = (base, value) => ((value / base) * 100).toFixed(2)

    table.push([
      bold(beBold, result.server),
      bold(beBold, version),
      bold(
        beBold,
        `${result.requests.mean} (${getPct(
          base.request,
          result.requests.mean
        )})`
      ),
      bold(
        beBold,
        `${result.latency.mean} (${getPct(base.latency, result.latency.mean)})`
      ),
      bold(
        beBold,
        `${(result.throughput.mean / 1024 / 1024).toFixed(2)} (${getPct(
          base.throughput,
          result.throughput.mean
        )})`
      ),
      bold(
        beBold,
        `${result.memUsage.toFixed(2)} (${getPct(
          base.memUsage,
          result.memUsage
        )})`
      )
    ])
  })

  console.log(table.toString())
})()
