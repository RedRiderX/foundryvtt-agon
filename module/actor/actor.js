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

    // Handle different actions
    switch (action) {
      case "contest-reply":
        let target = button.dataset.target;
        let domain = button.dataset.domain;

        if (typeof game.user.character === "undefined") {
          throw "No Active Character!";
        }

        let d = new Dialog({
          title: "Which of your aspects do you call on?",
          content: await renderTemplate(
            "systems/agon/templates/dialog/contest-reply.handlebars",
            { target, domain, hero: game.user.character.data }
          ),
          buttons: {
            roll: {
              icon: '<i class="fas fa-dice-d20"></i>',
              label: "Speak Your Name",
              callback: (html) =>
                ChatMessage.create({
                  content:
                    html[0].querySelector("form .spoken_title").outerHTML,
                }),
            },
          },
          // render: html => console.log("Register interactivity in the rendered dialog"),
          // close: html => console.log("This always is logged no matter which option is chosen")
        });
        d.render(true);
        break;
    }

    // Re-enable the button
    button.disabled = false;
  }
}
