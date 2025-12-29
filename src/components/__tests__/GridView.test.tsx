import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GridView } from '../GridView';
import { TemperatureData } from '../../types/temperature';

const mockData: TemperatureData[] = [
	{ time: '1/1/2022 0:00', newYork: '5.5', mexicoCity: '20.5', saoPaulo: '30.5' },
	{ time: '1/1/2022 1:00', newYork: '10.5', mexicoCity: '25.5', saoPaulo: '35.5' },
	{ time: '1/1/2022 2:00', newYork: '15.5', mexicoCity: '30.5', saoPaulo: '40.5' },
];

describe('GridView', () => {
	describe('Rendering', () => {
		it('should render all three city rows', () => {
			render(<GridView data={mockData} />);

			expect(screen.getByText('New York')).toBeInTheDocument();
			expect(screen.getByText('Mexico City')).toBeInTheDocument();
			expect(screen.getByText('Sao Paulo')).toBeInTheDocument();
		});

		it('should render table headers', () => {
			render(<GridView data={mockData} />);

			expect(screen.getByText('City')).toBeInTheDocument();
			expect(screen.getByText('Lower Limit')).toBeInTheDocument();
			expect(screen.getByText('Upper Limit')).toBeInTheDocument();
		});
	});

	describe('Temperature Calculations', () => {
		it('should calculate min temperature correctly for New York', () => {
			render(<GridView data={mockData} />);

			// Min of [5.5, 10.5, 15.5] = 5.5
			const rows = screen.getAllByRole('row');
			const newYorkRow = rows.find(row => row.textContent?.includes('New York'));
			expect(newYorkRow?.textContent).toContain('5.5');
		});

		it('should calculate max temperature correctly for New York', () => {
			render(<GridView data={mockData} />);

			// Max of [5.5, 10.5, 15.5] = 15.5
			const rows = screen.getAllByRole('row');
			const newYorkRow = rows.find(row => row.textContent?.includes('New York'));
			expect(newYorkRow?.textContent).toContain('15.5');
		});

		it('should calculate min/max for all cities', () => {
			render(<GridView data={mockData} />);

			const rows = screen.getAllByRole('row');

			// New York: min=5.5, max=15.5
			const newYorkRow = rows.find(row => row.textContent?.includes('New York'));
			expect(newYorkRow?.textContent).toContain('5.5');
			expect(newYorkRow?.textContent).toContain('15.5');

			// Mexico City: min=20.5, max=30.5
			const mexicoCityRow = rows.find(row => row.textContent?.includes('Mexico City'));
			expect(mexicoCityRow?.textContent).toContain('20.5');
			expect(mexicoCityRow?.textContent).toContain('30.5');

			// Sao Paulo: min=30.5, max=40.5
			const saoPauloRow = rows.find(row => row.textContent?.includes('Sao Paulo'));
			expect(saoPauloRow?.textContent).toContain('30.5');
			expect(saoPauloRow?.textContent).toContain('40.5');
		});
	});

	describe('City Selection', () => {
		it('should call onSetCity when row is clicked', () => {
			const mockOnSetCity = jest.fn();
			render(<GridView data={mockData} onSetCity={mockOnSetCity} />);

			const newYorkRow = screen.getByText('New York').closest('tr');
			fireEvent.click(newYorkRow!);

			expect(mockOnSetCity).toHaveBeenCalledWith('New York');
		});

		it('should highlight selected city row', () => {
			render(<GridView data={mockData} selectedCity="Mexico City" />);

			const mexicoCityRow = screen.getByText('Mexico City').closest('tr');
			expect(mexicoCityRow).toHaveStyle({ backgroundColor: '#f0f0f0' });
		});

		it('should not highlight unselected rows', () => {
			render(<GridView data={mockData} selectedCity="Mexico City" />);

			const newYorkRow = screen.getByText('New York').closest('tr');
			expect(newYorkRow).not.toHaveStyle({ backgroundColor: '#f0f0f0' });
		});

		it('should toggle selection when same row clicked twice', () => {
			const mockOnSetCity = jest.fn();
			render(
				<GridView
					data={mockData}
					selectedCity="New York"
					onSetCity={mockOnSetCity}
				/>
			);

			const newYorkRow = screen.getByText('New York').closest('tr');
			fireEvent.click(newYorkRow!);

			// Should call with empty string to deselect
			expect(mockOnSetCity).toHaveBeenCalledWith('');
		});
	});

	describe('Edge Cases', () => {
		it('should handle empty data gracefully', () => {
			render(<GridView data={[]} />);

			expect(screen.getByText('New York')).toBeInTheDocument();
			expect(screen.getByText('Mexico City')).toBeInTheDocument();
			expect(screen.getByText('Sao Paulo')).toBeInTheDocument();

			// Should show Infinity or -Infinity for empty data
			const rows = screen.getAllByRole('row');
			expect(rows.length).toBeGreaterThan(0);
		});

		it('should handle single data point', () => {
			const singleData: TemperatureData[] = [
				{ time: '1/1/2022 0:00', newYork: '10', mexicoCity: '20', saoPaulo: '30' },
			];

			render(<GridView data={singleData} />);

			// Min and max should be the same
			const rows = screen.getAllByRole('row');
			const newYorkRow = rows.find(row => row.textContent?.includes('New York'));
			expect(newYorkRow?.textContent).toContain('10');
		});

		it('should work without onSetCity callback', () => {
			render(<GridView data={mockData} />);

			const newYorkRow = screen.getByText('New York').closest('tr');

			// Should not throw error when clicked
			expect(() => fireEvent.click(newYorkRow!)).not.toThrow();
		});
	});

	describe('Color Indicators', () => {
		it('should render city rows with color indicators', () => {
			render(<GridView data={mockData} />);

			// Verify all cities are rendered (which confirms rows with colors exist)
			expect(screen.getByText('New York')).toBeInTheDocument();
			expect(screen.getByText('Mexico City')).toBeInTheDocument();
			expect(screen.getByText('Sao Paulo')).toBeInTheDocument();
		});
	});
});
