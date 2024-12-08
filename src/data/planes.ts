export interface Plane {
  id: string;
  name: string;
  type: 'universe' | 'special' | 'doctorwho';
  location: string;
  effect: string;
  chaosEffect: string;
  imageUrl?: string;
}

export const planes: Plane[] = [
  {
    "id": "academy-at-tolaria-west",
    "name": "Academy at Tolaria West",
    "type": "universe",
    "location": "Dominaria",
    "effect": "At the beginning of your end step, if you have no cards in hand, draw seven cards.",
    "chaosEffect": "discard your hand.",
    "imageUrl": null
  },
  {
    "id": "agyrem",
    "name": "Agyrem",
    "type": "universe",
    "location": "Ravnica",
    "effect": "Whenever a white creature dies, return it to the battlefield under its owner\u00e2\u0080\u0099s control at the beginning of the next end step. Whenever a nonwhite creature dies, return it to its owner\u00e2\u0080\u0099s hand at the beginning of the next end step.",
    "chaosEffect": "creatures can\u00e2\u0080\u0099t attack you until a player planeswalks.",
    "imageUrl": null
  },
  {
    "id": "akoum",
    "name": "Akoum",
    "type": "universe",
    "location": "Zendikar",
    "effect": "Players may cast enchantment spells as though they had flash.",
    "chaosEffect": "destroy target creature that isn\u00e2\u0080\u0099t enchanted.",
    "imageUrl": null
  },
  {
    "id": "amy-s-home",
    "name": "Amy's Home",
    "type": "doctorwho",
    "location": "Earth",
    "effect": "When you planeswalk to Amy\u00e2\u0080\u0099s Home and at the beginning of your upkeep, you may exile a nonland card from your hand with a number of time counters on it equal to its mana value. If it doesn\u00e2\u0080\u0099t have suspend, it gains suspend.",
    "chaosEffect": "time travel.",
    "imageUrl": null
  },
  {
    "id": "antarctic-research-base",
    "name": "Antarctic Research Base",
    "type": "doctorwho",
    "location": "Earth",
    "effect": "When you planeswalk to Antarctic Research Base and at the beginning of your upkeep, investigate.",
    "chaosEffect": "put X +1/+1 counters on target creature you control, where X is the number of artifacts you control. It becomes a Plant in addition to its other types.",
    "imageUrl": null
  },
  {
    "id": "aplan-mortarium",
    "name": "Aplan Mortarium",
    "type": "doctorwho",
    "location": "Alfava Metraxis",
    "effect": "Byzantium Radiation - At the beginning of your upkeep, put an exposure counter on Aplan Mortarium. Then you lose life equal to the number of exposure counters on it.",
    "chaosEffect": "create two 2/2 black Alien Angel artifact creature tokens with first strike, vigilance, and \u00e2\u0080\u009cWhenever an opponent casts a creature spell, this permanent isn\u00e2\u0080\u0099t a creature until end of turn.\u00e2\u0080\u009d",
    "imageUrl": null
  },
  {
    "id": "aretopolis",
    "name": "Aretopolis",
    "type": "universe",
    "location": "Kephalai",
    "effect": "When you planeswalk to Aretopolis and at the beginning of your upkeep, put a scroll counter on Aretopolis, then you gain life equal to the number of scroll counters on it. When Aretopolis has ten or more scroll counters on it, planeswalk.",
    "chaosEffect": "put a scroll counter on Aretopolis, then draw cards equal to the number of scroll counters on it.",
    "imageUrl": null
  },
  {
    "id": "artist-alley",
    "name": "Artist Alley",
    "type": "special",
    "location": "MagicCon",
    "effect": "Whenever you planeswalk here and at the beginning of your upkeep, exile the top card of your library. You may play that card this turn.",
    "chaosEffect": "exile the top six cards of your library. An opponent chooses a nonland card with their favorite art. Then you may cast that spell without paying its mana cost.",
    "imageUrl": null
  },
  {
    "id": "astral-arena",
    "name": "Astral Arena",
    "type": "universe",
    "location": "Kolbahan",
    "effect": "No more than one creature can attack each combat. No more than one creature can block each combat.",
    "chaosEffect": "Astral Arena deals 2 damage to each creature.",
    "imageUrl": null
  },
  {
    "id": "bad-wolf-bay",
    "name": "Bad Wolf Bay",
    "type": "doctorwho",
    "location": "Earth",
    "effect": "At the beginning of combat on your turn, exile up to one target creature. Return it to the battlefield under its owner\u00e2\u0080\u0099s control at the beginning of the next end step. ",
    "chaosEffect": "Cards can\u0092t enter from exile this turn. Then planeswalk.",
    "imageUrl": null
  },
  {
    "id": "bant",
    "name": "Bant",
    "type": "universe",
    "location": "Alara",
    "effect": "All creatures have exalted.",
    "chaosEffect": "put a divinity counter on target green, white, or blue creature. That creature has indestructible for as long as it has a divinity counter on it.",
    "imageUrl": null
  },
  {
    "id": "besieged-viking-village",
    "name": "Besieged Viking Village",
    "type": "doctorwho",
    "location": "Earth",
    "effect": "All creatures have \u00e2\u0080\u009cBoast - {1}: Put a +1/+1 counter on this creature.\u00e2\u0080\u009d",
    "chaosEffect": "put an indestructible counter on target creature you control that attacked this turn.",
    "imageUrl": null
  },
  {
    "id": "bicycle-rack",
    "name": "Bicycle Rack",
    "type": "special",
    "location": "Amsterdam",
    "effect": "Cards in each player\u00e2\u0080\u0099s hand have cycling {2}.",
    "chaosEffect": "Until end of turn, creatures you control have \u00e2\u0080\u009cThis creature gets +1/+1 for each card you\u00e2\u0080\u0099ve discarded this turn.\u00e2\u0080\u009d",
    "imageUrl": null
  },
  {
    "id": "black-lotus-lounge",
    "name": "Black Lotus Lounge",
    "type": "special",
    "location": "MagicCon",
    "effect": "When you planeswalk here and at the beginning of your upkeep, create a Black Lotus artifact token.",
    "chaosEffect": "each player draws a card for each artifact token they control.",
    "imageUrl": null
  },
  {
    "id": "bloodhill-bastion",
    "name": "Bloodhill Bastion",
    "type": "universe",
    "location": "Equilor",
    "effect": "Whenever a creature enters, it gains double strike and haste until end of turn.",
    "chaosEffect": "exile target nontoken creature you control, then return it to the battlefield under your control.",
    "imageUrl": null
  },
  {
    "id": "bowie-base-one",
    "name": "Bowie Base One",
    "type": "doctorwho",
    "location": "Mars",
    "effect": "At the beginning of your end step, goad target creature controlled by the player to your left.",
    "chaosEffect": "target creature gains islandwalk until end of turn.",
    "imageUrl": null
  },
  {
    "id": "celestine-reef",
    "name": "Celestine Reef",
    "type": "universe",
    "location": "Luvion",
    "effect": "Creatures without flying or islandwalk can\u00e2\u0080\u0099t attack.",
    "chaosEffect": "until a player planeswalks, you can\u00e2\u0080\u0099t lose the game and your opponents can\u00e2\u0080\u0099t win the game.",
    "imageUrl": null
  },
  {
    "id": "city-hall",
    "name": "City Hall",
    "type": "special",
    "location": "Chicago",
    "effect": "When you planeswalk here, you become the Monarch.",
    "chaosEffect": "each player may create two tapped treasure tokens. Each player who does can\u0092t attack you on their next turn.",
    "imageUrl": null
  },
  {
    "id": "city-of-the-daleks",
    "name": "City of the Daleks",
    "type": "doctorwho",
    "location": "Skaro",
    "effect": "Whenever you attack, target opponent loses X life, where X is the number of artifacts you control.",
    "chaosEffect": "for each opponent, you create a 3/3 black Dalek artifact creature token with menace that attacks that opponent this turn if able. Those tokens gain haste. Sacrifice them at the beginning of the next end step.",
    "imageUrl": null
  },
  {
    "id": "cliffside-market",
    "name": "Cliffside Market",
    "type": "universe",
    "location": "Mercadia",
    "effect": "When you planeswalk to Cliffside Market and at the beginning of your upkeep, you may exchange life totals with target player.",
    "chaosEffect": "exchange control of two target permanents that share a card type.",
    "imageUrl": null
  },
  {
    "id": "coal-hill-school",
    "name": "Coal Hill School",
    "type": "doctorwho",
    "location": "Earth",
    "effect": "Whenever a player casts a historic spell, that player draws a card.",
    "chaosEffect": "return target historic card from your graveyard to your hand.",
    "imageUrl": null
  },
  {
    "id": "dalek-intensive-care",
    "name": "Dalek Intensive Care",
    "type": "doctorwho",
    "location": "The Dalek Asylum",
    "effect": "When you planeswalk to Dalek Intensive Care and at the beginning of your upkeep, exile a non-Dalek creature you control. If you do, create a 3/3 black Dalek artifact creature token with menace. It gains haste until end of turn.",
    "chaosEffect": "target Dalek you control deals damage equal to its power to target creature you don\u00e2\u0080\u0099t control.",
    "imageUrl": null
  },
  {
    "id": "edge-of-malacol",
    "name": "Edge of Malacol",
    "type": "universe",
    "location": "Belenon",
    "effect": "If a creature you control would untap during your untap step, put two +1/+1 counters on it instead.",
    "chaosEffect": "untap each creature you control.",
    "imageUrl": null
  },
  {
    "id": "eloren-wilds",
    "name": "Eloren Wilds",
    "type": "universe",
    "location": "Shandalar",
    "effect": "Whenever a player taps a permanent for mana, that player adds one mana of any type that permanent produced.",
    "chaosEffect": "target player can\u00e2\u0080\u0099t cast spells until a player planeswalks.",
    "imageUrl": null
  },
  {
    "id": "enigma-ridges",
    "name": "Enigma Ridges",
    "type": "universe",
    "location": "Echoir",
    "effect": "When you planeswalk to Enigma Ridges, each player who controls fewer lands than the player who controls the most lands searches their library for a number of basic land cards less than or equal to the difference, reveals them, puts them into their hand, then shuffles.",
    "chaosEffect": "draw a card, then you may put a land card from your hand onto the battlefield.",
    "imageUrl": null
  },
  {
    "id": "esper",
    "name": "Esper",
    "type": "universe",
    "location": "Alara",
    "effect": "Artifact spells cost {1} less to cast.",
    "chaosEffect": "creatures you control that are white, blue, and/or black become artifacts in addition to their other types until end of turn. Then each artifact creature you control gains vigilance, menace, and lifelink until end of turn.",
    "imageUrl": null
  },
  {
    "id": "event-horizon",
    "name": "Event Horizon",
    "type": "special",
    "location": "Blind Eternities",
    "effect": "Nonbasic lands are Wastes. Whenever you tap a permanent for {C}, add an additional {C}.",
    "chaosEffect": "choose one - \u00e2\u0080\u00a2 Draw four cards. \u00e2\u0080\u00a2 Destroy target permanent. \u00e2\u0080\u00a2 You may return target creature card from your graveyard to the battlefield.",
    "imageUrl": null
  },
  {
    "id": "feeding-grounds",
    "name": "Feeding Grounds",
    "type": "universe",
    "location": "Muraganda",
    "effect": "Red spells cost {1} less to cast. Green spells cost {1} less to cast.",
    "chaosEffect": "put X +1/+1 counters on target creature, where X is that creature\u00e2\u0080\u0099s mana value.",
    "imageUrl": null
  },
  {
    "id": "fields-of-summer",
    "name": "Fields of Summer",
    "type": "universe",
    "location": "Moag",
    "effect": "Whenever a player casts a spell, that player may gain 2 life.",
    "chaosEffect": "you may gain 10 life.",
    "imageUrl": null
  },
  {
    "id": "furnace-layer",
    "name": "Furnace Layer",
    "type": "universe",
    "location": "New Phyrexia",
    "effect": "When you planeswalk to Furnace Layer and at the beginning of your upkeep, select target player at random. That player discards a card. If that player discards a land card this way, they lose 3 life.",
    "chaosEffect": "you may destroy target nonland permanent.",
    "imageUrl": null
  },
  {
    "id": "gardens-of-tranquil-repose",
    "name": "Gardens of Tranquil Repose",
    "type": "doctorwho",
    "location": "Necros",
    "effect": "Suspended Animation - Whenever a creature dies, exile it. Its controller scries 1.",
    "chaosEffect": "create X 3/3 black Dalek artifact creature tokens with menace, where X is one plus the number of cards exiled with Gardens of Tranquil Repose.",
    "imageUrl": null
  },
  {
    "id": "gavony",
    "name": "Gavony",
    "type": "universe",
    "location": "Innistrad",
    "effect": "All creatures have vigilance.",
    "chaosEffect": "creatures you control gain indestructible until end of turn.",
    "imageUrl": null
  },
  {
    "id": "ghirapur",
    "name": "Ghirapur",
    "type": "universe",
    "location": "Kaladesh",
    "effect": "At the beginning of combat on your turn, until end of turn, each noncreature, non-Vehicle artifact you control becomes a 5/3 Vehicle in addition to its other types and gains trample, haste, and crew 2.",
    "chaosEffect": "return target noncreature artifact card from your graveyard to your hand.",
    "imageUrl": null
  },
  {
    "id": "glen-elendra",
    "name": "Glen Elendra",
    "type": "universe",
    "location": "Lorwyn",
    "effect": "At end of combat, you may exchange control of target creature you control that dealt combat damage to a player this combat and target creature that player controls.",
    "chaosEffect": "gain control of target creature you own.",
    "imageUrl": null
  },
  {
    "id": "glimmervoid-basin",
    "name": "Glimmervoid Basin",
    "type": "universe",
    "location": "Mirrodin",
    "effect": "Whenever a player casts an instant or sorcery spell with a single target, that player copies that spell for each other spell, permanent, card not on the battlefield, and/or player the spell could target. Each copy targets a different one of them.",
    "chaosEffect": "choose target creature. Each player except that creature\u00e2\u0080\u0099s controller creates a token that\u00e2\u0080\u0099s a copy of that creature.",
    "imageUrl": null
  },
  {
    "id": "goldmeadow",
    "name": "Goldmeadow",
    "type": "universe",
    "location": "Lorwyn",
    "effect": "Whenever a land enters, that land\u00e2\u0080\u0099s controller creates three 0/1 white Goat creature tokens.",
    "chaosEffect": "create a 0/1 white Goat creature token.",
    "imageUrl": null
  },
  {
    "id": "grand-ossuary",
    "name": "Grand Ossuary",
    "type": "universe",
    "location": "Ravnica",
    "effect": "Whenever a creature dies, its controller distributes a number of +1/+1 counters equal to its power among any number of target creatures they control.",
    "chaosEffect": "each player exiles all creatures they control and creates X 1/1 green Saproling creature tokens, where X is the total power of the creatures they exiled this way. Then planeswalk.",
    "imageUrl": null
  },
  {
    "id": "grixis",
    "name": "Grixis",
    "type": "universe",
    "location": "Alara",
    "effect": "Blue, black, and/or red creature cards in your graveyard have unearth. The unearth cost is equal to the card\u00e2\u0080\u0099s mana cost.",
    "chaosEffect": "put target creature card from a graveyard onto the battlefield under your control.",
    "imageUrl": null
  },
  {
    "id": "grove-of-the-dreampods",
    "name": "Grove of the Dreampods",
    "type": "universe",
    "location": "Fabacin",
    "effect": "When you planeswalk to Grove of the Dreampods and at the beginning of your upkeep, reveal cards from the top of your library until you reveal a creature card. Put that card onto the battlefield and the rest on the bottom of your library in a random order.",
    "chaosEffect": "return target creature card from your graveyard to the battlefield.",
    "imageUrl": null
  },
  {
    "id": "hedron-fields-of-agadeem",
    "name": "Hedron Fields of Agadeem",
    "type": "universe",
    "location": "Zendikar",
    "effect": "Creatures with power 7 or greater can\u00e2\u0080\u0099t attack or block.",
    "chaosEffect": "create a 7/7 colorless Eldrazi creature token with annihilator 1.",
    "imageUrl": null
  },
  {
    "id": "horizon-boughs",
    "name": "Horizon Boughs",
    "type": "universe",
    "location": "Pyrulea",
    "effect": "All permanents untap during each player\u00e2\u0080\u0099s untap step.",
    "chaosEffect": "you may search your library for up to three basic land cards, put them onto the battlefield tapped, then shuffle.",
    "imageUrl": null
  },
  {
    "id": "hotel-of-fears",
    "name": "Hotel of Fears",
    "type": "doctorwho",
    "location": "Spacecraft",
    "effect": "At the beginning of your upkeep, exile the top card of your library. You lose life equal to its mana value. You may play that card this turn. Praise Him -",
    "chaosEffect": "choose a color. Put X +1/+1 counters on target creature you control, where X is your devotion to that color. Then sacrifice another creature.",
    "imageUrl": null
  },
  {
    "id": "immersturm",
    "name": "Immersturm",
    "type": "universe",
    "location": "Valla",
    "effect": "Whenever a creature enters, that creature\u00e2\u0080\u0099s controller may have it deal damage equal to its power to any target of their choice.",
    "chaosEffect": "exile target creature, then return it to the battlefield under its owner\u00e2\u0080\u0099s control.",
    "imageUrl": null
  },
  {
    "id": "inys-haen",
    "name": "Inys Haen",
    "type": "universe",
    "location": "Cridhe",
    "effect": "When you planeswalk to Inys Haen and at the beginning of your upkeep, mill three cards. When you planeswalk away from Inys Haen, each player returns all land cards from their graveyard to the battlefield tapped.",
    "chaosEffect": "return target nonland card from your graveyard to your hand.",
    "imageUrl": null
  },
  {
    "id": "isle-of-vesuva",
    "name": "Isle of Vesuva",
    "type": "universe",
    "location": "Dominaria",
    "effect": "Whenever a nontoken creature enters, its controller creates a token that\u00e2\u0080\u0099s a copy of that creature.",
    "chaosEffect": "destroy target creature and all other creatures with the same name as that creature. Zoltan",
    "imageUrl": null
  },
  {
    "id": "izzet-steam-maze",
    "name": "Izzet Steam Maze",
    "type": "universe",
    "location": "Ravnica",
    "effect": "Whenever a player casts an instant or sorcery spell, that player copies it. The player may choose new targets for the copy.",
    "chaosEffect": "instant and sorcery spells you cast this turn cost {3} less to cast.",
    "imageUrl": null
  },
  {
    "id": "jund",
    "name": "Jund",
    "type": "universe",
    "location": "Alara",
    "effect": "Whenever a player casts a creature spell that\u00e2\u0080\u0099s black, red, or green, it gains devour 5.",
    "chaosEffect": "create two 1/1 red Goblin creature tokens.",
    "imageUrl": null
  },
  {
    "id": "kerblam-warehouse",
    "name": "Kerblam! Warehouse",
    "type": "doctorwho",
    "location": "Kandoka",
    "effect": "Whenever one or more creatures you control deal combat damage to a player, create a Treasure token.",
    "chaosEffect": "until your next turn, noncreature artifacts you control gain \u00e2\u0080\u009c{T}, Sacrifice this artifact: Flip a coin. If you win the flip, this artifact deals 3 damage to any target.\u00e2\u0080\u009d",
    "imageUrl": null
  },
  {
    "id": "kessig",
    "name": "Kessig",
    "type": "universe",
    "location": "Innistrad",
    "effect": "Prevent all combat damage that would be dealt by non-Werewolf creatures.",
    "chaosEffect": "each creature you control gets +2/+2, gains trample, and becomes a Werewolf in addition to its other types until end of turn.",
    "imageUrl": null
  },
  {
    "id": "ketria",
    "name": "Ketria",
    "type": "universe",
    "location": "Ikoria",
    "effect": "When you planeswalk to Ketria and at the beginning of your upkeep, put your choice of a vigilance, menace, or trample counter on target creature you control.",
    "chaosEffect": "exile cards from the top of your library until you exile a nonland permanent card. Put that card onto the battlefield or into your hand.",
    "imageUrl": null
  },
  {
    "id": "kharasha-foothills",
    "name": "Kharasha Foothills",
    "type": "universe",
    "location": "Mongseng",
    "effect": "Whenever a creature you control attacks a player, for each other opponent, you may create a token that\u00e2\u0080\u0099s a copy of that creature, tapped and attacking that opponent. Exile those tokens at the beginning of the next end step.",
    "chaosEffect": "you may sacrifice any number of creatures. If you do, Kharasha Foothills deals that much damage to target creature.",
    "imageUrl": null
  },
  {
    "id": "kilnspire-district",
    "name": "Kilnspire District",
    "type": "universe",
    "location": "Ravnica",
    "effect": "When you planeswalk to Kilnspire District and at the beginning of your first main phase, put a charge counter on Kilnspire District, then add {R} for each charge counter on it.",
    "chaosEffect": "you may pay {X}. If you do, Kilnspire District deals X damage to any target.",
    "imageUrl": null
  },
  {
    "id": "krosa",
    "name": "Krosa",
    "type": "universe",
    "location": "Dominaria",
    "effect": "All creatures get +2/+2.",
    "chaosEffect": "you may add {W}{U}{B}{R}{G}.",
    "imageUrl": null
  },
  {
    "id": "lair-of-the-ashen-idol",
    "name": "Lair of the Ashen Idol",
    "type": "universe",
    "location": "Azgol",
    "effect": "At the beginning of your upkeep, sacrifice a creature. If you can\u00e2\u0080\u0099t, planeswalk.",
    "chaosEffect": "any number of target players each create a 2/2 black Zombie creature token.",
    "imageUrl": null
  },
  {
    "id": "lake-silencio",
    "name": "Lake Silencio",
    "type": "doctorwho",
    "location": "Earth",
    "effect": "Still Point in Time - All spells have split second.",
    "chaosEffect": "Lake Silencio deals 6 damage to target creature an opponent controls. If a creature dealt damage this way would die this turn, exile it instead.",
    "imageUrl": null
  },
  {
    "id": "lethe-lake",
    "name": "Lethe Lake",
    "type": "universe",
    "location": "Arkhos",
    "effect": "At the beginning of your upkeep, mill ten cards.",
    "chaosEffect": "target player mills ten cards.",
    "imageUrl": null
  },
  {
    "id": "littjara",
    "name": "Littjara",
    "type": "universe",
    "location": "Kaldheim",
    "effect": "When you planeswalk to Littjara and at the beginning of your upkeep, create a 2/2 blue Shapeshifter creature token with changeling.",
    "chaosEffect": "choose a creature type. Put a +1/+1 counter on each creature you control of that type.",
    "imageUrl": null
  },
  {
    "id": "llanowar",
    "name": "Llanowar",
    "type": "universe",
    "location": "Dominaria",
    "effect": "All creatures have \u00e2\u0080\u009c{T}: Add {G}{G}.\u00e2\u0080\u009d",
    "chaosEffect": "untap all creatures you control.",
    "imageUrl": null
  },
  {
    "id": "megaflora-jungle",
    "name": "Megaflora Jungle",
    "type": "universe",
    "location": "Gargantikar",
    "effect": "Each creature with mana value 2 or less gets +2/+2.",
    "chaosEffect": "create a 1/1 green Insect creature token with flying named Butterfly.",
    "imageUrl": null
  },
  {
    "id": "minamo",
    "name": "Minamo",
    "type": "universe",
    "location": "Kamigawa",
    "effect": "Whenever a player casts a spell, that player may draw a card.",
    "chaosEffect": "each player may return a blue card from their graveyard to their hand.",
    "imageUrl": null
  },
  {
    "id": "mirrored-depths",
    "name": "Mirrored Depths",
    "type": "universe",
    "location": "Karsus",
    "effect": "Whenever a player casts a spell, that player flips a coin. If the player loses the flip, counter that spell.",
    "chaosEffect": "target player reveals the top card of their library. If it\u00e2\u0080\u0099s a nonland card, you may cast it without paying its mana cost.",
    "imageUrl": null
  },
  {
    "id": "mondassian-colony-ship",
    "name": "Mondassian Colony Ship",
    "type": "doctorwho",
    "location": "Spacecraft",
    "effect": "Whenever a creature attacks, it gets +1/+1 until end of turn for each other creature its controller controls that shares a creature type with it.",
    "chaosEffect": "turn target creature face down. It becomes a 2/2 Cyberman artifact creature.",
    "imageUrl": null
  },
  {
    "id": "mount-keralia",
    "name": "Mount Keralia",
    "type": "universe",
    "location": "Regatha",
    "effect": "At the beginning of your end step, put a pressure counter on Mount Keralia. When you planeswalk away from Mount Keralia, it deals damage equal to the number of pressure counters on it to each creature and each planeswalker.",
    "chaosEffect": "prevent all damage that planes named Mount Keralia would deal this game to permanents you control.",
    "imageUrl": null
  },
  {
    "id": "murasa",
    "name": "Murasa",
    "type": "universe",
    "location": "Zendikar",
    "effect": "Whenever a nontoken creature enters, its controller may search their library for a basic land card, put it onto the battlefield tapped, then shuffle.",
    "chaosEffect": "target land becomes a 4/4 creature that\u00e2\u0080\u0099s still a land.",
    "imageUrl": null
  },
  {
    "id": "naar-isle",
    "name": "Naar Isle",
    "type": "universe",
    "location": "Wildfire",
    "effect": "At the beginning of your upkeep, put a flame counter on Naar Isle, then Naar Isle deals damage to you equal to the number of flame counters on it.",
    "chaosEffect": "Naar Isle deals 3 damage to target player or planeswalker.",
    "imageUrl": null
  },
  {
    "id": "naktamun",
    "name": "Naktamun",
    "type": "universe",
    "location": "Amonkhet",
    "effect": "Each creature card in your graveyard has embalm. Its embalm cost is equal to its mana cost.",
    "chaosEffect": "you may discard a card. If you do, draw a card.",
    "imageUrl": null
  },
  {
    "id": "naya",
    "name": "Naya",
    "type": "universe",
    "location": "Alara",
    "effect": "You may play any number of lands on each of your turns.",
    "chaosEffect": "target red, green, or white creature you control gets +1/+1 until end of turn for each land you control. Zoltan",
    "imageUrl": null
  },
  {
    "id": "nephalia",
    "name": "Nephalia",
    "type": "universe",
    "location": "Innistrad",
    "effect": "At the beginning of your end step, mill seven cards. Then return a card at random from your graveyard to your hand.",
    "chaosEffect": "return target card from your graveyard to your hand.",
    "imageUrl": null
  },
  {
    "id": "new-argive",
    "name": "New Argive",
    "type": "universe",
    "location": "Dominaria",
    "effect": "Whenever a historic creature you control attacks, it gets +2/+2 until end of turn.",
    "chaosEffect": "reveal cards from the top of your library until you reveal a historic card. Put that card into your hand and the rest on the bottom of your library in a random order.",
    "imageUrl": null
  },
  {
    "id": "new-new-york",
    "name": "New New York",
    "type": "doctorwho",
    "location": "New Earth",
    "effect": "At the beginning of combat on your turn, until end of turn, noncreature artifacts you control become 3/3 Vehicles in addition to their other types and gain flying, haste, and crew 1.",
    "chaosEffect": "create a Treasure token and a 2/2 white Alien creature token.",
    "imageUrl": null
  },
  {
    "id": "norn-s-dominion",
    "name": "Norn's Dominion",
    "type": "universe",
    "location": "New Phyrexia",
    "effect": "When you planeswalk away from Norn\u00e2\u0080\u0099s Dominion, destroy each nonland permanent without a fate counter on it, then remove all fate counters from all permanents.",
    "chaosEffect": "you may put a fate counter on target permanent.",
    "imageUrl": null
  },
  {
    "id": "norn-s-seedcore",
    "name": "Norn's Seedcore",
    "type": "universe",
    "location": "New Phyrexia",
    "effect": "When you planeswalk to Norn\u00e2\u0080\u0099s Seedcore, chaos ensues.",
    "chaosEffect": "reveal cards from the top of your planar deck until you reveal a plane card. Planeswalk to it, except don\u00e2\u0080\u0099t planeswalk away from any plane. Put the rest of the revealed cards on the bottom of your planar deck in any order.",
    "imageUrl": null
  },
  {
    "id": "north-pole-research-base",
    "name": "North Pole Research Base",
    "type": "doctorwho",
    "location": "Earth",
    "effect": "At the beginning of your upkeep, target opponent draws a card and creates a Treasure token.",
    "chaosEffect": "create a 2/2 white Alien creature token. When you do, tap target nontoken creature an opponent controls. Put a stun counter on it.",
    "imageUrl": null
  },
  {
    "id": "nyx",
    "name": "Nyx",
    "type": "universe",
    "location": "Theros",
    "effect": "Nontoken creatures are enchantments in addition to their other types. Constellation - Whenever an enchantment you control enters, you gain 1 life.",
    "chaosEffect": "choose a color. Add an amount of mana of that color equal to your devotion to that color.",
    "imageUrl": null
  },
  {
    "id": "onakke-catacomb",
    "name": "Onakke Catacomb",
    "type": "universe",
    "location": "Shandalar",
    "effect": "All creatures are black and have deathtouch.",
    "chaosEffect": "creatures you control get +1/+0 and gain first strike until end of turn.",
    "imageUrl": null
  },
  {
    "id": "ood-sphere",
    "name": "Ood Sphere",
    "type": "doctorwho",
    "location": "Horsehead Nebula",
    "effect": "Song of the Ood - Noncreature spells have convoke. Red-Eye -",
    "chaosEffect": "for each opponent, goad up to one target creature that opponent controls. Until your next turn, those creatures can\u00e2\u0080\u0099t become tapped unless they\u00e2\u0080\u0099re being declared as attackers.",
    "imageUrl": null
  },
  {
    "id": "orochi-colony",
    "name": "Orochi Colony",
    "type": "universe",
    "location": "Kamigawa",
    "effect": "Whenever a creature you control deals combat damage to a player, you may search your library for a basic land card, put it onto the battlefield tapped, then shuffle.",
    "chaosEffect": "target creature can\u00e2\u0080\u0099t be blocked this turn.",
    "imageUrl": null
  },
  {
    "id": "orzhova",
    "name": "Orzhova",
    "type": "universe",
    "location": "Ravnica",
    "effect": "When you planeswalk away from Orzhova, each player returns all creature cards from their graveyard to the battlefield.",
    "chaosEffect": "for each opponent, exile up to one target creature card from that player\u00e2\u0080\u0099s graveyard.",
    "imageUrl": null
  },
  {
    "id": "otaria",
    "name": "Otaria",
    "type": "universe",
    "location": "Dominaria",
    "effect": "Instant and sorcery cards in graveyards have flashback. The flashback cost is equal to the card\u00e2\u0080\u0099s mana cost.",
    "chaosEffect": "take an extra turn after this one.",
    "imageUrl": null
  },
  {
    "id": "paliano",
    "name": "Paliano",
    "type": "universe",
    "location": "Fiora",
    "effect": "When one or more creatures you control deal combat damage to a player, if there is no monarch, you become the monarch.",
    "chaosEffect": "create a 1/1 black Assassin creature token with deathtouch and haste.",
    "imageUrl": null
  },
  {
    "id": "panopticon",
    "name": "Panopticon",
    "type": "universe",
    "location": "Mirrodin",
    "effect": "When you planeswalk to Panopticon, draw a card. At the beginning of your draw step, draw an additional card.",
    "chaosEffect": "draw a card.",
    "imageUrl": null
  },
  {
    "id": "pin-collector-s-booth",
    "name": "Pin Collector's Booth",
    "type": "special",
    "location": "MagicCon",
    "effect": "Whenever you attack, create a Pin token attached to target attacking creature you control. It\u00e2\u0080\u0099s an enchantment Pin Aura with \u00e2\u0080\u009cEnchanted creature gets +1/+1.\u00e2\u0080\u009d",
    "chaosEffect": "each opponent loses X life, where X is the total number of pins attached to you and creatures you control.",
    "imageUrl": null
  },
  {
    "id": "pompeii",
    "name": "Pompeii",
    "type": "doctorwho",
    "location": "Earth",
    "effect": "When you planeswalk to Pompeii and at the beginning of your upkeep, put an eruption counter on it. Whenever you roll a blank on the planar die, scry 2. Then put an eruption counter on Pompeii. ",
    "chaosEffect": "\u00a0Pompeii deals damage to each creature and each player equal to the number of eruption counters on Pompeii. Each player sacrifices a land of their choice. Then planeswalk.",
    "imageUrl": null
  },
  {
    "id": "pools-of-becoming",
    "name": "Pools of Becoming",
    "type": "universe",
    "location": "Bolas's Meditation Realm",
    "effect": "At the beginning of your end step, put the cards in your hand on the bottom of your library in any order, then draw that many cards.",
    "chaosEffect": "reveal the top three cards of your planar deck. Each of the revealed cards\u00e2\u0080\u0099 chaos abilities triggers. Then put the revealed cards on the bottom of your planar deck in any order.",
    "imageUrl": null
  },
  {
    "id": "prahv",
    "name": "Prahv",
    "type": "universe",
    "location": "Ravnica",
    "effect": "If you cast a spell this turn, you can\u00e2\u0080\u0099t attack with creatures. If you attacked with creatures this turn, you can\u00e2\u0080\u0099t cast spells.",
    "chaosEffect": "you gain life equal to the number of cards in your hand.",
    "imageUrl": null
  },
  {
    "id": "prime-minister-s-cabinet-room",
    "name": "Prime Minister's Cabinet Room",
    "type": "doctorwho",
    "location": "Earth",
    "effect": "At the beginning of combat on your turn, up to one target creature you control becomes a copy of target creature an opponent controls. Will of the council -",
    "chaosEffect": "starting with you, each player votes for a creature you don\u00e2\u0080\u0099t control. Exile each creature with the most votes or tied for most votes.",
    "imageUrl": null
  },
  {
    "id": "quicksilver-sea",
    "name": "Quicksilver Sea",
    "type": "universe",
    "location": "Mirrodin",
    "effect": "When you planeswalk to Quicksilver Sea and at the beginning of your upkeep, scry 4.",
    "chaosEffect": "reveal the top card of your library. You may play it without paying its mana cost.",
    "imageUrl": null
  },
  {
    "id": "raven-s-run",
    "name": "Raven's Run",
    "type": "universe",
    "location": "Shadowmoor",
    "effect": "All creatures have wither.",
    "chaosEffect": "put a -1/-1 counter on target creature, two -1/-1 counters on another target creature, and three -1/-1 counters on a third target creature.",
    "imageUrl": null
  },
  {
    "id": "riptide-island",
    "name": "Riptide Island",
    "type": "universe",
    "location": "Dominaria",
    "effect": "When you planeswalk to Riptide Island and at the beginning of your upkeep, create two 1/1 colorless Sliver creature tokens.",
    "chaosEffect": "Slivers you control gain haste and get +X/+X until end of turn, where X is the number of Slivers you control.",
    "imageUrl": null
  },
  {
    "id": "sanctum-of-serra",
    "name": "Sanctum of Serra",
    "type": "universe",
    "location": "Serra\u00e2\u0080\u0099s Realm",
    "effect": "When you planeswalk away from Sanctum of Serra, destroy all nonland permanents.",
    "chaosEffect": "you may have your life total become 20.",
    "imageUrl": null
  },
  {
    "id": "sea-of-sand",
    "name": "Sea of Sand",
    "type": "universe",
    "location": "Rabiah",
    "effect": "Players reveal each card they draw. Whenever a player draws a land card, that player gains 3 life. Whenever a player draws a nonland card, that player loses 3 life.",
    "chaosEffect": "put target permanent on top of its owner\u00e2\u0080\u0099s library.",
    "imageUrl": null
  },
  {
    "id": "selesnya-loft-gardens",
    "name": "Selesnya Loft Gardens",
    "type": "universe",
    "location": "Ravnica",
    "effect": "If an effect would create one or more tokens, it creates twice that many of those tokens instead. If an effect would put one or more counters on a permanent, it puts twice that many of those counters on that permanent instead.",
    "chaosEffect": "until end of turn, whenever you tap a land for mana, add one mana of any type that land produced.",
    "imageUrl": null
  },
  {
    "id": "shiv",
    "name": "Shiv",
    "type": "universe",
    "location": "Dominaria",
    "effect": "All creatures have \u00e2\u0080\u009c{R}: This creature gets +1/+0 until end of turn.\u00e2\u0080\u009d",
    "chaosEffect": "create a 5/5 red Dragon creature token with flying.",
    "imageUrl": null
  },
  {
    "id": "shrinking-plane",
    "name": "Shrinking Plane",
    "type": "special",
    "location": "Foldaria",
    "effect": "When you planeswalk here and at the beginning of your upkeep, fold this plane in half. Draw cards equal to the number of times it\u00e2\u0080\u0099s been folded. If you can\u00e2\u0080\u0099t fold it, planeswalk.",
    "chaosEffect": "Completely unfold this plane. Each opponent discards two cards.",
    "imageUrl": null
  },
  {
    "id": "shy-town",
    "name": "Shy Town",
    "type": "special",
    "location": "Chicago",
    "effect": "Whenever you planeswalk here and whenever chaos ensues, for each opponent, put a shy counter on up to one target creature they control. That creature becomes a Coward in addition to its other types. At the beginning of your upkeep, create a 2/2 red Warrior creature token with haste and \u00e2\u0080\u009cCowards can\u00e2\u0080\u0099t block Warriors.\u00e2\u0080\u009d",
    "chaosEffect": NaN,
    "imageUrl": null
  },
  {
    "id": "singing-towers-of-darillium",
    "name": "Singing Towers of Darillium",
    "type": "doctorwho",
    "location": "Darillium",
    "effect": "Each nonland card in your hand without foretell has foretell. Its foretell cost is equal to its mana cost reduced by {2}.",
    "chaosEffect": "you may cast a foretold card you own from exile without paying its mana cost this turn.",
    "imageUrl": null
  },
  {
    "id": "skybreen",
    "name": "Skybreen",
    "type": "universe",
    "location": "Kaldheim",
    "effect": "Players play with the top card of their libraries revealed. Spells that share a card type with the top card of a library can\u00e2\u0080\u0099t be cast.",
    "chaosEffect": "target player loses life equal to the number of cards in their hand.",
    "imageUrl": null
  },
  {
    "id": "sky-deck",
    "name": "Sky Deck",
    "type": "special",
    "location": "Chicago",
    "effect": "Whenever you planeswalk here, at the beginning of your upkeep, or whenever chaos ensues, put a glass counter on up to one target nonland permanent. When you planeswalk away from here, destroy all permanents with glass counters on them.",
    "chaosEffect": NaN,
    "imageUrl": null
  },
  {
    "id": "sokenzan",
    "name": "Sokenzan",
    "type": "universe",
    "location": "Kamigawa",
    "effect": "All creatures get +1/+1 and have haste.",
    "chaosEffect": "untap all creatures that attacked this turn. If it\u00e2\u0080\u0099s a main phase, there is an additional combat phase after this phase, followed by an additional main phase. Brian Sn\u00c3\u00b5ddy",
    "imageUrl": null
  },
  {
    "id": "spectrox-mines",
    "name": "Spectrox Mines",
    "type": "doctorwho",
    "location": "Androzani Minor",
    "effect": "When you planeswalk to Spectrox Mines and at the beginning of your upkeep, you lose 3 life and create a Treasure token.",
    "chaosEffect": "create a Food token and a 2/2 black Human Rogue creature token.",
    "imageUrl": null
  },
  {
    "id": "stairs-to-infinity",
    "name": "Stairs to Infinity",
    "type": "universe",
    "location": "Xerex",
    "effect": "Players have no maximum hand size. Whenever you roll the planar die, draw a card.",
    "chaosEffect": "reveal the top card of your planar deck. You may put it on the bottom of your planar deck.",
    "imageUrl": null
  },
  {
    "id": "stensia",
    "name": "Stensia",
    "type": "universe",
    "location": "Innistrad",
    "effect": "Whenever a creature deals damage to one or more players for the first time each turn, put a +1/+1 counter on it.",
    "chaosEffect": "each creature you control gains \u00e2\u0080\u009c{T}: This creature deals 1 damage to target player or planeswalker\u00e2\u0080\u009d until end of turn.",
    "imageUrl": null
  },
  {
    "id": "stormcage-containment-facility",
    "name": "Stormcage Containment Facility",
    "type": "doctorwho",
    "location": "Unknown Planet",
    "effect": "Each creature card in your graveyard has escape. The escape cost is equal to the card\u00e2\u0080\u0099s mana cost plus exile three other cards from your graveyard.",
    "chaosEffect": "detain target creature an opponent controls.",
    "imageUrl": null
  },
  {
    "id": "strixhaven",
    "name": "Strixhaven",
    "type": "universe",
    "location": "Arcavios",
    "effect": "Instant and sorcery spells players cast have demonstrate.",
    "chaosEffect": "return up to one target instant or sorcery card from a graveyard to its owner\u00e2\u0080\u0099s hand.",
    "imageUrl": null
  },
  {
    "id": "stronghold-furnace",
    "name": "Stronghold Furnace",
    "type": "universe",
    "location": "Rath",
    "effect": "If a source would deal damage to a permanent or player, it deals double that damage instead.",
    "chaosEffect": "Stronghold Furnace deals 1 damage to any target.",
    "imageUrl": null
  },
  {
    "id": "stroopwafel-cafe",
    "name": "Stroopwafel Cafe",
    "type": "special",
    "location": "Amsterdam",
    "effect": "Players may look at the top card of their library at any time and may play cards from the top of their library. The top card of each player\u00e2\u0080\u0099s library is a Food artifact.",
    "chaosEffect": "You may sacrifice a Food. If you do, draw a card, gain three life and each opponent loses 3 life.",
    "imageUrl": null
  },
  {
    "id": "takenuma",
    "name": "Takenuma",
    "type": "universe",
    "location": "Kamigawa",
    "effect": "Whenever a creature leaves the battlefield, its controller draws a card.",
    "chaosEffect": "return target creature you control to its owner\u00e2\u0080\u0099s hand.",
    "imageUrl": null
  },
  {
    "id": "talon-gates",
    "name": "Talon Gates",
    "type": "universe",
    "location": "Dominaria",
    "effect": "Any time you could cast a sorcery, you may exile a nonland card from your hand with X time counters on it, where X is its mana value. If the exiled card doesn\u00e2\u0080\u0099t have suspend, it gains suspend.",
    "chaosEffect": "remove two time counters from each suspended card you own.",
    "imageUrl": null
  },
  {
    "id": "tardis-bay",
    "name": "TARDIS Bay",
    "type": "doctorwho",
    "location": "Gallifrey",
    "effect": "The first spell you cast during each of your turns with mana value 2 or greater has cascade. ",
    "chaosEffect": "gain control of target artifact. Then planeswalk.",
    "imageUrl": null
  },
  {
    "id": "tazeem",
    "name": "Tazeem",
    "type": "universe",
    "location": "Zendikar",
    "effect": "Creatures can\u00e2\u0080\u0099t block.",
    "chaosEffect": "draw a card for each land you control.",
    "imageUrl": null
  },
  {
    "id": "tember-city",
    "name": "Tember City",
    "type": "universe",
    "location": "Kinshala",
    "effect": "Whenever a player taps a land for mana, Tember City deals 1 damage to that player.",
    "chaosEffect": "each other player sacrifices a nonland permanent of their choice.",
    "imageUrl": null
  },
  {
    "id": "temple-of-atropos",
    "name": "Temple of Atropos",
    "type": "doctorwho",
    "location": "Time",
    "effect": "At the beginning of each of your postcombat main phases, there is an additional beginning phase after this phase. ",
    "chaosEffect": "reverse the game\u0092s turn order. Then planeswalk.\u00a0(For example, if play had proceeded clockwise around the table, it now goes counterclockwise.)",
    "imageUrl": null
  },
  {
    "id": "ten-wizards-mountain",
    "name": "Ten Wizards Mountain",
    "type": "universe",
    "location": "Shenmeng",
    "effect": "Whenever you roll the planar die, put a +1/+1 counter on up to one target creature.",
    "chaosEffect": "creatures you control gain flying until end of turn.",
    "imageUrl": null
  },
  {
    "id": "the-aether-flues",
    "name": "The Aether Flues",
    "type": "universe",
    "location": "Iquatana",
    "effect": "When you planeswalk to The Aether Flues and at the beginning of your upkeep, you may sacrifice a creature. If you do, reveal cards from the top of your library until you reveal a creature card, put that card onto the battlefield, then shuffle all other cards revealed this way into your library.",
    "chaosEffect": "you may put a creature card from your hand onto the battlefield.",
    "imageUrl": null
  },
  {
    "id": "the-bean",
    "name": "The Bean",
    "type": "special",
    "location": "Chicago",
    "effect": "Whenever you planeswalk here, each player chooses a creature they control and creates a token copy of it. It\u00e2\u0080\u0099s a reflection in addition to its other types, and its power and toughness are inverted.",
    "chaosEffect": "\u00a0create a token that\u0092s a copy of a creature you control. It\u0092s a reflection in addition to its other types, and its power and toughness are inverted.",
    "imageUrl": null
  },
  {
    "id": "the-caldaia",
    "name": "The Caldaia",
    "type": "universe",
    "location": "Capenna",
    "effect": "Creature spells you cast from your hand have blitz {3}.",
    "chaosEffect": "return target creature card from your graveyard to your hand.",
    "imageUrl": null
  },
  {
    "id": "the-cave-of-skulls",
    "name": "The Cave of Skulls",
    "type": "doctorwho",
    "location": "Earth",
    "effect": "Each creature card in your graveyard has scavenge. The scavenge cost is equal to its mana cost.",
    "chaosEffect": "create two 1/1 white Warrior creature tokens.",
    "imageUrl": null
  },
  {
    "id": "the-cheetah-planet",
    "name": "The Cheetah Planet",
    "type": "doctorwho",
    "location": "Outside Mutter's Spiral",
    "effect": "When you planeswalk to The Cheetah Planet and at the beginning of your upkeep, put two +1/+1 counters on target non-Cat creature you control. It becomes a Cat in addition to its other types.",
    "chaosEffect": "all Cats gain provoke until end of turn.",
    "imageUrl": null
  },
  {
    "id": "the-dark-barony",
    "name": "The Dark Barony",
    "type": "universe",
    "location": "Ulgrotha",
    "effect": "Whenever a nonblack card is put into a player\u00e2\u0080\u0099s graveyard from anywhere, that player loses 1 life.",
    "chaosEffect": "each opponent discards a card.",
    "imageUrl": null
  },
  {
    "id": "the-dining-car",
    "name": "The Dining Car",
    "type": "doctorwho",
    "location": "Spacecraft",
    "effect": "When you planeswalk to The Dining Car, each player creates a Food token. Sixty-Six Seconds - At the beginning of your upkeep, sacrifice a creature with the least toughness among creatures you control. Then investigate.",
    "chaosEffect": "activated abilities of artifact tokens you control cost {2} less to activate this turn.",
    "imageUrl": null
  },
  {
    "id": "the-doctor-s-childhood-barn",
    "name": "The Doctor's Childhood Barn",
    "type": "doctorwho",
    "location": "Gallifrey",
    "effect": "Creatures enter tapped.",
    "chaosEffect": "for each opponent, choose up to one target nonland permanent that opponent controls. Untap those permanents. They phase out. They can\u00e2\u0080\u0099t phase in for as long as The Doctor\u00e2\u0080\u0099s Childhood Barn remains face up. When a player planeswalks, those permanents phase in.",
    "imageUrl": null
  },
  {
    "id": "the-doctor-s-tomb",
    "name": "The Doctor's Tomb",
    "type": "doctorwho",
    "location": "Trenzalore",
    "effect": "If a creature would die, instead exile it and that creature\u00e2\u0080\u0099s controller loses 2 life.",
    "chaosEffect": "redistribute any number of players\u00e2\u0080\u0099 life totals.",
    "imageUrl": null
  },
  {
    "id": "the-drum",
    "name": "The Drum",
    "type": " Mining Facility",
    "location": "doctorwho",
    "effect": "Plane - Earth",
    "chaosEffect": "Whenever you roll the planar die, creatures you control get +1/+1 and gain haste until end of turn.",
    "imageUrl": null
  },
  {
    "id": "the-eon-fog",
    "name": "The Eon Fog",
    "type": "universe",
    "location": "Equilor",
    "effect": "Players skip their untap steps.",
    "chaosEffect": "untap all permanents you control.",
    "imageUrl": null
  },
  {
    "id": "the-fertile-lands-of-saulvinia",
    "name": "The Fertile Lands of Saulvinia",
    "type": "universe",
    "location": "Antausia",
    "effect": "Whenever a player taps a land for mana, that player adds one mana of any type that land produced.",
    "chaosEffect": "reveal cards from the top of your planar deck until you reveal a plane card. Chaos ensues on that plane. Then put all cards revealed this way on the bottom of your planar deck in any order.",
    "imageUrl": null
  },
  {
    "id": "the-fourth-sphere",
    "name": "The Fourth Sphere",
    "type": "universe",
    "location": "Phyrexia",
    "effect": "At the beginning of your upkeep, sacrifice a nonblack creature.",
    "chaosEffect": "create a 2/2 black Zombie creature token.",
    "imageUrl": null
  },
  {
    "id": "the-golden-city-of-orazca",
    "name": "The Golden City of Orazca",
    "type": "universe",
    "location": "Ixalan",
    "effect": "Ascend Whenever one or more creatures you control deal combat damage to a player, create a Treasure token. Then draw a card if you have the city\u00e2\u0080\u0099s blessing.",
    "chaosEffect": "you may put a permanent card from your hand onto the battlefield tapped.",
    "imageUrl": null
  },
  {
    "id": "the-great-aerie",
    "name": "The Great Aerie",
    "type": "universe",
    "location": "Tarkir",
    "effect": "When you planeswalk to The Great Aerie and at the beginning of your upkeep, bolster 3.",
    "chaosEffect": "choose up to one target creature you control and up to one target creature an opponent controls. Each of those creatures deals damage equal to its toughness to the other.",
    "imageUrl": null
  },
  {
    "id": "the-great-forest",
    "name": "The Great Forest",
    "type": "universe",
    "location": "Lorwyn",
    "effect": "Each creature assigns combat damage equal to its toughness rather than its power.",
    "chaosEffect": "creatures you control get +0/+2 and gain trample until end of turn.",
    "imageUrl": null
  },
  {
    "id": "the-hippodrome",
    "name": "The Hippodrome",
    "type": "universe",
    "location": "Segovia",
    "effect": "All creatures get -5/-0.",
    "chaosEffect": "you may destroy target creature if its power is 0 or less.",
    "imageUrl": null
  },
  {
    "id": "the-lux-foundation-library",
    "name": "The Lux Foundation Library",
    "type": "doctorwho",
    "location": "The Library",
    "effect": "Players have no maximum hand size. Whenever a creature you control deals combat damage to a player, you may draw a card.",
    "chaosEffect": "put a shadow counter on target creature.",
    "imageUrl": null
  },
  {
    "id": "the-maelstrom",
    "name": "The Maelstrom",
    "type": "universe",
    "location": "Alara",
    "effect": "When you planeswalk to The Maelstrom and at the beginning of your upkeep, you may reveal the top card of your library. If it\u00e2\u0080\u0099s a permanent card, you may put it onto the battlefield. If you revealed a card but didn\u00e2\u0080\u0099t put it onto the battlefield, put it on the bottom of your library.",
    "chaosEffect": "return target permanent card from your graveyard to the battlefield.",
    "imageUrl": null
  },
  {
    "id": "the-matrix-of-time",
    "name": "The Matrix of Time",
    "type": "doctorwho",
    "location": "Gallifrey",
    "effect": "When you planeswalk to The Matrix of Time, each player exiles the top card of their library. During your turn, you may play lands and cast spells from among cards exiled with The Matrix of Time. Whenever you play a land or cast a spell from among cards exiled with The Matrix of Time, that card\u00e2\u0080\u0099s owner loses 3 life and exiles the top card of their library.",
    "chaosEffect": "create two Treasure tokens.",
    "imageUrl": null
  },
  {
    "id": "the-moonbase",
    "name": "The Moonbase",
    "type": "doctorwho",
    "location": "Moon",
    "effect": "Low Gravity - All creatures have \u00e2\u0080\u009c{2}: This creature gains flying until end of turn. Activate only as a sorcery.\u00e2\u0080\u009d",
    "chaosEffect": "for each opponent, choose up to one target creature card in that player\u00e2\u0080\u0099s graveyard. Put those cards onto the battlefield face down under your control. They\u00e2\u0080\u0099re 2/2 Cyberman artifact creatures.",
    "imageUrl": null
  },
  {
    "id": "the-pit",
    "name": "The Pit",
    "type": "universe",
    "location": "The Abyss",
    "effect": "When you planeswalk to The Pit, each player creates their choice of a 3/3 white Angel creature token with flying or a 6/6 black Demon creature token with flying, trample, and \u00e2\u0080\u009cAt the beginning of your upkeep, sacrifice another creature. If you can\u00e2\u0080\u0099t, this creature deals 6 damage to you.\u00e2\u0080\u009d",
    "chaosEffect": "each player sacrifices a nonartifact creature of their choice.",
    "imageUrl": null
  },
  {
    "id": "the-pyramid-of-mars",
    "name": "The Pyramid of Mars",
    "type": "doctorwho",
    "location": "Mars",
    "effect": "When you planeswalk to The Pyramid of Mars and at beginning of your upkeep, surveil 2.",
    "chaosEffect": "return target creature card from your graveyard to the battlefield.",
    "imageUrl": null
  },
  {
    "id": "the-western-cloud",
    "name": "The Western Cloud",
    "type": "universe",
    "location": "Gobakhan",
    "effect": "Prevent all damage that would be dealt to creatures and planeswalkers you control.",
    "chaosEffect": "create three tapped Treasure tokens. They each deal 1 damage to each creature and each planeswalker.",
    "imageUrl": null
  },
  {
    "id": "the-wilds",
    "name": "The Wilds",
    "type": "universe",
    "location": "Eldraine",
    "effect": "When you planeswalk to The Wilds and at the beginning of your upkeep, create a Food token.",
    "chaosEffect": "target player sacrifices a creature of their choice. If they do, you create a Food token. You create two Food tokens instead if the sacrificed creature\u00e2\u0080\u0099s toughness was 4 or greater.",
    "imageUrl": null
  },
  {
    "id": "the-windy-city",
    "name": "The Windy City",
    "type": "special",
    "location": "Chicago",
    "effect": "When you planeswalk here, at the beginning of your upkeep, or whenever chaos ensues, put a flying counter on target creature you control without flying. When you planeswalk away, exile all creatures with flying until the beginning of the next end step.",
    "chaosEffect": NaN,
    "imageUrl": null
  },
  {
    "id": "the-zephyr-maze",
    "name": "The Zephyr Maze",
    "type": "universe",
    "location": "Kyneth",
    "effect": "Creatures with flying get +2/+0. Creatures without flying get -2/-0.",
    "chaosEffect": "target creature gains flying until end of turn.",
    "imageUrl": null
  },
  {
    "id": "towashi",
    "name": "Towashi",
    "type": "universe",
    "location": "Kamigawa",
    "effect": "Modified creatures you control have trample and \u00e2\u0080\u009cWhenever this creature deals combat damage to a player or planeswalker, draw a card.\u00e2\u0080\u009d",
    "chaosEffect": "distribute three +1/+1 counters among one, two, or three target creatures you control.",
    "imageUrl": null
  },
  {
    "id": "trail-of-the-mage-rings",
    "name": "Trail of the Mage-Rings",
    "type": "universe",
    "location": "Vryn",
    "effect": "Instant and sorcery spells have rebound.",
    "chaosEffect": "you may search your library for an instant or sorcery card, reveal it, put it into your hand, then shuffle.",
    "imageUrl": null
  },
  {
    "id": "truga-jungle",
    "name": "Truga Jungle",
    "type": "universe",
    "location": "Ergamon",
    "effect": "All lands have \u00e2\u0080\u009c{T}: Add one mana of any color.\u00e2\u0080\u009d",
    "chaosEffect": "reveal the top three cards of your library. Put all land cards revealed this way into your hand and the rest on the bottom of your library in any order.",
    "imageUrl": null
  },
  {
    "id": "turri-island",
    "name": "Turri Island",
    "type": "universe",
    "location": "Ir",
    "effect": "Creature spells cost {2} less to cast.",
    "chaosEffect": "reveal the top three cards of your library. Put all creature cards revealed this way into your hand and the rest into your graveyard.",
    "imageUrl": null
  },
  {
    "id": "two-streams-facility",
    "name": "Two Streams Facility",
    "type": "doctorwho",
    "location": "Apalapucia",
    "effect": "Whenever you planeswalk to Two Streams Facility and at the beginning of the first upkeep of the game, each player chooses green anchor or red waterfall. Each player who last chose green anchor may play an additional land during each of their turns. Creatures controlled by players who last chose red waterfall get +2/+0 and have haste.",
    "chaosEffect": "each player who last chose green anchor chooses red waterfall, and vice versa.",
    "imageUrl": null
  },
  {
    "id": "undercity-reaches",
    "name": "Undercity Reaches",
    "type": "universe",
    "location": "Ravnica",
    "effect": "Whenever a creature deals combat damage to a player, its controller may draw a card.",
    "chaosEffect": "you have no maximum hand size for the rest of the game.",
    "imageUrl": null
  },
  {
    "id": "unit-headquarters",
    "name": "UNIT Headquarters",
    "type": "doctorwho",
    "location": "Earth",
    "effect": "When you planeswalk to UNIT Headquarters and at the beginning of your upkeep, create a tapped 1/1 white Soldier creature token.",
    "chaosEffect": "put a +1/+1 counter on each creature you control.",
    "imageUrl": null
  },
  {
    "id": "unyaro",
    "name": "Unyaro",
    "type": "universe",
    "location": "Zhalfir",
    "effect": "At the beginning of your end step, if you planeswalked to Unyaro this turn, untap all creatures. They phase out until a player planeswalks.",
    "chaosEffect": "create two 2/2 white and blue Knight creature tokens with vigilance.",
    "imageUrl": null
  },
  {
    "id": "valor-s-reach",
    "name": "Valor's Reach",
    "type": "universe",
    "location": "Kylem",
    "effect": "Whenever your team attacks with exactly two creatures, those creatures gain double strike until end of turn.",
    "chaosEffect": "untap up to two target creatures your team controls. If it\u00e2\u0080\u0099s a main phase, there is an additional combat phase after this phase, followed by an additional main phase.",
    "imageUrl": null
  },
  {
    "id": "velis-vel",
    "name": "Velis Vel",
    "type": "universe",
    "location": "Lorwyn",
    "effect": "Each creature gets +1/+1 for each other creature on the battlefield that shares at least one creature type with it.",
    "chaosEffect": "target creature gains all creature types until end of turn.",
    "imageUrl": null
  },
  {
    "id": "windmill-farm",
    "name": "Windmill Farm",
    "type": "special",
    "location": "Amsterdam",
    "effect": "When you planeswalk here and at the beginning of your upkeep, create a Tulip Petal artifact token that has \u00e2\u0080\u009c{T}, Sacrifice this artifact: Add one mana of any color.\u00e2\u0080\u009d",
    "chaosEffect": "Spin this plane until the arrow lands on a permanent. If the plane rotated at least 360 degrees during the spin, create a token that\u00e2\u0080\u0099s a copy of that permanent.",
    "imageUrl": null
  },
  {
    "id": "windriddle-palaces",
    "name": "Windriddle Palaces",
    "type": "universe",
    "location": "Belenon",
    "effect": "Players play with the top card of their libraries revealed. You may play lands and cast spells from the top of any player\u00e2\u0080\u0099s library.",
    "chaosEffect": "each player mills a card.",
    "imageUrl": null
  }
];
