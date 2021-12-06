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
    for (
      let index = actorData.data.pathos.min;
      index <= actorData.data.pathos.max;
      index++
    ) {
      sheetData.pathosChecked[index] = actorData.data.pathos.value == index;
    }

    sheetData.fateChecked = [];
    for (
      let index = actorData.data.fate.min;
      index <= actorData.data.fate.max;
      index++
    ) {
      sheetData.fateChecked[index] = actorData.data.fate.value >= index;
    }

    if (actorData.data.bonds[actorData.data.bonds.length-1].name !== "") {
      actorData.data.bonds.push({ name: "", strength: 0 });
    }
    if (actorData.data.trophies[actorData.data.trophies.length-1].name !== "") {
      actorData.data.trophies.push({ name: "", strength: 0 });
    }

    return sheetData;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    html.on(
      "click",
      ".fate-line [type='checkbox']",
      this._updateFate.bind(this)
    ).on(
      "change",
      ".bond input",
      this._onBondChange.bind(this)
    ).on(
      "change",
      ".trophy input",
      this._onTrophyChange.bind(this)
    );
  }

  async _updateFate(e) {
    let newValue = e.target.value;
    return this.actor.update({
      data: {
        fate: {
          value: newValue,
        },
      },
    });
  }

  /**
   * Handle saving a bond in-sheet.
   * @param {Event} e  Triggering event.
   * @returns {Promise<Actor5e>|null}  Actor after update if any changes were made.
   * @private
   */
   _onBondChange(e) {
    e.preventDefault();
    const target = e.currentTarget;
    const row = target.closest(".bond");
    const bondId = Number(row.dataset.id);

    // Get the entry
    const bonds = foundry.utils.deepClone(this.actor.data.data.bonds);
    const bond = bonds[bondId];
    if (!bond) return null;

    // Update the value
    const key = target.dataset.property || "name";
    const type = target.dataset.dtype;
    let value = target.value;
    if (type === "Number") value = Number(value);
    bond[key] = value;

    // Perform the Actor update
    return this.actor.update({'data.bonds': bonds});
  }
  
  /**
   * Handle saving a trophy in-sheet.
   * @param {Event} e  Triggering event.
   * @returns {Promise<Actor5e>|null}  Actor after update if any changes were made.
   * @private
   */
   _onTrophyChange(e) {
    e.preventDefault();
    const target = e.currentTarget;
    const row = target.closest(".trophy");
    const trophyId = Number(row.dataset.id);

    // Get the entry
    const trophies = foundry.utils.deepClone(this.actor.data.data.trophies);
    const trophy = trophies[trophyId];
    if (!trophy) return null;

    // Update the value
    const key = target.dataset.property || "name";
    const type = target.dataset.dtype;
    let value = target.value;
    if (type === "Number") value = Number(value);
    if (type === "Boolean") value = target.checked;
    trophy[key] = value;

    // Perform the Actor update
    return this.actor.update({'data.trophies': trophies});
  }

  /* -------------------------------------------- */
}
