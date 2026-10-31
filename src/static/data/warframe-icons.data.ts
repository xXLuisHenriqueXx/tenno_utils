import corpus from "@/assets/factions/corpus.svg";
import grineer from "@/assets/factions/grineer.svg";
import infested from "@/assets/factions/infested.svg";
import orokin from "@/assets/factions/orokin.svg";
import tenno from "@/assets/factions/tenno.svg";
import narmer from "@/assets/factions/narmer.svg";
import murmur from "@/assets/factions/murmur.svg";
import corrupted from "@/assets/factions/corrupted.svg";
import scaldra from "@/assets/factions/scaldra.svg";
import techrot from "@/assets/factions/techrot.svg";

import alert from "@/assets/activities/alert.svg";
import arbitration from "@/assets/activities/arbitration.svg";
import archwing from "@/assets/activities/archwing.svg";
import fissure from "@/assets/activities/fissure.svg";
import nightmare from "@/assets/activities/nightmare.svg";
import sortie from "@/assets/activities/sortie.svg";
import steelPath from "@/assets/activities/steel-path.svg";
import invasion from "@/assets/activities/invasion.png";
import baro from "@/assets/activities/baro.png";
import weekly from "@/assets/activities/weekly.svg";

import earth from "@/assets/syndicates/earth.svg";
import solaris from "@/assets/syndicates/solaris.svg";
import necraloid from "@/assets/syndicates/necraloid.svg";
import ostron from "@/assets/syndicates/ostron.svg";
import quills from "@/assets/syndicates/quills.svg";
import holdfasts from "@/assets/syndicates/holdfasts.svg";

import lith from "@/assets/fissures/lith.svg";
import meso from "@/assets/fissures/meso.svg";
import neo from "@/assets/fissures/neo.svg";
import axi from "@/assets/fissures/axi.svg";
import requiem from "@/assets/fissures/requiem.svg";

import credits from "@/assets/currencies/credits.png";
import ducats from "@/assets/currencies/ducats.png";
import steelEssence from "@/assets/currencies/steel-essence.png";
import riven from "@/assets/currencies/riven.svg";

export const WARFRAME_ICONS = {
  factions: {
    Corpus: corpus,
    "Orokin Corrupted": corrupted,
    Grineer: grineer,
    Infested: infested,
    Infestation: infested,
    Orokin: orokin,
    Tenno: tenno,
    Narmer: narmer,
    Murmur: murmur,
    "Man in the Wall": murmur,
    Scaldra: scaldra,
    Techrot: techrot,
  },
  activities: {
    alert,
    arbitration,
    archwing,
    fissure,
    nightmare,
    sortie,
    steelPath,
    invasion,
    baro,
    weekly,
  },
  syndicates: {
    earth,
    solaris,
    necraloid,
    ostron,
    quills,
    holdfasts,
  },
  fissures: {
    Lith: lith,
    Meso: meso,
    Neo: neo,
    Axi: axi,
    Requiem: requiem,
  },
  currencies: {
    Credits: credits,
    Ducats: ducats,
    SteelEssence: steelEssence,
    Riven: riven,
  },
} as const;
