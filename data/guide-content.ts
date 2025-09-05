export interface GuideSection {
    title: string;
    content: string;
}

export const GUIDE_CONTENT: GuideSection[] = [
    {
        title: "Welcome, Adventurer!",
        content: `Welcome to the world of Dungeons & Dragons, a cooperative storytelling game of fantasy and adventure. Here, you and your friends will create characters, embark on epic quests, battle fearsome monsters, and uncover legendary treasures. One player takes on the role of the Dungeon Master (DM), who acts as the game's narrator and referee. The others are the players, each controlling a single character. This guide will help you get started on your journey.`
    },
    {
        title: "The Core Mechanic: The d20",
        content: `Nearly everything you do in D&D, from swinging a sword to persuading a stubborn guard, is decided by rolling a 20-sided die (a d20). \n\nWhen you want to do something, the DM will ask for an ability check, an attack roll, or a saving throw. Here's how it works:\n1. **Roll a d20.**\n2. **Add any relevant modifiers.** This is usually your ability score modifier (e.g., +2 for Strength) and sometimes a proficiency bonus if you're skilled at the task.\n3. **Compare the total to a target number.** For ability checks and saving throws, this is a Difficulty Class (DC) set by the DM. For attack rolls, it's the target's Armor Class (AC).\n\nIf your total is equal to or greater than the target number, you succeed! If it's lower, you fail.`
    },
    {
        title: "Your Character Sheet Explained",
        content: `Your character sheet is your hero's dashboard. Let's break down the key parts:\n- **Ability Scores:** Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma. These six scores define your character's raw talent and capabilities. Each score has a modifier that you'll add to your d20 rolls.\n- **Skills:** These are specific applications of your abilities. For example, Athletics is a Strength skill, and Stealth is a Dexterity skill. Your proficiency in these skills adds an extra bonus.\n- **Armor Class (AC):** This represents how hard you are to hit. An attacker must roll higher than your AC to damage you.\n- **Hit Points (HP):** This is your character's health and vitality. When it drops to 0, you fall unconscious.\n- **Weapons & Spells:** Your tools for interacting with the world, especially in combat. They detail how you attack and what magical abilities you possess.`
    },
    {
        title: "What To Do in Combat",
        content: `Combat is played in rounds. On your turn, you can do three main things:\n1. **Move:** You can move up to your character's speed.\n2. **Action:** This is your main activity. You can make an attack, cast a spell, help an ally, hide, or perform another task.\n3. **Bonus Action:** Some special abilities and spells use a bonus action. You only get one of these per turn, if you have an ability that allows it.\n\nYou also have one **Reaction** per round, which you can use to respond to triggers, even when it's not your turn (like making an attack of opportunity).`
    },
    {
        title: "A Note for the Dungeon Master",
        content: `As the DM, you are the architect of the world. Your role is to describe the situations the characters face, play the roles of the monsters and non-player characters (NPCs), and act as the referee for the rules.\n\nYour primary goal is to make sure everyone at the table is having fun. Be fair, be consistent with your rulings, and be a fan of the characters. The game is a collaborative story, and your job is to guide that story to exciting and memorable conclusions.`
    }
];
