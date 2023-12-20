import cities from './assets/cities.json';
import districts from './assets/locations.json';

export type Coordinates = [number, number]
export type City = (typeof cities)[0]
export type District = (typeof districts)[0]

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180)
}

const turkishSorting = (a: string, b: string) => a.localeCompare(b, 'tr')

const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance
}

export const findNearestDistrict = (coordinates: Coordinates): District | null => {
  let nearestDistrict :District | null = null
  let minDistance = Number.MAX_VALUE

  for (const district of districts) {
    const distance = getDistanceFromLatLonInKm(
      coordinates[0],
      coordinates[1],
      district.coordinates[0],
      district.coordinates[1],
    )
    if (distance < minDistance) {
      minDistance = distance
      nearestDistrict = district
    }
  }
  return nearestDistrict
}

export const findNearestDistrictNames = (coordinates: Coordinates, count: number): string[] => {
  const arr = districts.sort((a, b) => {
    const distanceA = getDistanceFromLatLonInKm(coordinates[0], coordinates[1], a.coordinates[0], a.coordinates[1])
    const distanceB = getDistanceFromLatLonInKm(coordinates[0], coordinates[1], b.coordinates[0], b.coordinates[1])
    return distanceA - distanceB
  })
  return arr.slice(0, count).map((district) => district.name)
}

export const findNearestCityNames = (coordinates: Coordinates, count: number): string[] => {
  const arr = districts.sort((a, b) => {
    const distanceA = getDistanceFromLatLonInKm(coordinates[0], coordinates[1], a.coordinates[0], a.coordinates[1])
    const distanceB = getDistanceFromLatLonInKm(coordinates[0], coordinates[1], b.coordinates[0], b.coordinates[1])
    return distanceA - distanceB
  })
  const set = new Set(arr.map((district) => district.cityName))
  return Array.from(set).slice(0, count)
}

export const findCityByCoordinates = (coordinates: Coordinates): City | null => {
  const city = cities.find((city) => city.coordinates[0] === coordinates[0] && city.coordinates[1] === coordinates[1])
  if (city) return city
  return null
}

export const findNearestCity = (coordinates: Coordinates): City | null => {
  let nearestCity = null
  let minDistance = Number.MAX_VALUE

  for (const city of cities) {
    const distance = getDistanceFromLatLonInKm(coordinates[0], coordinates[1], city.coordinates[0], city.coordinates[1])
    if (distance < minDistance) {
      minDistance = distance
      nearestCity = city
    }
  }
  return nearestCity
}

export const getCities = () :City[] => cities.sort((a, b) => turkishSorting(a.name, b.name))

export const getDistricts = () :District[] => districts.sort((a, b) => turkishSorting(a.name, b.name))

export const useCities = (filter: string | null = null) :City[] => {
  const cities = getCities()
  if (!filter) return cities
  return cities.filter((city) => city.name.toLocaleLowerCase('tr').includes(filter.toLocaleLowerCase('tr')))
}
