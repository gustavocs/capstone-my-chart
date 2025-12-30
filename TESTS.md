# Testing Strategy

## Overview

This document describes the testing approach for the temperature chart application. The tests focus on the core business logic (custom hook), component behavior, and user interactions.

## Test Coverage

### ✅ Implemented Tests (29 total)

#### 1. **useDatePagination Hook** (15 tests)
Location: `src/hooks/__tests__/useDatePagination.test.ts`

The custom hook contains the core pagination and data fetching logic, making it the highest priority for testing.

**Data Fetching:**
- Fetches data on mount with loading state
- Handles fetch errors gracefully

**Initial State:**
- Initializes to first date when data loads

**Pagination Navigation:**
- Navigates forward correctly
- Navigates backward correctly
- Doesn't navigate beyond first page
- Doesn't navigate beyond last page

**Button States:**
- Disables back button on first page
- Disables forward button on last page
- Disables both buttons during loading
- Enables both buttons in middle of data

**Configuration:**
- Respects custom daysPerPage setting
- Uses default daysPerPage of 3

**Edge Cases:**
- Handles empty data
- Handles single day of data

#### 2. **GridView Component** (13 tests)
Location: `src/components/__tests__/GridView.test.tsx`

Tests the table component that displays city statistics and handles user interactions.

**Rendering:**
- Renders all three city rows
- Renders table headers

**Temperature Calculations:**
- Calculates min temperature correctly for New York
- Calculates max temperature correctly for New York
- Calculates min/max for all cities

**City Selection:**
- Calls onSetCity when row is clicked
- Highlights selected city row
- Doesn't highlight unselected rows
- Toggles selection when same row clicked twice

**Edge Cases:**
- Handles empty data gracefully
- Handles single data point
- Works without onSetCity callback

**Color Indicators:**
- Renders city rows with color indicators

#### 3. **App Component** (1 test)
Location: `src/App.test.tsx`

Basic smoke test to ensure the main component renders without crashing.

## Architecture Decisions

### Why Focus on the Hook?

The `useDatePagination` hook encapsulates:
- Data fetching with async operations
- Loading and error state management
- Date-based pagination logic
- Button state calculations
- Memoization for performance

This is where bugs are most likely to occur, making it the highest ROI for testing.

### Why Component Tests?

Component tests verify:
- User interactions (clicking rows, buttons)
- Visual feedback (highlighting, disabled states)
- Data transformations (min/max calculations)
- Edge cases (empty data, single values)

### What's Not Tested?

**Chart Component:** 
- Primarily a presentational component using the Recharts library
- The library itself is well-tested
- Visual rendering is better verified through manual testing or E2E tests

**TSV Parsing:**
- Could be added if data parsing becomes more complex
- Currently straightforward and used in production without issues

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Test Results

```
Test Suites: 3 passed, 3 total
Tests:       29 passed, 29 total
Snapshots:   0 total
Time:        ~3s
```

## Future Improvements

If the application grows, consider adding:

1. **Integration Tests** - Test complete user flows (load → navigate → select city)
2. **E2E Tests** - Use Cypress or Playwright for full browser testing
3. **Visual Regression Tests** - Ensure UI doesn't break unexpectedly
4. **Performance Tests** - Verify pagination doesn't slow down with large datasets
5. **Accessibility Tests** - Ensure keyboard navigation and screen reader support