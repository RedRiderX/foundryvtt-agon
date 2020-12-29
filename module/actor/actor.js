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
    html.on('click', '.card-actions button', this._onChatCardAction.bind(this));
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
    const card = button.closest(".chat-card");
    const messageId = card.closest(".message").dataset.messageId;
    const message =  game.messages.get(messageId);
    const action = button.dataset.action;

    // // Validate permission to proceed with the roll
    // const isTargetted = action === "save";
    // if ( !( isTargetted || game.user.isGM || message.isAuthor ) ) return;

    // // Recover the actor for the chat card
    // const actor = this._getChatCardActor(card);
    // if ( !actor ) return;

    // // Get the Item from stored flag data or by the item ID on the Actor
    // const storedData = message.getFlag("dnd5e", "itemData");
    // const item = storedData ? this.createOwned(storedData, actor) : actor.getOwnedItem(card.dataset.itemId);
    // if ( !item ) {
    //   return ui.notifications.error(game.i18n.format("DND5E.ActionWarningNoItem", {item: card.dataset.itemId, name: actor.name}))
    // }
    // const spellLevel = parseInt(card.dataset.spellLevel) || null;

    // Handle different actions
    switch ( action ) {
      case "contest-reply":
        ChatMessage.create({content:'yo'});
        break;
      //   await item.rollAttack({event}); break;
      // case "damage":
      // case "versatile":
      //   await item.rollDamage({
      //     critical: event.altKey,
      //     event: event,
      //     spellLevel: spellLevel,
      //     versatile: action === "versatile"
      //   });
      //   break;
      // case "formula":
      //   await item.rollFormula({event, spellLevel}); break;
      // case "save":
      //   const targets = this._getChatCardTargets(card);
      //   for ( let token of targets ) {
      //     const speaker = ChatMessage.getSpeaker({scene: canvas.scene, token: token});
      //     await token.actor.rollAbilitySave(button.dataset.ability, { event, speaker });
      //   }
      //   break;
      // case "toolCheck":
      //   await item.rollToolCheck({event}); break;
      // case "placeTemplate":
      //   const template = AbilityTemplate.fromItem(item);
      //   if ( template ) template.drawPreview();
      //   break;
    }

    // Re-enable the button
    button.disabled = false;
  }

}