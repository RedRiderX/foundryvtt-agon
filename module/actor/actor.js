/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class agonActor extends Actor {
  // /**
  //  * Augment the basic actor data with additional dynamic data.
  //  */
  // prepareData() {
  //   super.prepareData();

  //   const actorData = this.data;
  //   const data = actorData.data;
  //   const flags = actorData.flags;

  //   // Make separate methods for each Actor type (character, npc, etc.) to keep
  //   // things organized.
  //   if (actorData.type === 'hero') this._prepareHeroData(actorData);
  // }

  // /**
  //  * Prepare Character type specific data
  //  */
  // _prepareHeroData(actorData) {
  //   const data = actorData.data;

  //   // Make modifications to data here. For example:

  //   // Loop through ability scores, and add their modifiers to our sheet output.
  //   for (let [key, ability] of Object.entries(data.abilities)) {
  //     // Calculate the modifier using d20 rules.
  //     ability.mod = Math.floor((ability.value - 10) / 2);
  //   }
  // }

  /* -------------------------------------------- */
  /*  Chat Message Helpers                        */
  /* -------------------------------------------- */

  static chatListeners(html) {
    html.on("click", ".card-actions button", this._onChatCardAction.bind(this));
  }

  /**
   * Handle execution of a chat card action via a click event on one of the card buttons
   * @param {Event} event       The originating click event
   * @returns {Promise}         A promise which resolves once the handler workflow is complete
   * @private
   */
  static async _onChatCardAction(event) {
    event.preventDefault();

    // Extract card data
    const button = event.currentTarget;
    button.disabled = true;
    const action = button.dataset.action;
    const messageId = button.dataset["message-id"];
    const target = button.dataset.target;

    // Handle different actions
    switch (action) {
      case "contest-reply":
        let domain = button.dataset.domain;

        if (typeof game.user.character === "undefined") {
          throw "No Active Character!";
        }

        let d = new Dialog({
          title: "Which of your aspects do you call on?",
          content: await renderTemplate(
            "systems/agon/templates/dialog/contest-reply.handlebars",
            {
              target,
              domain,
              hero: game.user.character.data,
              config: CONFIG.AGON,
            }
          ),
          buttons: {
            roll: {
              icon: '<i class="fas fa-dice-d20"></i>',
              label: "Speak Your Name",
              callback: this.prototype._createStrifeRoll.bind(this),
            },
          },
          // render: html => console.log("Register interactivity in the rendered dialog"),
          // close: html => console.log("This always is logged no matter which option is chosen")
        });
        d.render(true);
        break;
      case "test-fortune":
        const heroRolls = game.messages.filter(
          (message) => message.getFlag("agon", "relatedContest") === messageId
        );

        if (heroRolls.length < 1) {
          console.log("no hero rolls found!");
          break;
        }

        heroRolls.forEach((message) => {
          console.log(message, message.roll.formula);
          // execute roll, save to array
        });

        // if any higher then target prep success message, else fail message
        // a three section message? one for success/fail, one for best hero,
        // one for heros that suffer
        // whisper to each player hints for reciting deeds

        // ChatMessage.create({
        //   content: html[0].querySelector("form .spoken_title").outerHTML,
        //   flags: { "agon.relatedContest": messageId },
        //   roll: JSON.stringify(Roll.create("1d4").toJSON()),
        // });
        break;
    }

    // Re-enable the button
    button.disabled = false;
  }

  async _createStrifeRoll(html) {
    const formData = new FormData(html[0].querySelector("form"));
    console.log(formData);
    let dicePool = [];
    let epithet1 = formData.has("epithet1");
    let epithet2 = formData.has("epithet2");
    let domain = formData.get("domain").length ? formData.get("domain") : null;
    let favor = formData.get("favor").length ? formData.get("favor") : null;
    let bond = formData.get("bond").length ? formData.get("bond") : null;
    let support = formData.get("support").length
      ? formData.get("support")
      : null;
    let advantage = formData.get("advantage").length
      ? formData.get("advantage")
      : null;

    // let roll = new Roll(`{${dicePool.join()}}kh + @strife`, {
    //   strife: formData.get("strifeLevel"),
    // });
    // roll.evaluate();

    // ChatMessage.create({
    //   content: await renderTemplate(
    //     "systems/agon/templates/chat/spoken-name.handlebars",
    //     {
    //       // messageId: strifeRoll.id,
    //     }
    //   ),
    //   flags: { "agon.relatedContest": messageId },
    //   roll: JSON.stringify(Roll.create("1d4").toJSON()),
    // });
  }
}
