import { useState, useEffect, useMemo, useCallback } from 'react';
import { TemperatureData } from '../types/temperature';

// Helper function to extract date only from time string (e.g., "1/1/2022 0:00" -> "1/1/2022")
const getDateOnly = (timeString: string): string => {
	return timeString.split(' ')[0];
}

// Get unique dates from data in sorted order
const getUniqueDates = (data: TemperatureData[]): string[] => {
	if (!data || data.length === 0) return [];
	const dates = data.map(item => getDateOnly(item.time));
	return Array.from(new Set(dates)).sort((a, b) => {
		const dateA = new Date(a);
		const dateB = new Date(b);
		return dateA.getTime() - dateB.getTime();
	});
}

// Filter data to show only records within the date range starting from startDate
const filterDataByDateRange = (data: TemperatureData[], startDate: string, daysToShow: number): TemperatureData[] => {
	if (!data || data.length === 0 || !startDate) return [];
	const uniqueDates = getUniqueDates(data);
	const startIndex = uniqueDates.indexOf(startDate);
	if (startIndex === -1) return [];
	const datesToShow = uniqueDates.slice(startIndex, startIndex + daysToShow);
	return data.filter(item => datesToShow.includes(getDateOnly(item.time)));
}

interface UseDatePaginationProps {
	fetchDataFn: () => Promise<TemperatureData[]>;
	daysPerPage?: number;
}

interface UseDatePaginationReturn {
	data: TemperatureData[];
	fullData: TemperatureData[];
	isLoading: boolean;
	error: Error | null;
	handleNavigateBack: () => void;
	handleNavigateForward: () => void;
	isBackDisabled: boolean;
	isForwardDisabled: boolean;
}

/**
 * Custom hook for date-based pagination with integrated data fetching
 * 
 * @param fetchDataFn - Function to fetch the temperature data
 * @param daysPerPage - Number of days to show per page (default: 3)
 * @returns Paginated data, loading/error states, and navigation controls
 */
export const useDatePagination = ({
	fetchDataFn,
	daysPerPage = 3
}: UseDatePaginationProps): UseDatePaginationReturn => {
	const [fullData, setFullData] = useState<TemperatureData[]>([]);
	const [data, setData] = useState<TemperatureData[]>([]);
	const [startDate, setStartDate] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	// Fetch data on mount
	useEffect(() => {
		const loadData = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const result = await fetchDataFn();
				setFullData(result);
			} catch (err) {
				setError(err instanceof Error ? err : new Error('Failed to fetch data'));
			} finally {
				setIsLoading(false);
			}
		};

		loadData();
	}, [fetchDataFn]);

	// Initialize startDate to the first date when data is loaded
	useEffect(() => {
		if (fullData.length > 0 && !startDate) {
			const uniqueDates = getUniqueDates(fullData);
			if (uniqueDates.length > 0) {
				setStartDate(uniqueDates[0]);
			}
		}
	}, [fullData, startDate])

	// Filter data based on startDate
	useEffect(() => {
		if (startDate) {
			setData(filterDataByDateRange(fullData, startDate, daysPerPage));
		}
	}, [fullData, startDate, daysPerPage])

	// Memoize unique dates to avoid recalculating on every render
	const uniqueDates = useMemo(() => getUniqueDates(fullData), [fullData]);

	// Memoize current index calculation (used in multiple places)
	const currentIndex = useMemo(() =>
		startDate ? uniqueDates.indexOf(startDate) : -1,
		[startDate, uniqueDates]
	);

	// Generic navigation function
	const navigate = useCallback((offset: number) => {
		const newIndex = currentIndex + offset;
		if (newIndex >= 0 && newIndex < uniqueDates.length) {
			setStartDate(uniqueDates[newIndex]);
		}
	}, [currentIndex, uniqueDates]);

	// Navigation handlers using useCallback for performance
	const handleNavigateBack = useCallback(() => {
		navigate(-daysPerPage);
	}, [navigate, daysPerPage]);

	const handleNavigateForward = useCallback(() => {
		navigate(daysPerPage);
	}, [navigate, daysPerPage]);

	// Memoize button state to avoid recalculating on every render
	const isBackDisabled = useMemo(() =>
		!startDate || currentIndex === 0 || fullData.length === 0 || isLoading,
		[startDate, currentIndex, fullData.length, isLoading]
	);

	const isForwardDisabled = useMemo(() =>
		!startDate || currentIndex + daysPerPage >= uniqueDates.length || fullData.length === 0 || isLoading,
		[startDate, currentIndex, uniqueDates.length, fullData.length, daysPerPage, isLoading]
	);

	return {
		data,
		fullData,
		isLoading,
		error,
		handleNavigateBack,
		handleNavigateForward,
		isBackDisabled,
		isForwardDisabled,
	};
};
