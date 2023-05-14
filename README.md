# Klient OpenStack CLI

![coverage-badge](.github/badges/coverage.svg)

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Common options](#common-options)
- [Commands](#commands)
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

### Configure

This command is useful to configure a new project based on open-stack template. It will remove content related to open-stack repository and configure the project files for the new package. This command should be run after git clone open-stack and npm install in cloned dir.

```bash
$ npx open-stack configure
```

### Badge

Create svg coverage badge by making a request to `https://img.shields.io`

```bash
$ npx open-stack badge --input coverage/coverage-summary.json --output badge.svg
```

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