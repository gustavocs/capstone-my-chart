/**
 * Temperature data point for a specific city at a specific time
 */
export interface TemperatureData {
	time: string;
	newYork: string;
	mexicoCity: string;
	saoPaulo: string;
}

/**
 * City names used in the application
 */
export type CityName = 'New York' | 'Mexico City' | 'Sao Paulo';

/**
 * City data keys in the temperature data
 */
export type CityDataKey = 'newYork' | 'mexicoCity' | 'saoPaulo';
