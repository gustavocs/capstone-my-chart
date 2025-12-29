import { renderHook, act, waitFor } from '@testing-library/react';
import { useDatePagination } from '../useDatePagination';
import { TemperatureData } from '../../types/temperature';

// Mock data for testing
const mockData: TemperatureData[] = [
	{ time: '1/1/2022 0:00', newYork: '10', mexicoCity: '20', saoPaulo: '30' },
	{ time: '1/1/2022 1:00', newYork: '11', mexicoCity: '21', saoPaulo: '31' },
	{ time: '1/2/2022 0:00', newYork: '12', mexicoCity: '22', saoPaulo: '32' },
	{ time: '1/2/2022 1:00', newYork: '13', mexicoCity: '23', saoPaulo: '33' },
	{ time: '1/3/2022 0:00', newYork: '14', mexicoCity: '24', saoPaulo: '34' },
	{ time: '1/3/2022 1:00', newYork: '15', mexicoCity: '25', saoPaulo: '35' },
	{ time: '1/4/2022 0:00', newYork: '16', mexicoCity: '26', saoPaulo: '36' },
	{ time: '1/4/2022 1:00', newYork: '17', mexicoCity: '27', saoPaulo: '37' },
];

describe('useDatePagination', () => {
	describe('Data Fetching', () => {
		it('should fetch data on mount and set loading state', async () => {
			const mockFetchData = jest.fn().mockResolvedValue(mockData);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData, daysPerPage: 2 })
			);

			// Initially loading
			expect(result.current.isLoading).toBe(true);
			expect(result.current.data).toEqual([]);

			// Wait for data to load
			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			expect(mockFetchData).toHaveBeenCalledTimes(1);
			expect(result.current.fullData).toEqual(mockData);
			expect(result.current.error).toBeNull();
		});

		it('should handle fetch errors gracefully', async () => {
			const mockError = new Error('Failed to fetch');
			const mockFetchData = jest.fn().mockRejectedValue(mockError);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData })
			);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			expect(result.current.error).toEqual(mockError);
			expect(result.current.data).toEqual([]);
		});
	});

	describe('Initial State', () => {
		it('should initialize to first date when data loads', async () => {
			const mockFetchData = jest.fn().mockResolvedValue(mockData);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData, daysPerPage: 2 })
			);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			// Should show first 2 days (1/1 and 1/2)
			expect(result.current.data).toHaveLength(4); // 2 entries per day
			expect(result.current.data[0].time).toContain('1/1/2022');
			expect(result.current.data[2].time).toContain('1/2/2022');
		});
	});

	describe('Pagination Navigation', () => {
		it('should navigate forward correctly', async () => {
			const mockFetchData = jest.fn().mockResolvedValue(mockData);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData, daysPerPage: 2 })
			);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			// Initially on 1/1 and 1/2
			expect(result.current.data[0].time).toContain('1/1/2022');

			// Navigate forward
			act(() => {
				result.current.handleNavigateForward();
			});

			// Should now show 1/3 and 1/4
			expect(result.current.data[0].time).toContain('1/3/2022');
			expect(result.current.data[2].time).toContain('1/4/2022');
		});

		it('should navigate backward correctly', async () => {
			const mockFetchData = jest.fn().mockResolvedValue(mockData);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData, daysPerPage: 2 })
			);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			// Navigate forward first
			act(() => {
				result.current.handleNavigateForward();
			});

			expect(result.current.data[0].time).toContain('1/3/2022');

			// Navigate back
			act(() => {
				result.current.handleNavigateBack();
			});

			// Should be back to 1/1 and 1/2
			expect(result.current.data[0].time).toContain('1/1/2022');
		});

		it('should not navigate beyond first page', async () => {
			const mockFetchData = jest.fn().mockResolvedValue(mockData);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData, daysPerPage: 2 })
			);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			const initialData = result.current.data;

			// Try to navigate back from first page
			act(() => {
				result.current.handleNavigateBack();
			});

			// Should still be on first page
			expect(result.current.data).toEqual(initialData);
		});

		it('should not navigate beyond last page', async () => {
			const mockFetchData = jest.fn().mockResolvedValue(mockData);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData, daysPerPage: 2 })
			);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			// Navigate to last page
			act(() => {
				result.current.handleNavigateForward();
			});

			const lastPageData = result.current.data;

			// Try to navigate forward from last page
			act(() => {
				result.current.handleNavigateForward();
			});

			// Should still be on last page
			expect(result.current.data).toEqual(lastPageData);
		});
	});

	describe('Button States', () => {
		it('should disable back button on first page', async () => {
			const mockFetchData = jest.fn().mockResolvedValue(mockData);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData, daysPerPage: 2 })
			);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			expect(result.current.isBackDisabled).toBe(true);
			expect(result.current.isForwardDisabled).toBe(false);
		});

		it('should disable forward button on last page', async () => {
			const mockFetchData = jest.fn().mockResolvedValue(mockData);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData, daysPerPage: 2 })
			);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			// Navigate to last page
			act(() => {
				result.current.handleNavigateForward();
			});

			expect(result.current.isBackDisabled).toBe(false);
			expect(result.current.isForwardDisabled).toBe(true);
		});

		it('should disable both buttons during loading', () => {
			const mockFetchData = jest.fn().mockResolvedValue(mockData);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData })
			);

			// During loading, both should be disabled
			expect(result.current.isBackDisabled).toBe(true);
			expect(result.current.isForwardDisabled).toBe(true);
		});

		it('should enable both buttons when in middle of data', async () => {
			const largeMockData: TemperatureData[] = [];
			for (let day = 1; day <= 9; day++) {
				largeMockData.push({
					time: `1/${day}/2022 0:00`,
					newYork: '10',
					mexicoCity: '20',
					saoPaulo: '30',
				});
			}

			const mockFetchData = jest.fn().mockResolvedValue(largeMockData);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData, daysPerPage: 3 })
			);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			// Navigate to middle
			act(() => {
				result.current.handleNavigateForward();
			});

			// Both buttons should be enabled
			expect(result.current.isBackDisabled).toBe(false);
			expect(result.current.isForwardDisabled).toBe(false);
		});
	});

	describe('Days Per Page Configuration', () => {
		it('should respect custom daysPerPage setting', async () => {
			const mockFetchData = jest.fn().mockResolvedValue(mockData);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData, daysPerPage: 1 })
			);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			// Should show only 1 day
			expect(result.current.data).toHaveLength(2); // 2 entries for 1 day
			expect(result.current.data.every(d => d.time.startsWith('1/1/2022'))).toBe(true);
		});

		it('should use default daysPerPage of 3 when not specified', async () => {
			const mockFetchData = jest.fn().mockResolvedValue(mockData);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData })
			);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			// Should show 3 days by default
			expect(result.current.data).toHaveLength(6); // 2 entries per day × 3 days
		});
	});

	describe('Edge Cases', () => {
		it('should handle empty data', async () => {
			const mockFetchData = jest.fn().mockResolvedValue([]);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData })
			);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			expect(result.current.data).toEqual([]);
			expect(result.current.isBackDisabled).toBe(true);
			expect(result.current.isForwardDisabled).toBe(true);
		});

		it('should handle single day of data', async () => {
			const singleDayData: TemperatureData[] = [
				{ time: '1/1/2022 0:00', newYork: '10', mexicoCity: '20', saoPaulo: '30' },
				{ time: '1/1/2022 1:00', newYork: '11', mexicoCity: '21', saoPaulo: '31' },
			];

			const mockFetchData = jest.fn().mockResolvedValue(singleDayData);

			const { result } = renderHook(() =>
				useDatePagination({ fetchDataFn: mockFetchData, daysPerPage: 3 })
			);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			expect(result.current.data).toEqual(singleDayData);
			expect(result.current.isBackDisabled).toBe(true);
			expect(result.current.isForwardDisabled).toBe(true);
		});
	});
});
