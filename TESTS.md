# Tests approach

Personally in front-end I haven't written tests for components, only for logic inside reducers and sagas (when I used it) and for integration tests. As in this case there isn't too much logic outside components, I think it's a good idea to test components and data logic like:

1. As `App.tsx` has most part of the logic in this app, I think tests should be focused on that component
2. We can start mocking `fetchData()` imported from `data.js` and test both logic used to set data to Context and logic used for pagination 
3. Another test could be logic used inside `GridView.tsx` that set highlited city and change styles for selected city in `Chart.tsx` component. Also in `GridView.tsx` component it's possible to test logic for lower and upper limit temperatures. 
4. I don't think it's worth it to add any test to `Chart.tsx` besides the highlighted city and its styles.
5. Another usefull test could be the TSV to Json conversion for different layouts and data