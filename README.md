# Klient OpenStack CLI

![coverage-badge](.github/badges/coverage.svg)

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Common options](#common-options)
- [Commands](#commands)
  * [Create](#create)
  * [Configure](#configure)
  * [Badge](#badge)
  * [Update](#update)
    + [Check for update analyze](#check-for-update-analyze)
    + [Apply changes on elements which are not in conflict](#apply-changes-on-elements-which-are-not-in-conflict)
    + [Generate report file](#generate-report-file)
    + [Complete example](#complete-example)

## Introduction

This package contains a CLI able to make actions on project based on the Klient [open-stack](https://github.com/klientjs/open-stack) template, with useful commands provided.

## Installation

```bash
# <--- In a project --->

$ npm install --save-dev @klient/open-stack-cli

# <--- Globally (in your $PATH) --->

$ npm install -g @klient/open-stack-cli
```

## Usage

```bash
$ npx open-stack [command] <options>

```

## Common options

- `--verbose` : verbose mode
- `--raw` : disable colors
- `--silent` : disable output

## Commands

### Create

*This command must be run with open-stack bin installed globally*

This command is useful to create a new project based on open-stack template. It will clone stack repository on specified version (latest by default), it will launch "configure" command and create commits for every initialization step. By using this command, you just need to create an empty repository in github and launch "git push" after create command.

```bash
$ npm install -g @klient/open-stack-cli

$ open-stack create path/to/dir --version latest --verbose
# "npm run configure" will be run and will ask you
# few question for configurating your project

$ cd path/to/dir            # Move to fresh created dir
$ git log                   # See created commits
$ git remote get-url origin # Verify the remote before push
$ git push                  # Push project !
```

### Configure

This command is useful to configure a new project based on open-stack template. It will remove content related to open-stack repository and configure the project files for the new package. This command should be run after git clone open-stack and before npm install.

```bash
$ npx open-stack configure
```

### Setup

This command is useful to setup an external library in open-stack project.

For now, you can you following libraries : 

`react` : Setup your project for exporting React components (for react additionnal libraries only)
`react-app` : Setup your project as create-react-app (for web application only)

**Caution : This should be used just after create command (in fresh blank project) with no untracked files present** 

```bash
$ npx open-stack create ./example
$ cd ./example
$ npx open-stack setup react-app

# Project has been updated, you can change diff with git commands
$ git status
$ git diff

# Commit changes made if all is clean for you
$ git add .
$ git commit -m"chore(stack): setup react-app"
$ git push
```

### Badge

Create svg coverage badge by making a request to `https://img.shields.io`

```bash
# Create badge based on all coverage members (lines, statements, functions, branches)
$ npx open-stack badge --input coverage/coverage-summary.json --output badge.svg

# Create badge based on statements only
$ npx open-stack badge --input coverage/coverage-summary.json --output badge.svg --incomplete
```

Note that the badge color is determinated by following rules :

- red : 0 to 60%
- orange : 60% to 70%
- yellow : 70% to 80%
- lightgreen : 80% to 90%
- green : 90% to 95%
- brightgreen : 95% to 100%

### Update

Try to update files of a project based on open-stack template. The changes are applied only on elements which are not in conflict, else it must be updated manually. A mardown report can be generated to check all changes.

**Caution, if you are not using dry option, changes will be applied.**

#### Check for update analyze

```bash
$ npx open-stack update path/to/dir --to latest --dry --verbose
```

#### Apply changes on elements which are not in conflict

```bash
$ npx open-stack update path/to/dir --to latest
```

#### Generate report file

```bash
# Markdown
$ npx open-stack update path/to/dir --dry --report path/to/report.md
# JSON
$ npx open-stack update path/to/dir --dry --report path/to/report.json
```

#### Complete example

```bash
$ npx open-stack update path/to/dir
    # Target version (tag or latest, branches are not accepted)
    --to latest
    # Version currently used by project
    --from 1.0.2
    # The template source repository
    --repository https://github.com/klientjs/open-stack.git
    # The glob for specifying files to update
    --files .github/ISSUE_TEMPLATES/*
    --files .eslintrc
    # Generate a report file
    --report report.{md|json}
    # Read only mode
    --dry
    # Verbose output
    --verbose
```