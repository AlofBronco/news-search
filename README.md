# Spaceflight News SPA

A React + TypeScript single-page application that displays space-related news articles using the Spaceflight News API.

## Features
- Keyword-based search (debounced)
- Infinite pagination
- Persistent search keywords (`localStorage`)
- Highlighting of matched keywords
- Responsive UI built with Material UI

## Tech Stack
- React + TypeScript
- @tanstack/react-query
- Zustand (with persist)
- Material UI
- Axios

## Search Priority Logic
Search is performed across the **article title** and **description**.

### Priority rules
1. Matches in the **title**
2. Matches in the **description**

Articles with keyword matches in the title are always ranked higher than articles with matches only in the description.

This priority is enforced via **client-side sorting after fetching results**, ensuring consistent ordering regardless of API response order.

## Performance
- Debounced search input
- Background refetching without blocking typing
- Memoized article lists

## Run Locally
```bash
npm install
npm run dev
