# Gilded Rose

This is the Gilded Rose kata in Javascript with Jest, which I moved to Typescript and Vitest before beggining.

## How it went

You can look at the commit log, which I copied just here:

- lint and change to pnpm
- replace jest by vitest
- switch lang to typescript
- activate all ts strict checking
- fix npm script commands
- add eslint
- cover existing behaviors with test
- simplify conditions, extract constants
- add early return for normal items
- add test case for the two case where quality decreases
- move normal update behavior to the item class
- move item behavior, and aged brie to factory and decorator pattern
- move backstage passes behavior to a decorator class
- extract sulfuras to a decorator
- split the item file to many files
- move special items tests to their own files
- add conjured item behavior

I was pretty surprised at how mindless the refactoring can be once your confident you covered all behaviours you know of by tests. I guess it's particularly easy here as we have a clear list of requirements which, even with this bad update loop, is also easily mapped to the code.

## Getting started

Install dependencies

```sh
pnpm install
```

## Running tests

To run all tests

```sh
pnpm test
```
