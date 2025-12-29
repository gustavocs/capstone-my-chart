import { CityName, CityDataKey } from './temperature';

/**
 * City configuration defining display properties
 */
export interface CityConfig {
	name: CityName;
	dataKey: CityDataKey;
	color: string;
}

/**
 * City statistics calculated from temperature data
 */
export interface CityStats {
	name: CityName;
	color: string;
	min: number;
	max: number;
}

/**
 * Configuration for all cities in the application
 * This is the single source of truth for city display properties
 */
export const CITY_CONFIGS: readonly CityConfig[] = [
	{ name: 'New York', dataKey: 'newYork', color: '#4caf50' }, // Material green
	{ name: 'Mexico City', dataKey: 'mexicoCity', color: '#2196f3' }, // Material blue
	{ name: 'Sao Paulo', dataKey: 'saoPaulo', color: '#f44336' }, // Material red
] as const;
