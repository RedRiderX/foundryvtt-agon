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
    const sheetData = super.getData();
    const actorData = sheetData.actor.data;
    sheetData.config = CONFIG.AGON;
    
    // Re-define the template data references (backwards compatible)
    sheetData.item = actorData;
    sheetData.data = actorData.data;

    sheetData.pathosChecked = [];
    for (let index = actorData.data.pathos.min; index <= actorData.data.pathos.max; index++) {
      sheetData.pathosChecked[index] = actorData.data.pathos.value == index;
    }

    sheetData.fateChecked = [];
    for (let index = actorData.data.fate.min; index <= actorData.data.fate.max; index++) {
      sheetData.fateChecked[index] = actorData.data.fate.value >= index;
    }
    
    return sheetData;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    html
      .on(
        "click",
        ".fate-line [type='checkbox']",
        this._updateFate.bind(this)
      );
  }

  async _updateFate(e) {
    let newValue = e.target.value;
    return this.actor.update({
      'data': {
        'fate': {
          'value': newValue
        }
      }
    });
  }

  /* -------------------------------------------- */
}
