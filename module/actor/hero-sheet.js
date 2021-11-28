/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class agonHeroSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["agon", "sheet", "actor", "actor__hero"],
      template: "systems/agon/templates/actor/hero-sheet.handlebars",
      width: 700,
      height: 800,
      // tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    const actorData = data.actor.data;
    data.config = CONFIG.AGON;
    
    // Re-define the template data references (backwards compatible)
    data.item = actorData;
    data.data = actorData.data;
    data.pathosChecked = [];
    for (let index = actorData.data.pathos.min; index < actorData.data.pathos.max; index++) {
      data.pathosChecked[index] = actorData.data.pathos.value === index;
    }
    return data;
  }

  /* -------------------------------------------- */
}
