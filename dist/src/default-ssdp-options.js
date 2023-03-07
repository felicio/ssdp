import path from 'path'
import url from 'url'
import { v4 } from 'uuid'
import { defaultSocketOptions } from './default-socket-options.js'
import util from 'util'
import { createRequire } from 'module'
import mergeOptions from 'merge-options'
import type { SSDPOptions } from './index.js'
import pkg2 from '../package.json' assert { type: 'json' }

const req = createRequire(import.meta.url)
const pkg = req('../../package.json')

console.log('pkg', pkg.name)
console.log('pkg2', pkg2.name)

// console.log('dirname', __dirname)
console.log('isAbsolute', path.isAbsolute('../../package.json'))
console.log('isAbsolute', path.isAbsolute('./package.json'))
console.log('isAbsolute', path.isAbsolute('/package.json'))
console.log('isAbsolute', path.isAbsolute('package.json'))

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __dirname2 = path.resolve()

console.log('__filename', __filename)
console.log('__dirname', __dirname)
console.log('__dirname2', __dirname2)

const filename = path.join(__dirname, '../package.json')

const pkg3 = req(filename)

console.log('pkg3', pkg3.name)

const pkg4 = req('../package.json')

console.log('pkg4', pkg4.name)

const DEFAULT_SSDP_SIGNATURE = util.format(
  'node.js/%s UPnP/1.1 %s/%s',
  process.version.substring(1),
  pkg.name,
  pkg.version,
)

export function defaultSsdpOptions(
  options?: Partial<SSDPOptions>,
): SSDPOptions {
  return mergeOptions(options ?? {}, {
    usn: `uuid:${v4()}`, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    signature: DEFAULT_SSDP_SIGNATURE,
    sockets: [{}].map(defaultSocketOptions),
    retry: {
      times: 5,
      interval: 5000,
    },
  })
}
