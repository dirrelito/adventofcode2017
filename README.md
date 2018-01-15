# About

This is my repository for solutions for [AoC2017](http://adventofcode.com/2017/)

I used the AoC challenge to improve on my Typescript skills. I strived for solutions that treated data as immutable, avoiding use of classes and attempting to write functional code. During the way I learned a few things:

## Some learnings about the challanges and coding style
* Some code simply is much much easier to write OO-style. [day25](./25/lib.ts)
* Some code I wrote OO-style in hope to simplify just made things worse. See [day21](./21/lib.ts)
* In some cases I found the right abstraction right away so star 2 came for free. See [day9](./9/index.ts). That day also gave me the opportunity to use combinator parsers to parse nested groups!
* Using a rich type system (as I did in [day25](25/lib.ts)) helps a lot!

## Some learnings about frameworks and tools
### Javascript
* The function [safeAccess](./18/lib.ts#L64-70), which I duplicated [here](./8/lib.ts#L30-33) is better replaced by inlining expressions like [this](25/lib.ts#L31)
* Using the Class keyword make anonymous objects a pain in testing (since they may or may not have the same prototypes).

### Typescript
* AssertNever is *the best* thing when using sum types. [see here](11/lib#L41)
* Tuples are nice product types. Cleaner than objects in many ways... Since record types and product types are kind of the same thing in Haskell I got that a little bit wrong at first.
* Option types are a bit wierd in TS. They dont really fit in the framework since javascript has both null and undefined.

### Parsing
* Often its easiest to just use `String.prototype.split()` on whatever input one has, but sometimes input is more complicated
* Compinator parsers are nice since they can be constructed piecewise
* Masala-parser is all ok to use, but the documentation is a bit lacking.

### Node
Async code is not really that needed in this kind of computational heavy code (not I/O heavy). Just use Sync!

# Installation & running
`npm install`. As always.

`npm start`, and select day to solve from the prompt.


# Dev
Do your code in a folder with day number.


```
.
│   index.ts
│   file001.txt    
│
└───1
│   │   index.ts
│   │   lib.ts
|   |   lib.spec.ts
|
└───2
│   │   index.ts
│   │   lib.ts
|   |   lib.spec.ts
...
|
└───util
    │   lib.ts
    |   lib.spec.ts
```
The folder must contain three files:
1. `index.ts` in the folder, which exports a function `main: () => Promise<void>`
1. `lib.ts` all parts that are to be tested (and possibly reusable)
1. `lib.spec.ts` the specs for the lib file.

All code that is reused in more than one day should be moved into the util-library. This is to understand what kind of functionality that I actually reuse.

## Testing
Add test spect as `blah.spec.ts`.

### Running tests
`npm test`. 
Uses `jasmine-ts`.

### Test coverage
Also run `npm run test-and-cover` to generate test coverage in a foler `./coverage` using istanbul. Aim for 100% covarage! Make the code simpler if some cases are not in use.
