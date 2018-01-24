export interface Hero {
	key: string;
	name: string;
	role: HeroRoleType;
	health: number;
	abilities: string[];
}

export enum HeroRoleType {
	assassin = 1,
	fighter = 2,
	mage = 3,
	support = 4,
	tank = 5,
	marksman = 6,
}

export interface GraphQLSchema {
	heroes?: Hero[];
}