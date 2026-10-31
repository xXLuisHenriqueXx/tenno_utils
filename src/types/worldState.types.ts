export interface Extensible {
  [key: string]: unknown;
}

export interface WorldStateTimedEntry extends Extensible {
  id?: string;
  activation?: string;
  expiry?: string;
  startString?: string;
  expiryString?: string;
  active?: boolean;
  expired?: boolean;
}

export interface Reward extends Extensible {
  items?: string[];
  countedItems?: Array<{
    count: number;
    type: string;
  }>;
  credits?: number;
  asString?: string;
  thumbnail?: string;
}

export interface Mission extends Extensible {
  node?: string;
  nodeKey?: string;
  type?: string;
  typeKey?: string;
  missionType?: string;
  missionTypeKey?: string;
  faction?: string;
  factionKey?: string;
  level?: number;
  minEnemyLevel?: number;
  maxEnemyLevel?: number;
  reward?: Reward;
  nightmare?: boolean;
  archwingRequired?: boolean;
  isSharkwing?: boolean;
}

export interface Alert extends WorldStateTimedEntry {
  mission?: Mission;
  reward?: Reward;
  tag?: string;
}

export interface Arbitration extends WorldStateTimedEntry {
  node?: string;
  nodeKey?: string;
  type?: string;
  typeKey?: string;
  enemy?: string;
  archwing?: boolean;
  sharkwing?: boolean;
}

export interface ArchimedeaModifier extends Extensible {
  name?: string;
  key?: string;
  description?: string;
}

export interface ArchimedeaMission extends Extensible {
  faction?: string;
  factionKey?: string;
  missionType?: string;
  missionTypeKey?: string;
  deviation?: ArchimedeaModifier;
  risks?: Array<ArchimedeaModifier & { isHard?: boolean }>;
}

export interface Archimedea extends WorldStateTimedEntry {
  type?: string;
  typeKey?: string;
  missions?: ArchimedeaMission[];
  personalModifiers?: ArchimedeaModifier[];
}

export interface ArchonHunt extends WorldStateTimedEntry {
  boss?: string;
  faction?: string;
  factionKey?: string;
  missions?: Mission[];
  variants?: Mission[];
  rewardPool?: string[];
}

export interface CambionCycle extends WorldStateTimedEntry {
  state?: string;
  active?: boolean;
  timeLeft?: string;
}

export interface CetusCycle extends WorldStateTimedEntry {
  state?: string;
  isDay?: boolean;
  timeLeft?: string;
  shortString?: string;
}

export interface DescendiaChallenge extends Extensible {
  challenge?: string;
  challengeKey?: string;
  index?: string;
  level?: string;
  levelUniqueName?: string;
  type?: string;
  typeKey?: string;
  auras?: Array<{
    name?: string;
    uniqueName?: string;
  }>;
  specs?: Array<{
    name?: string;
    uniqueName?: string;
  }>;
}

export interface Descendia extends WorldStateTimedEntry {
  seed?: number;
  challenges?: DescendiaChallenge[];
}

export interface DuviriChoice extends Extensible {
  category?: string;
  categoryKey?: string;
  choices?: string[];
}

export interface DuviriCycle extends WorldStateTimedEntry {
  state?: string;
  choices?: DuviriChoice[];
}

export interface EarthCycle extends WorldStateTimedEntry {
  state?: string;
  isDay?: boolean;
  timeLeft?: string;
}

export interface WorldEvent extends WorldStateTimedEntry {
  description?: string;
  tooltip?: string;
  image?: string;
  icon?: string;
  rewards?: Reward[];
  nodes?: string[];
  faction?: string;
  maximumScore?: number;
  currentScore?: number;
}

export interface Fissure extends WorldStateTimedEntry {
  node?: string;
  nodeKey?: string;
  missionType?: string;
  missionTypeKey?: string;
  enemy?: string;
  enemyKey?: string;
  tier?: string;
  tierNum?: number;
  isHard?: boolean;
  isStorm?: boolean;
}

export interface Individual {
  faction?: string;
  factionKey?: string;
  reward?: Reward;
}

export interface Invasion extends WorldStateTimedEntry {
  node?: string;
  nodeKey?: string;
  desc?: string;
  attacker?: Individual;
  defender?: Individual;
  count?: number;
  goal?: number;
  completion?: number;
  completed?: boolean;
  vsInfestation?: boolean;
}

export interface Sortie extends WorldStateTimedEntry {
  boss?: string;
  faction?: string;
  factionKey?: string;
  missions?: Mission[];
  variants?: Mission[];
}

export interface SteelPath extends WorldStateTimedEntry {
  currentReward?: {
    name?: string;
    cost?: number;
    thumbnail?: string;
  };
  evergreens?: Array<{
    name?: string;
    cost?: number;
    thumbnail?: string;
  }>;
  rotation?: string;
  remaining?: string;
}

export interface SyndicateMission extends WorldStateTimedEntry {
  nodes?: string[];
  syndicate?: string;
  syndicateKey?: string;
  jobs?: Mission[];
  eta?: string;
}

export interface VallisCycle extends WorldStateTimedEntry {
  state?: string;
  isWarm?: boolean;
  timeLeft?: string;
}

export interface VoidTrader extends WorldStateTimedEntry {
  character?: string;
  location?: string;
  inventory?: Array<{
    uniqueName?: string;
    item?: string;
    ducats?: number;
    credits?: number;
  }>;
  active?: boolean;
  psId?: string;
}

export interface ZarimanCycle extends WorldStateTimedEntry {
  state?: string;
  timeLeft?: string;
}

export interface WorldState {
  alerts: Alert[];
  arbitration: Arbitration | null;
  archimedeas: Archimedea[];
  archonHunt: ArchonHunt | null;
  cambionCycle: CambionCycle | null;
  cetusCycle: CetusCycle | null;
  descendia: Descendia | null;
  duviriCycle: DuviriCycle | null;
  earthCycle: EarthCycle | null;
  events: WorldEvent[];
  fissures: Fissure[];
  invasions: Invasion[];
  sortie: Sortie | null;
  steelPath: SteelPath | null;
  syndicateMissions: SyndicateMission[];
  vallisCycle: VallisCycle | null;
  voidTrader: VoidTrader | null;
  zarimanCycle: ZarimanCycle | null;
}
