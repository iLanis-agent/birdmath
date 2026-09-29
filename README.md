# BirdMath

Honest math for feeding backyard birds: real seed draw, the cheap-mix filler trap, cost per eaten pound, hummingbird nectar ratios and spoil days, suet demand by temperature, and refill schedules.

## Run it

Static site. Open `index.html` (landing) or `app.html` (the planner). On GitHub Pages the root serves the landing page.

## What it computes

- **Seed draw** - about 0.4 oz per small bird per day (chickadees, finches), 0.7 medium (cardinals, sparrows), 1.1 large (jays, doves). More feeders spread the same birds out; they do not multiply appetites.
- **The filler trap** - milo (~90% kicked out), red millet (~75%), wheat (~35%). A cheap mix at $1.20/lb with 45% filler costs over $2.20 per eaten pound - more than a premium mix.
- **Nectar** - 1 part sugar to 4 parts water by volume; safe days drop from 7 in cool weather to 1 above 90F. A hummingbird drinks about 0.15 oz/day.
- **Suet** - demand roughly doubles below 20F and halves above 85F (switch to no-melt dough).
- **Refill and budget** - days per feeder fill, monthly and yearly cost with a 40% winter bump.

## Files

- `index.html` - landing page
- `app.html` - the planner
- `engine.js` - pure math (also usable from Node: `require('./engine.js')`)
