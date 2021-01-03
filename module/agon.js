// Import Modules
import {AGON} from "./config.js";
import { agonActor } from "./actor/actor.js";
import { agonHeroSheet } from "./actor/hero-sheet.js";
import { agonStrifeSheet } from "./actor/strife-sheet.js";
// import { agonItem } from "./item/item.js";
// import { agonItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function() {
  console.log(`AGON | Initializing Game System\n${AGON.ASCII}`);

  // Create a namespace within the game global
  game.agon = {
    agonActor,
    // agonItem
    config: AGON,
  };

  CONFIG.AGON = AGON;
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

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  // Handlebars.registerHelper('toLowerCase', function(str) {
  //   return str.toLowerCase();
  // });

  // prep templates for later including
  loadTemplates([
    "systems/agon/assets/vault-of-heaven.svg.handlebars",
  ]);
});

// Add listeners for chat card actions
Hooks.on("renderChatLog", (app, html, data) => agonActor.chatListeners(html));

