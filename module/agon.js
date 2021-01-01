// Import Modules
import { agonActor } from "./actor/actor.js";
import { agonHeroSheet } from "./actor/hero-sheet.js";
import { agonStrifeSheet } from "./actor/strife-sheet.js";
// import { agonItem } from "./item/item.js";
// import { agonItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function() {

  game.agon = {
    agonActor,
    // agonItem
  };

  // /**
  //  * Set an initiative formula for the system
  //  * @type {String}
  //  */
  // CONFIG.Combat.initiative = {
  //   formula: "1d20",
  //   decimals: 2
  // };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = agonActor;
  // CONFIG.Item.entityClass = agonItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("agon", agonHeroSheet, { 
    types: ["hero_player"],
    makeDefault: true
  });
  Actors.registerSheet("agon", agonStrifeSheet, { 
    types: ["strife_player"],
    makeDefault: true
  });
  // Items.unregisterSheet("core", ItemSheet);
  // Items.registerSheet("agon", agonItemSheet, { makeDefault: true });

  // // If you need to add Handlebars helpers, here are a few useful examples:
  // Handlebars.registerHelper('concat', function() {
  //   var outStr = '';
  //   for (var arg in arguments) {
  //     if (typeof arguments[arg] != 'object') {
  //       outStr += arguments[arg];
  //     }
  //   }
  //   return outStr;
  // });

  // Handlebars.registerHelper('toLowerCase', function(str) {
  //   return str.toLowerCase();
  // });
  // Handlebars.registerHelper('svgPath', function(){
  //   return chunk.toString();
  // });

  loadTemplates([
    "systems/agon/assets/vault-of-heaven.svg.handlebars",
  ]);
});

// Add listeners for chat card actions
Hooks.on("renderChatLog", (app, html, data) => agonActor.chatListeners(html));

// /**
//  * Define a set of template paths to pre-load
//  * Pre-loaded templates are compiled and cached for fast access when rendering
//  * @return {Promise}
//  */
// export const preloadHandlebarsTemplates = async function() {
//   return loadTemplates([

//     // Shared Partials
//     "systems/dnd5e/templates/actors/parts/active-effects.html",

//     // Actor Sheet Partials
//     "systems/dnd5e/templates/actors/parts/actor-traits.html",
//     "systems/dnd5e/templates/actors/parts/actor-inventory.html",
//     "systems/dnd5e/templates/actors/parts/actor-features.html",
//     "systems/dnd5e/templates/actors/parts/actor-spellbook.html",

//     // Item Sheet Partials
//     "systems/dnd5e/templates/items/parts/item-action.html",
//     "systems/dnd5e/templates/items/parts/item-activation.html",
//     "systems/dnd5e/templates/items/parts/item-description.html",
//     "systems/dnd5e/templates/items/parts/item-mountable.html"
//   ]);
// };
