import * as core from '@actions/core'
import {deletePackages} from './github'

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github_token')
    const owner = core.getInput('owner')
    const repo = core.getInput('repo')
    const packages = core.getMultilineInput('packages')
    const semVerPattern = core.getInput('max_semver_pattern')
    const dryRun = core.getBooleanInput('dry_run')

    core.debug('hello cac ban')

    core.debug(
      JSON.stringify({
        githubToken,
        owner,
        repo,
        packages,
        semVerPattern,
        dryRun
      })
    )

    await deletePackages({
      githubToken,
      owner,
      repo,
      packages,
      semVerPattern,
      dryRun
    })

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
