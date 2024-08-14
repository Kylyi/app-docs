import * as p from '@clack/prompts'
import color from 'picocolors'
import { $ } from 'bun'

const isDirectCall = import.meta.url === `file://${process.argv[1]}`

export async function runGitModulesRemove() {
  console.log('Running git-modules-remove script...', isDirectCall ? 'directly' : 'indirectly)')

  p.intro(`${color.bgCyan(color.black('Git Module Remove'))}`)

  p.note(`${color.red('REQUIRES \'sudo\'!')}`)

  const obj = await p.group(
    {
      module: () => p.text({
        message: 'Enter the module to remove:',
        placeholder: 'libs/Module',
      }),
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.')
        process.exit(0)
      },
    },
  )

  await $`git submodule deinit -f ${obj.module}`
  await $`sudo rm -rf .git/modules/${obj.module}`
  await $`rm -rf ${obj.module}`
  await $`git rm -f ${obj.module}`

  p.outro(`${color.yellow(`Module ${obj.module} removed.`)}`)
}

if (isDirectCall) {
  await runGitModulesRemove()
}
