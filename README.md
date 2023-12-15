# @turistikrota/location-tr

![npm version](https://img.shields.io/npm/v/@turistikrota/location-tr)
![npm license](https://img.shields.io/npm/l/@turistikrota/location-tr)
![npm downloads](https://img.shields.io/npm/dw/@turistikrota/location-tr)

`@turistikrota/location-tr` was developed by [`Turistikrota Tech`](https://github.com/turistikrota) for use in shared websites.

`@turistikrota/location-tr` is a TypeScript package designed to provide functionality for location-based operations in Turkey. It now includes an expanded set of features, such as finding the nearest districts, district names, and city names, as well as fetching a sorted list of cities and districts.

## Installation

```bash
npm install @turistikrota/location-tr
```

## Usage

```typescript
import {
  Coordinates,
  City,
  District,
  findNearestDistrict,
  findNearestDistrictNames,
  findNearestCityNames,
  getCities,
  getDistricts,
  useCities,
} from '@turistikrota/location-tr';

// Example coordinates
const coordinates: Coordinates = [latitude, longitude];

// Find the nearest district
const nearestDistrict: District | null = findNearestDistrict(coordinates);

// Find the nearest district names
const nearestDistrictNames: string[] = findNearestDistrictNames(coordinates, 5);

// Find the nearest city names
const nearestCityNames: string[] = findNearestCityNames(coordinates, 3);

// Get a sorted list of cities
const sortedCities: City[] = getCities();

// Get a sorted list of districts
const sortedDistricts: District[] = getDistricts();

// Use filtered cities
const filteredCities: City[] = useCities('Istanbul');
```

## Functions

### `findNearestDistrict(coordinates: Coordinates): District | null`

Finds the nearest district based on the given coordinates.

### `findNearestDistrictNames(coordinates: Coordinates, count: number): string[]`

Returns an array of the nearest district names based on the given coordinates and count.

### `findNearestCityNames(coordinates: Coordinates, count: number): string[]`

Returns an array of the nearest city names based on the given coordinates and count.

### `getCities(): City[]`

Returns a sorted list of cities.

### `getDistricts(): District[]`

Returns a sorted list of districts.

### `useCities(filter: string | null): City[]`

Returns a list of cities, optionally filtered by the provided string.

## How It Works

The package uses the Haversine formula to calculate distances between geographical coordinates. It also includes additional functionality for retrieving and filtering city data.

## License

This project is licensed under the [Apache License](LICENSE).

Feel free to contribute, open issues, or provide feedback. Happy coding!