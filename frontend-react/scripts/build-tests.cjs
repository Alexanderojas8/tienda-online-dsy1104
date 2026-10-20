
const fs = require('node:fs')
const path = require('node:path')
const esbuild = require('esbuild')
const babel = require('@babel/core')

const raiz = path.resolve(__dirname, '..')
const carpetaTemporal = path.join(raiz, 'test-dist')

const archivoSalida = path.join(carpetaTemporal, 'tests.js')

async function prepararPruebas() {
  fs.mkdirSync(carpetaTemporal, { recursive: true })

  await esbuild.build({
    stdin: {
      contents: `
        import '../tests/formatoPrecio.spec.js'
        import '../tests/carrito.spec.js'
        import '../tests/Navbar.spec.jsx'
      `,
      resolveDir: carpetaTemporal,
      sourcefile: 'entrada-pruebas.js',
      loader: 'js'
    },

    bundle: true,
    platform: 'browser',
    format: 'iife',
    outfile: archivoSalida,
    sourcemap: 'inline',
    target: 'es2020',
    jsx: 'automatic',

    plugins: [
      {
        name: 'instrumentar-codigo-fuente',

        setup(build) {
          build.onLoad(
            {
              filter: /[\\/]src[\\/]utils[\\/].*\.js$/
            },

            async (args) => {
              const codigo = fs.readFileSync(
                args.path,
                'utf8'
              )

              const resultado = babel.transformSync(codigo, {
                filename: args.path,
                babelrc: false,
                configFile: false,
                plugins: ['babel-plugin-istanbul']
              })

              return {
                contents: resultado.code,
                loader: 'js'
              }
            }
          )
        }
      }
    ]
  })

  console.log(
    'Pruebas preparadas: precios, carrito y Navbar React.'
  )

  console.log(
    'Cobertura configurada para src/utils.'
  )
}

prepararPruebas().catch((error) => {
  console.error(
    'Error al preparar las pruebas:',
    error
  )

  process.exitCode = 1
})
