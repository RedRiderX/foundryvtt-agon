/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class agonStrifeSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["agon", "sheet", "actor", "actor__strife"],
      template: "systems/agon/templates/actor/strife-sheet.handlebars",
      width: 800,
      height: 800,
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.config = CONFIG.AGON;
    return data;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    html
      .on(
        "click",
        ".vault-of-heaven .favor-toggle",
        this._onFavorToggle.bind(this)
      )
      .on("click", ".create-contest", this._createContest.bind(this));
  }

  /* -------------------------------------------- */

  // /**
  //  * Handle clickable rolls.
  //  * @param {Event} event   The originating click event
  //  * @private
  //  */
  // _onRoll(event) {
  //   event.preventDefault();
  //   const element = event.currentTarget;
  //   const dataset = element.dataset;

  //   if (dataset.roll) {
  //     let roll = new Roll(dataset.roll, this.actor.data.data);
  //     let label = dataset.label ? `Rolling ${dataset.label}` : '';
  //     // roll.roll().toMessage({
  //     //   speaker: ChatMessage.getSpeaker({ actor: this.actor }),
  //     //   content: '<h1>woah man</h1>',
  //     //   flavor: label
  //     // });
  //     roll.evaluate();
  //     roll.result;
  //     renderTemplate("systems/agon/templates/chat/strife-roll.html", {}).then(html => {
  //       ChatMessage.create({content: html});
  //     })
  //     // ChatMessage.create({
  //     //   content: '<h1>The Strife Player Rolls</h1>'
  //     // });
  //   }
  // }

  _createContest(event) {
    event.preventDefault();
    let d = new Dialog({
      title: "Create a Contest",
      buttons: {
        roll: {
          icon: '<i class="fas fa-dice-d20"></i>',
          label: "Make Strife Roll",
          callback: this._createStrifeRoll.bind(this),
        },
      },
    });

    renderTemplate("systems/agon/templates/dialog/propose-contest.handlebars", {
      actor: this.actor,
      config: CONFIG.AGON,
    }).then((html) => {
      d.data.content = html;
      d.render(true);
    });
  }

  _createStrifeRoll(html) {
    const formData = new FormData(html[0].querySelector('form'));
    let dicePool = [];
    let name = formData.get('name').length ? formData.get('name') : null;
    let epithet = formData.get('epithet').length ? formData.get('epithet') : null;
    let epithet2 = formData.get('epithet2').length ? formData.get('epithet2') : null;

    if (name) {
      dicePool.push('1' + CONFIG.AGON.dieTypes[formData.get('nameDie')]);
    }
    if (epithet) {
      dicePool.push('1' + CONFIG.AGON.dieTypes[formData.get('epithetDie')]);
    }
    if (epithet2) {
      dicePool.push('1' + CONFIG.AGON.dieTypes[formData.get('epithet2Die')]);
    }
    
    // let rollFormula = ;
    let roll = new Roll(`{${dicePool.join()}}kh + @strife`, {strife: formData.get('strifeLevel')});
    roll.evaluate();

    renderTemplate("systems/agon/templates/chat/strife-roll.handlebars", {
      name,
      epithet,
      epithet2,
      epic: formData.get('epic'),
      mythic: formData.get('mythic'),
      perilous: formData.get('perilous'),
      sacred: formData.get('sacred'),
      domain: formData.get('domain'),
      target: roll.total,
    }).then((html) => {
      ChatMessage.create({ content: html });
    });
  }

  /**
   * Handle Favor point clicks
   * @param {Event} event   The originating click event
   * @private
   */
  _onFavorToggle(event) {
    //
  }
}
