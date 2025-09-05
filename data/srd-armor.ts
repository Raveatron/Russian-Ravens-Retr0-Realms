import type { Armor } from '../types';

export const SRD_ARMOR: Armor[] = [
    // Light Armor
    { name: "Padded", ac: "11 + Dex modifier", properties: "Disadvantage on Stealth checks" },
    { name: "Leather", ac: "11 + Dex modifier", properties: "" },
    { name: "Studded Leather", ac: "12 + Dex modifier", properties: "" },
    // Medium Armor
    { name: "Hide", ac: "12 + Dex modifier (max 2)", properties: "" },
    { name: "Chain Shirt", ac: "13 + Dex modifier (max 2)", properties: "" },
    { name: "Scale Mail", ac: "14 + Dex modifier (max 2)", properties: "Disadvantage on Stealth checks" },
    { name: "Breastplate", ac: "14 + Dex modifier (max 2)", properties: "" },
    { name: "Half Plate", ac: "15 + Dex modifier (max 2)", properties: "Disadvantage on Stealth checks" },
    // Heavy Armor
    { name: "Ring Mail", ac: "14", properties: "Disadvantage on Stealth checks" },
    { name: "Chain Mail", ac: "16", properties: "Disadvantage on Stealth checks, Str 13" },
    { name: "Splint", ac: "17", properties: "Disadvantage on Stealth checks, Str 15" },
    { name: "Plate", ac: "18", properties: "Disadvantage on Stealth checks, Str 15" },
    // Shields
    { name: "Shield", ac: "+2", properties: "" },
];
