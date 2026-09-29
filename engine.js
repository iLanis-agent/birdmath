/* BirdMath engine - honest backyard bird feeding math. */
(function (root) {
  "use strict";

  /* Ounces of seed one visiting bird eats per day, by size class. */
  function ozPerBird(size) {
    if (size === "small") return 0.4;      /* chickadees, finches */
    if (size === "large") return 1.1;      /* jays, grackles, doves */
    return 0.7;                            /* medium: cardinals, sparrows */
  }

  /* Daily seed ounces for a feeder station: distinct visiting birds * per-bird
     intake. Feeder count does not multiply intake - the same birds spread out. */
  function seedOzPerDay(birds, size) {
    return Math.round(birds * ozPerBird(size) * 100) / 100;
  }

  /* Pounds of seed per 30-day month. */
  function monthlyLb(birds, size) {
    return Math.round((seedOzPerDay(birds, size) * 30 / 16) * 100) / 100;
  }

  /* Waste fraction of a seed mix: cheap filler that birds kick to the ground.
     Milo and red millet are the classic fillers; wheat is partly eaten. */
  function mixWastePct(opts) {
    var milo = opts && typeof opts.miloPct === "number" ? opts.miloPct : 0;
    var millet = opts && typeof opts.milletPct === "number" ? opts.milletPct : 0;
    var wheat = opts && typeof opts.wheatPct === "number" ? opts.wheatPct : 0;
    var waste = milo * 0.9 + millet * 0.75 + wheat * 0.35;
    return Math.min(95, Math.round(waste * 10) / 10);
  }

  /* Honest cost per EATEN pound: shelf price adjusted for kicked-out filler. */
  function honestCostPerLb(pricePerLb, wastePct) {
    var eaten = 1 - wastePct / 100;
    if (eaten <= 0.05) return Infinity;
    return Math.round((pricePerLb / eaten) * 100) / 100;
  }

  /* Monthly seed cost, honestly adjusted. */
  function monthlyCost(opts) {
    var lb = monthlyLb(opts.birds, opts.size);
    var waste = mixWastePct(opts);
    var price = opts && typeof opts.pricePerLb === "number" ? opts.pricePerLb : 1.5;
    return Math.round(lb * honestCostPerLb(price, waste) * 100) / 100;
  }

  /* Hummingbird nectar: 1 part sugar to 4 parts water by volume.
     Returns sugar cups and total ounces for a water amount in cups. */
  function nectar(waterCups) {
    var sugar = waterCups / 4;
    var totalOz = (waterCups + sugar * 0.5) * 8; /* sugar dissolves, adds ~half its volume */
    return { sugarCups: Math.round(sugar * 100) / 100, totalOz: Math.round(totalOz * 10) / 10 };
  }

  /* Days a nectar feeder stays safe: heat ferments it fast. */
  function nectarSafeDays(tempF) {
    if (tempF >= 90) return 1;
    if (tempF >= 80) return 2;
    if (tempF >= 70) return 3;
    if (tempF >= 60) return 5;
    return 7;
  }

  /* Days one full nectar feeder lasts by daily hummingbird visits.
     A hummingbird drinks roughly half its weight: ~0.15 oz/visit-day. */
  function nectarDays(feederOz, hummers) {
    var perDay = 0.15 * hummers;
    if (perDay <= 0) return Infinity;
    return Math.round((feederOz / perDay) * 10) / 10;
  }

  /* Suet cakes per week: cold snaps double suet demand; heat melts it. */
  function suetPerWeek(birds, tempF) {
    var base = birds * 0.12; /* cakes per bird-week */
    if (tempF <= 20) base *= 2;
    else if (tempF <= 40) base *= 1.5;
    else if (tempF >= 85) base *= 0.5; /* melting, switch to no-melt dough */
    return Math.max(0.5, Math.round(base * 10) / 10);
  }

  /* Refill days for a seed feeder of capacityOz given the daily draw. */
  function refillDays(capacityOz, birds, size) {
    var perDay = seedOzPerDay(birds, size);
    if (perDay <= 0) return Infinity;
    return Math.round((capacityOz / perDay) * 10) / 10;
  }

  /* Yearly budget: monthly cost with winter multiplier (cold months eat more). */
  function yearlyCost(opts) {
    var m = monthlyCost(opts);
    var winterMult = 1.4;
    return Math.round((m * 8 + m * winterMult * 4) * 100) / 100;
  }

  var api = {
    ozPerBird: ozPerBird,
    seedOzPerDay: seedOzPerDay,
    monthlyLb: monthlyLb,
    mixWastePct: mixWastePct,
    honestCostPerLb: honestCostPerLb,
    monthlyCost: monthlyCost,
    nectar: nectar,
    nectarSafeDays: nectarSafeDays,
    nectarDays: nectarDays,
    suetPerWeek: suetPerWeek,
    refillDays: refillDays,
    yearlyCost: yearlyCost
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.BirdMath = api;
})(typeof window !== "undefined" ? window : globalThis);
