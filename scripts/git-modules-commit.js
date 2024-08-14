import { $ } from 'bun'
import * as p from '@clack/prompts'
import color from 'picocolors'

const isDirectCall = import.meta.url === `file://${process.argv[1]}`

export async function runGitModulesCommit() {
  console.log('Running git-modules-commit script...', isDirectCall ? 'directly' : 'indirectly')

  p.intro(`${color.bgCyan(color.black('Git Modules Commit'))}`)

  const prompt = await p.group(
    {
      message: () => p.text({
        message: 'Enter commit message:',
        placeholder: 'chore: up',
      }),
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.')
        process.exit(0)
      },
    },
  )

  await $`git submodule foreach 'git add . && git commit -m "${prompt.message || 'chore: up'}" || echo "No changes to commit in $path"'`
}

if (isDirectCall) {
  await runGitModulesCommit()
}
