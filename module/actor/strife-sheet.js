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
      height: 830,
    });
  }

  /* -------------------------------------------- */
  starsLayout = {
    aphrodite: {
      one: { top: 19.8, left: 7.5 },
      two: {
        top: 26.5,
        left: 7.5,
      },
      three: {
        top: 33.4,
        left: 7.5,
      },
    },
    apollo: {
      one: { top: 47.5, left: 1.8 },
      two: { top: 47.5, left: 7.4 },
      three: { top: 47.5, left: 13.1 },
    },
    ares: {
      one: { top: 7.5, left: 28.5 },
      two: { top: 12.3, left: 24.2 },
      three: { top: 16.9, left: 20.1 },
    },
    artemis: {
      one: { top: 37.8, left: 18.8 },
      two: { top: 37.8, left: 24.2 },
      three: { top: 37.8, left: 29 },
    },
    athena: {
      one: { top: 20.7, left: 33.9 },
      two: { top: 20.7, left: 40.2 },
      three: { top: 20.7, left: 46.9 },
    },
    demeter: {
      one: { top: 39.8, left: 37.3 },
      two: { top: 52.7, left: 43.6 },
      three: { top: 56, left: 46.4 },
    },
    hekate: {
      one: { top: 2.5, left: 57.1 },
      two: { top: 11.6, left: 57.1 },
      three: { top: 19.5, left: 57.1 },
    },
    hephaistos: {
      one: { top: 31.8, left: 56.9 },
      two: { top: 37.5, left: 56.9 },
      three: { top: 45.5, left: 56.9 },
    },
    hera: {
      one: { top: 20.1, left: 76 },
      two: { top: 24.8, left: 71.8 },
      three: { top: 29.6, left: 67.5 },
    },
    hermes: {
      one: { top: 40.1, left: 73.5 },
      two: { top: 47.5, left: 67.5 },
      three: { top: 47.5, left: 79 },
    },
    poseidon: {
      one: { top: 2.4, left: 87.6 },
      two: { top: 13.6, left: 87.6 },
      three: { top: 22.2, left: 87.6 },
    },
    zeus: {
      one: { top: 39.6, left: 85.3 },
      two: { top: 39.6, left: 90 },
      three: { top: 39.6, left: 94.9 },
    },
  };

  /** @override */
  getData() {
    const sheetData = super.getData();
    const actorData = sheetData.actor.data;
    sheetData.config = CONFIG.AGON;

    sheetData.starsLayout = {};
    Object.keys(actorData.data.vault.stars).forEach((godKey) => {
      if (sheetData.starsLayout[godKey] == null)
        sheetData.starsLayout[godKey] = {};

      Object.keys(actorData.data.vault.stars[godKey]).forEach((starIndex) => {
        sheetData.starsLayout[godKey][starIndex] = {
          top: this.starsLayout[godKey][starIndex].top,
          left: this.starsLayout[godKey][starIndex].left,
          checked: actorData.data.vault.stars[godKey][starIndex],
        };
      });
    });

    return sheetData;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    var that = this;
    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    html
      // .on(
      //   "click",
      //   ".vault-of-heaven .favor-toggle",
      //   this._onFavorToggle.bind(this)
      // )
      .on("click", ".create-contest", function (e) {
        e.preventDefault();
        that.constructor.createContest();
      });
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

  static createContest() {
    let d = new Dialog(
      {
        title: "Create a Contest",
        buttons: {
          roll: {
            icon: '<i class="fas fa-dice-d20"></i>',
            label: "Make Strife Roll",
            callback: this.prototype._createStrifeRoll.bind(this),
          },
        },
      },
      {
        width: 330,
        height: 775,
      }
    );

    renderTemplate("systems/agon/templates/dialog/propose-contest.handlebars", {
      actor: this.actor,
      config: CONFIG.AGON,
    }).then((html) => {
      d.data.content = html;
      d.render(true);
    });
  }

  async _createStrifeRoll(html) {
    const formData = new FormData(html[0].querySelector("form"));
    let dicePool = [];
    let name = formData.get("name").length ? formData.get("name") : null;
    let nameDie = formData.get("nameDie").length
      ? formData.get("nameDie")
      : null;
    let epithet = formData.get("epithet").length
      ? formData.get("epithet")
      : null;
    let epithetDie = formData.get("epithetDie").length
      ? formData.get("epithetDie")
      : null;
    let epithet2 = formData.get("epithet2").length
      ? formData.get("epithet2")
      : null;
    let epithet2Die = formData.get("epithet2Die").length
      ? formData.get("epithet2Die")
      : null;

    if (name && CONFIG.AGON.dieTypes.includes(nameDie)) {
      dicePool.push(nameDie);
    }
    if (epithet && CONFIG.AGON.dieTypes.includes(epithetDie)) {
      dicePool.push(epithetDie);
    }
    if (epithet2 && CONFIG.AGON.dieTypes.includes(epithet2Die)) {
      dicePool.push(epithet2Die);
    }

    let roll = new Roll(`{${dicePool.join()}}kh + @strife`, {
      strife: formData.get("strifeLevel"),
    });
    roll.evaluate();

    let strifeRoll = await ChatMessage.create({
      content: await renderTemplate(
        "systems/agon/templates/chat/strife-roll.handlebars",
        {
          name,
          epithet,
          epithet2,
          epic: formData.get("epic"),
          mythic: formData.get("mythic"),
          perilous: formData.get("perilous"),
          sacred: formData.get("sacred"),
          domain: formData.get("domain"),
          target: roll.total,
        }
      ),
    });

    ChatMessage.create({
      content: await renderTemplate(
        "systems/agon/templates/chat/fortune-test.handlebars",
        {
          messageId: strifeRoll.id,
        }
      ),
      whisper: [game.userId],
    });
  }

  // /**
  //  * Handle Favor point clicks
  //  * @param {Event} event   The originating click event
  //  * @private
  //  */
  // _onFavorToggle(event) {
  //   //
  // }
}
