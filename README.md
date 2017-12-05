# Installation
`npm install`. As always.

# Running
`npm start`, and select day to solve.


# Dev
Do your code in a folder with day number.
Add test spect as `blah.spec.ts`.

New days must have a `index.ts` in the folder, which exports a function `main: () => Promise<void>`


## Testing
`npm test`. 
Uses `jasmine-ts`.

Also run `npm run test-and-cover` to generate test coverage in a foler `./coverage` using istanbul. Aim for 100% covarage! Make the code simpler if some cases are not in use.
