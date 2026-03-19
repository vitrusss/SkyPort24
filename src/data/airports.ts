export interface AirportData {
  iata: string
  icao: string
  name: string
  city: string
  country: string
  type: string
  elevation: string
  timezone: string
  opened: string
  terminals: number
  coordinates: { lat: number; lng: number }
  weather: {
    temp: number
    feelsLike: number
    condition: string
    wind: string
    visibility: string
    humidity: string
    forecast: {
      day: string
      icon: string
      high: number
      low: number
    }[]
  }
  delays: {
    onTime: number
    delayed: number
    avgDelayMin: number
    vsAverage: string
  }
  activity: {
    hours: { hour: number; flights: number }[]
    peakHour: string
    quietHour: string
    summary: string
  }
  runways: {
    count: number
    longest: string
    surface: string
    designations: string[]
    note: string
  }
  hubAirlines: {
    name: string
    role: string
    share: number
  }[]
  throughput: {
    annualPassengers: string
    flightsPerDay: number
    annualMovements: string
    scaleLabel: string
  }
  arrivals: {
    flight: string
    from: string
    airline: string
    airlineCode: string
    scheduled: string
    status: string
    terminal: string
    gate: string
  }[]
  departures: {
    flight: string
    to: string
    airline: string
    airlineCode: string
    scheduled: string
    status: string
    terminal: string
    gate: string
  }[]
  facts: {
    title: string
    body: string
  }[]
  imageUrl: string
  sunTimes: { sunrise: string; sunset: string }
}

export const airports: Record<string, AirportData> = {
  LHR: {
    iata: 'LHR',
    icao: 'EGLL',
    name: 'Heathrow Airport',
    city: 'London',
    country: 'United Kingdom',
    type: 'International Hub',
    elevation: '25 m (83 ft)',
    timezone: 'GMT+0 / BST+1',
    opened: '1946',
    terminals: 5,
    coordinates: { lat: 51.4775, lng: -0.4614 },
    weather: {
      temp: 11,
      feelsLike: 8,
      condition: 'Overcast',
      wind: 'SW 18 km/h',
      visibility: '9 km',
      humidity: '78%',
      forecast: [
        { day: 'Wed', icon: 'cloud', high: 11, low: 7 },
        { day: 'Thu', icon: 'rain', high: 9, low: 5 },
        { day: 'Fri', icon: 'cloud', high: 10, low: 6 },
        { day: 'Sat', icon: 'sun', high: 14, low: 8 },
        { day: 'Sun', icon: 'cloud', high: 12, low: 7 },
      ],
    },
    delays: {
      onTime: 72,
      delayed: 28,
      avgDelayMin: 19,
      vsAverage: '+4 min vs EU avg',
    },
    activity: {
      hours: [
        { hour: 0, flights: 12 }, { hour: 1, flights: 8 }, { hour: 2, flights: 5 },
        { hour: 3, flights: 4 }, { hour: 4, flights: 6 }, { hour: 5, flights: 18 },
        { hour: 6, flights: 45 }, { hour: 7, flights: 72 }, { hour: 8, flights: 98 },
        { hour: 9, flights: 89 }, { hour: 10, flights: 76 }, { hour: 11, flights: 82 },
        { hour: 12, flights: 78 }, { hour: 13, flights: 85 }, { hour: 14, flights: 91 },
        { hour: 15, flights: 88 }, { hour: 16, flights: 95 }, { hour: 17, flights: 87 },
        { hour: 18, flights: 74 }, { hour: 19, flights: 68 }, { hour: 20, flights: 52 },
        { hour: 21, flights: 38 }, { hour: 22, flights: 24 }, { hour: 23, flights: 16 },
      ],
      peakHour: '08:00 – 09:00',
      quietHour: 'After 22:00',
      summary: 'Heathrow operates at near-full capacity from early morning until late evening, with twin peaks at 08:00 and 14:00.',
    },
    runways: {
      count: 2,
      longest: '3,902 m (12,802 ft)',
      surface: 'Asphalt',
      designations: ['09L/27R', '09R/27L'],
      note: 'Parallel east-west runways support up to 480,000 movements per year. Long enough for fully-laden A380 and B747-8 operations.',
    },
    hubAirlines: [
      { name: 'British Airways', role: 'Primary Hub', share: 47 },
      { name: 'Virgin Atlantic', role: 'Secondary Hub', share: 11 },
      { name: 'Iberia', role: 'Base', share: 6 },
      { name: 'Other carriers', role: 'International services', share: 36 },
    ],
    throughput: {
      annualPassengers: '79.7M',
      flightsPerDay: 1305,
      annualMovements: '476,000',
      scaleLabel: 'Europe\'s busiest airport',
    },
    arrivals: [
      { flight: 'BA 178', from: 'New York JFK', airline: 'British Airways', airlineCode: 'ba', scheduled: '06:25', status: 'Landed', terminal: '5', gate: 'B12' },
      { flight: 'EK 004', from: 'Dubai DXB', airline: 'Emirates', airlineCode: 'ek', scheduled: '06:40', status: 'Landed', terminal: '3', gate: 'C22' },
      { flight: 'QR 002', from: 'Doha DOH', airline: 'Qatar Airways', airlineCode: 'qr', scheduled: '06:55', status: 'On Time', terminal: '4', gate: 'A8' },
      { flight: 'AA 100', from: 'Chicago ORD', airline: 'American Airlines', airlineCode: 'aa', scheduled: '07:10', status: 'Delayed 18m', terminal: '3', gate: 'B15' },
      { flight: 'SQ 317', from: 'Singapore SIN', airline: 'Singapore Airlines', airlineCode: 'sq', scheduled: '07:20', status: 'On Time', terminal: '2', gate: 'D4' },
    ],
    departures: [
      { flight: 'BA 117', to: 'New York JFK', airline: 'British Airways', airlineCode: 'ba', scheduled: '08:40', status: 'On Time', terminal: '5', gate: 'B32' },
      { flight: 'LH 903', to: 'Frankfurt FRA', airline: 'Lufthansa', airlineCode: 'lh', scheduled: '09:15', status: 'Delayed 22m', terminal: '2', gate: 'A14' },
      { flight: 'EK 007', to: 'Dubai DXB', airline: 'Emirates', airlineCode: 'ek', scheduled: '09:55', status: 'On Time', terminal: '3', gate: 'C9' },
      { flight: 'AF 822', to: 'Paris CDG', airline: 'Air France', airlineCode: 'af', scheduled: '10:20', status: 'Cancelled', terminal: '4', gate: '—' },
      { flight: 'U2 415', to: 'Amsterdam AMS', airline: 'easyJet', airlineCode: 'u2', scheduled: '10:45', status: 'Boarding', terminal: '2', gate: 'B5' },
    ],
    facts: [
      {
        title: 'Named after a village',
        body: 'Heathrow takes its name from Heath Row, a small hamlet demolished in 1944 to build the wartime airfield that became today\'s airport.',
      },
      {
        title: 'Opened in 1946',
        body: 'The first commercial flight departed on 1 January 1946. The original terminal was a collection of tents on the infield.',
      },
      {
        title: 'Two runways, a global record',
        body: 'Heathrow handles more international passengers than any other airport in the world — on just two runways. No other top-5 global hub operates with so few.',
      },
      {
        title: 'Underground connection',
        body: 'The Piccadilly line has connected Heathrow to central London since 1977, making it one of the earliest airports in the world with a direct metro link.',
      },
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Heathrow_T5_2014.jpg/1280px-Heathrow_T5_2014.jpg',
    sunTimes: { sunrise: '06:18', sunset: '18:35' },
  },

  JFK: {
    iata: 'JFK',
    icao: 'KJFK',
    name: 'John F. Kennedy International Airport',
    city: 'New York',
    country: 'United States',
    type: 'International Hub',
    elevation: '4 m (13 ft)',
    timezone: 'UTC−5 / EDT−4',
    opened: '1948',
    terminals: 6,
    coordinates: { lat: 40.6413, lng: -73.7781 },
    weather: {
      temp: 7,
      feelsLike: 3,
      condition: 'Partly Cloudy',
      wind: 'NW 24 km/h',
      visibility: '16 km',
      humidity: '54%',
      forecast: [
        { day: 'Wed', icon: 'cloud', high: 9, low: 3 },
        { day: 'Thu', icon: 'snow', high: 4, low: -1 },
        { day: 'Fri', icon: 'sun', high: 7, low: 1 },
        { day: 'Sat', icon: 'sun', high: 11, low: 4 },
        { day: 'Sun', icon: 'rain', high: 8, low: 3 },
      ],
    },
    delays: {
      onTime: 68,
      delayed: 32,
      avgDelayMin: 24,
      vsAverage: '+9 min vs US avg',
    },
    activity: {
      hours: [
        { hour: 0, flights: 8 }, { hour: 1, flights: 5 }, { hour: 2, flights: 3 },
        { hour: 3, flights: 2 }, { hour: 4, flights: 4 }, { hour: 5, flights: 14 },
        { hour: 6, flights: 38 }, { hour: 7, flights: 62 }, { hour: 8, flights: 84 },
        { hour: 9, flights: 78 }, { hour: 10, flights: 71 }, { hour: 11, flights: 68 },
        { hour: 12, flights: 72 }, { hour: 13, flights: 79 }, { hour: 14, flights: 85 },
        { hour: 15, flights: 82 }, { hour: 16, flights: 88 }, { hour: 17, flights: 76 },
        { hour: 18, flights: 64 }, { hour: 19, flights: 58 }, { hour: 20, flights: 44 },
        { hour: 21, flights: 32 }, { hour: 22, flights: 18 }, { hour: 23, flights: 11 },
      ],
      peakHour: '16:00 – 17:00',
      quietHour: 'Before 07:00',
      summary: 'JFK peaks in the late afternoon with heavy transatlantic departures, then stays busy into the evening with domestic connections.',
    },
    runways: {
      count: 4,
      longest: '4,423 m (14,511 ft)',
      surface: 'Asphalt',
      designations: ['04L/22R', '04R/22L', '13L/31R', '13R/31L'],
      note: 'Four runways in a crosswind configuration allow operations in nearly any wind condition. The longest runway is among the top 20 in North America.',
    },
    hubAirlines: [
      { name: 'Delta Air Lines', role: 'Primary Hub', share: 34 },
      { name: 'American Airlines', role: 'Hub', share: 22 },
      { name: 'JetBlue Airways', role: 'Focus City', share: 18 },
      { name: 'Other carriers', role: 'International services', share: 26 },
    ],
    throughput: {
      annualPassengers: '62.1M',
      flightsPerDay: 1150,
      annualMovements: '420,000',
      scaleLabel: 'Busiest international gateway in the Americas',
    },
    arrivals: [
      { flight: 'BA 178', from: 'London LHR', airline: 'British Airways', airlineCode: 'ba', scheduled: '07:05', status: 'Landed', terminal: '7', gate: 'B4' },
      { flight: 'DL 402', from: 'Los Angeles LAX', airline: 'Delta Air Lines', airlineCode: 'dl', scheduled: '07:30', status: 'On Time', terminal: '4', gate: 'A22' },
      { flight: 'AA 100', from: 'London LHR', airline: 'American Airlines', airlineCode: 'aa', scheduled: '07:45', status: 'Delayed 15m', terminal: '8', gate: '8C' },
      { flight: 'B6 820', from: 'Fort Lauderdale FLL', airline: 'JetBlue', airlineCode: 'b6', scheduled: '08:00', status: 'On Time', terminal: '5', gate: 'C11' },
      { flight: 'AF 011', from: 'Paris CDG', airline: 'Air France', airlineCode: 'af', scheduled: '08:15', status: 'Landed', terminal: '1', gate: 'B8' },
    ],
    departures: [
      { flight: 'AA 100', to: 'London LHR', airline: 'American Airlines', airlineCode: 'aa', scheduled: '09:00', status: 'On Time', terminal: '8', gate: '8A' },
      { flight: 'DL 401', to: 'Paris CDG', airline: 'Delta', airlineCode: 'dl', scheduled: '09:30', status: 'Boarding', terminal: '4', gate: 'B22' },
      { flight: 'B6 915', to: 'Miami MIA', airline: 'JetBlue', airlineCode: 'b6', scheduled: '10:00', status: 'On Time', terminal: '5', gate: 'C14' },
      { flight: 'UA 87', to: 'Tokyo HND', airline: 'United', airlineCode: 'ua', scheduled: '10:40', status: 'Delayed 15m', terminal: '7', gate: 'D8' },
      { flight: 'EK 202', to: 'Dubai DXB', airline: 'Emirates', airlineCode: 'ek', scheduled: '11:10', status: 'On Time', terminal: '4', gate: 'B31' },
    ],
    facts: [
      {
        title: 'Named after a president',
        body: 'Originally called Idlewild Airport, it was renamed in 1963 to honor President John F. Kennedy, who was assassinated that year.',
      },
      {
        title: 'Six terminals, one airport',
        body: 'JFK\'s six terminals were historically operated by individual airlines, resulting in radically different architectural styles across a single airport.',
      },
      {
        title: 'A $19B transformation',
        body: 'JFK is currently undergoing one of the largest airport infrastructure investments in US history, consolidating terminals and expanding capacity for the 2030s.',
      },
      {
        title: 'The TWA hotel',
        body: 'The landmark TWA Flight Center, designed by Eero Saarinen in 1962, has been preserved and converted into a retro-themed hotel within the terminal campus.',
      },
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/JFK_Airport_overhead_view.jpg/1280px-JFK_Airport_overhead_view.jpg',
    sunTimes: { sunrise: '06:24', sunset: '18:41' },
  },

  AMS: {
    iata: 'AMS',
    icao: 'EHAM',
    name: 'Amsterdam Airport Schiphol',
    city: 'Amsterdam',
    country: 'Netherlands',
    type: 'International Hub',
    elevation: '−3 m (−11 ft)',
    timezone: 'UTC+1 / CEST+2',
    opened: '1916',
    terminals: 1,
    coordinates: { lat: 52.3086, lng: 4.7639 },
    weather: {
      temp: 9,
      feelsLike: 6,
      condition: 'Light Rain',
      wind: 'W 22 km/h',
      visibility: '7 km',
      humidity: '85%',
      forecast: [
        { day: 'Wed', icon: 'rain', high: 8, low: 4 },
        { day: 'Thu', icon: 'rain', high: 7, low: 3 },
        { day: 'Fri', icon: 'cloud', high: 9, low: 5 },
        { day: 'Sat', icon: 'cloud', high: 10, low: 6 },
        { day: 'Sun', icon: 'sun', high: 12, low: 7 },
      ],
    },
    delays: {
      onTime: 76,
      delayed: 24,
      avgDelayMin: 16,
      vsAverage: '+1 min vs EU avg',
    },
    activity: {
      hours: [
        { hour: 0, flights: 6 }, { hour: 1, flights: 4 }, { hour: 2, flights: 2 },
        { hour: 3, flights: 2 }, { hour: 4, flights: 5 }, { hour: 5, flights: 22 },
        { hour: 6, flights: 58 }, { hour: 7, flights: 84 }, { hour: 8, flights: 96 },
        { hour: 9, flights: 88 }, { hour: 10, flights: 74 }, { hour: 11, flights: 78 },
        { hour: 12, flights: 72 }, { hour: 13, flights: 80 }, { hour: 14, flights: 86 },
        { hour: 15, flights: 82 }, { hour: 16, flights: 90 }, { hour: 17, flights: 79 },
        { hour: 18, flights: 65 }, { hour: 19, flights: 54 }, { hour: 20, flights: 38 },
        { hour: 21, flights: 24 }, { hour: 22, flights: 14 }, { hour: 23, flights: 8 },
      ],
      peakHour: '08:00 – 09:00',
      quietHour: 'After 22:00',
      summary: 'Schiphol peaks sharply in the morning wave, driven by KLM\'s intercontinental departures and European feeder traffic.',
    },
    runways: {
      count: 6,
      longest: '3,800 m (12,467 ft)',
      surface: 'Asphalt',
      designations: ['06/24', '09/27', '18L/36R', '18R/36L', '22/04', '27/09'],
      note: 'Six runways on a single-level below-sea-level site. The unique radial layout allows multiple simultaneous operations in different wind directions.',
    },
    hubAirlines: [
      { name: 'KLM Royal Dutch Airlines', role: 'Primary Hub & Home', share: 52 },
      { name: 'Transavia', role: 'Base', share: 14 },
      { name: 'easyJet', role: 'Base', share: 8 },
      { name: 'Other carriers', role: 'International services', share: 26 },
    ],
    throughput: {
      annualPassengers: '61.9M',
      flightsPerDay: 1340,
      annualMovements: '483,000',
      scaleLabel: 'Europe\'s 3rd busiest airport',
    },
    arrivals: [
      { flight: 'KL 601', from: 'New York JFK', airline: 'KLM', airlineCode: 'kl', scheduled: '06:55', status: 'Landed', terminal: '2', gate: 'D52' },
      { flight: 'KL 771', from: 'Nairobi NBO', airline: 'KLM', airlineCode: 'kl', scheduled: '07:10', status: 'On Time', terminal: '2', gate: 'E24' },
      { flight: 'BA 428', from: 'London LHR', airline: 'British Airways', airlineCode: 'ba', scheduled: '07:25', status: 'On Time', terminal: '1', gate: 'B14' },
      { flight: 'LH 2302', from: 'Frankfurt FRA', airline: 'Lufthansa', airlineCode: 'lh', scheduled: '07:40', status: 'Delayed 12m', terminal: '1', gate: 'A6' },
      { flight: 'KL 855', from: 'Tokyo NRT', airline: 'KLM', airlineCode: 'kl', scheduled: '07:55', status: 'Landed', terminal: '2', gate: 'D38' },
    ],
    departures: [
      { flight: 'KL 641', to: 'Paramaribo PBM', airline: 'KLM', airlineCode: 'kl', scheduled: '10:05', status: 'On Time', terminal: '2', gate: 'D41' },
      { flight: 'KL 701', to: 'Accra ACC', airline: 'KLM', airlineCode: 'kl', scheduled: '10:20', status: 'Boarding', terminal: '2', gate: 'C11' },
      { flight: 'KL 607', to: 'New York JFK', airline: 'KLM', airlineCode: 'kl', scheduled: '10:35', status: 'On Time', terminal: '2', gate: 'E18' },
      { flight: 'HV 5611', to: 'Malaga AGP', airline: 'Transavia', airlineCode: 'hv', scheduled: '10:50', status: 'On Time', terminal: '1', gate: 'B7' },
      { flight: 'EZY 8801', to: 'Barcelona BCN', airline: 'easyJet', airlineCode: 'u2', scheduled: '11:05', status: 'Delayed 25m', terminal: '1', gate: 'A3' },
    ],
    facts: [
      {
        title: 'Below sea level',
        body: 'Schiphol sits at −3 metres below sea level, on the drained bed of the former Haarlemmermeer lake. Continuous pumping keeps the site dry.',
      },
      {
        title: 'One terminal, six piers',
        body: 'Unlike most major hubs, Schiphol operates as a single large terminal with six departure piers, simplifying connections for transfer passengers.',
      },
      {
        title: 'A museum inside',
        body: 'The Rijksmuseum Schiphol, located airside after security, is a small but genuine museum where travellers can view original Dutch Golden Age paintings while waiting for flights.',
      },
      {
        title: 'KLM\'s home since 1926',
        body: 'KLM Royal Dutch Airlines has operated from Schiphol since 1926, making it one of the longest-standing airline-hub relationships in aviation history.',
      },
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Schiphol_bird_eye_2021.jpg/1280px-Schiphol_bird_eye_2021.jpg',
    sunTimes: { sunrise: '06:22', sunset: '18:38' },
  },

  HND: {
    iata: 'HND',
    icao: 'RJTT',
    name: 'Tokyo Haneda Airport',
    city: 'Tokyo',
    country: 'Japan',
    type: 'International Hub',
    elevation: '9 m (30 ft)',
    timezone: 'UTC+9',
    opened: '1931',
    terminals: 3,
    coordinates: { lat: 35.5494, lng: 139.7798 },
    weather: {
      temp: 14,
      feelsLike: 12,
      condition: 'Clear',
      wind: 'NE 10 km/h',
      visibility: '20 km',
      humidity: '48%',
      forecast: [
        { day: 'Wed', icon: 'sun', high: 18, low: 11 },
        { day: 'Thu', icon: 'sun', high: 20, low: 12 },
        { day: 'Fri', icon: 'cloud', high: 17, low: 10 },
        { day: 'Sat', icon: 'rain', high: 14, low: 9 },
        { day: 'Sun', icon: 'cloud', high: 16, low: 10 },
      ],
    },
    delays: {
      onTime: 91,
      delayed: 9,
      avgDelayMin: 7,
      vsAverage: '−8 min vs Asia avg',
    },
    activity: {
      hours: [
        { hour: 0, flights: 4 }, { hour: 1, flights: 2 }, { hour: 2, flights: 1 },
        { hour: 3, flights: 1 }, { hour: 4, flights: 3 }, { hour: 5, flights: 16 },
        { hour: 6, flights: 52 }, { hour: 7, flights: 78 }, { hour: 8, flights: 92 },
        { hour: 9, flights: 86 }, { hour: 10, flights: 74 }, { hour: 11, flights: 68 },
        { hour: 12, flights: 70 }, { hour: 13, flights: 76 }, { hour: 14, flights: 82 },
        { hour: 15, flights: 78 }, { hour: 16, flights: 84 }, { hour: 17, flights: 72 },
        { hour: 18, flights: 58 }, { hour: 19, flights: 48 }, { hour: 20, flights: 34 },
        { hour: 21, flights: 22 }, { hour: 22, flights: 12 }, { hour: 23, flights: 6 },
      ],
      peakHour: '17:00 – 18:00',
      quietHour: 'After 23:00',
      summary: 'Haneda maintains high and consistent traffic throughout the day, peaking in the evening with domestic return flights from across Japan.',
    },
    runways: {
      count: 4,
      longest: '3,360 m (11,024 ft)',
      surface: 'Asphalt',
      designations: ['16L/34R', '16R/34L', '04/22', '05/23'],
      note: 'Two runways extend over Tokyo Bay on reclaimed land, a remarkable feat of engineering that allowed the airport to expand without displacing residential areas.',
    },
    hubAirlines: [
      { name: 'Japan Airlines', role: 'Primary Hub & Home', share: 38 },
      { name: 'All Nippon Airways', role: 'Primary Hub & Home', share: 40 },
      { name: 'Skymark Airlines', role: 'Base', share: 9 },
      { name: 'Other carriers', role: 'International services', share: 13 },
    ],
    throughput: {
      annualPassengers: '85.5M',
      flightsPerDay: 1486,
      annualMovements: '541,000',
      scaleLabel: 'Asia\'s most punctual major hub',
    },
    arrivals: [
      { flight: 'JL 044', from: 'Los Angeles LAX', airline: 'Japan Airlines', airlineCode: 'jl', scheduled: '15:30', status: 'Landed', terminal: '3', gate: '108' },
      { flight: 'NH 002', from: 'New York JFK', airline: 'ANA', airlineCode: 'nh', scheduled: '15:55', status: 'On Time', terminal: '3', gate: '115' },
      { flight: 'BA 006', from: 'London LHR', airline: 'British Airways', airlineCode: 'ba', scheduled: '16:10', status: 'On Time', terminal: '3', gate: '104' },
      { flight: 'JL 706', from: 'Sapporo CTS', airline: 'Japan Airlines', airlineCode: 'jl', scheduled: '16:20', status: 'On Time', terminal: '1', gate: '62' },
      { flight: 'NH 460', from: 'Osaka ITM', airline: 'ANA', airlineCode: 'nh', scheduled: '16:30', status: 'On Time', terminal: '2', gate: '74' },
    ],
    departures: [
      { flight: 'NH 106', to: 'New York JFK', airline: 'ANA', airlineCode: 'nh', scheduled: '10:00', status: 'On Time', terminal: '3', gate: '114' },
      { flight: 'JL 006', to: 'London LHR', airline: 'Japan Airlines', airlineCode: 'jl', scheduled: '10:45', status: 'Boarding', terminal: '3', gate: '107' },
      { flight: 'NH 212', to: 'Paris CDG', airline: 'ANA', airlineCode: 'nh', scheduled: '11:20', status: 'On Time', terminal: '3', gate: '118' },
      { flight: 'OZ 102', to: 'Seoul ICN', airline: 'Asiana', airlineCode: 'oz', scheduled: '11:55', status: 'Delayed 10m', terminal: '2', gate: '68' },
      { flight: 'TG 641', to: 'Bangkok BKK', airline: 'Thai Airways', airlineCode: 'tg', scheduled: '12:30', status: 'On Time', terminal: '2', gate: '71' },
    ],
    facts: [
      {
        title: 'The world\'s most punctual airport',
        body: 'Haneda consistently ranks as the most on-time major airport globally. An on-time rate above 90% is considered normal — not exceptional — by Japanese aviation standards.',
      },
      {
        title: 'Built on the bay',
        body: 'Two of Haneda\'s four runways are constructed on reclaimed land extending into Tokyo Bay, created through decades of marine landfill engineering.',
      },
      {
        title: 'Closer than Narita',
        body: 'Haneda is 14 km from central Tokyo, compared to Narita\'s 60 km. For business travellers, it saves up to 90 minutes per journey.',
      },
      {
        title: 'International comeback',
        body: 'Haneda was Tokyo\'s only international airport until 1978. After Narita opened, it served only domestic routes for decades before international flights returned in 2010.',
      },
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Haneda_Airport_international_terminal_2014.jpg/1280px-Haneda_Airport_international_terminal_2014.jpg',
    sunTimes: { sunrise: '05:44', sunset: '18:02' },
  },

  DXB: {
    iata: 'DXB',
    icao: 'OMDB',
    name: 'Dubai International Airport',
    city: 'Dubai',
    country: 'United Arab Emirates',
    type: 'International Hub',
    elevation: '19 m (63 ft)',
    timezone: 'UTC+4',
    opened: '1959',
    terminals: 3,
    coordinates: { lat: 25.2532, lng: 55.3657 },
    weather: {
      temp: 29,
      feelsLike: 31,
      condition: 'Sunny',
      wind: 'SE 14 km/h',
      visibility: '10 km',
      humidity: '62%',
      forecast: [
        { day: 'Wed', icon: 'sun', high: 34, low: 24 },
        { day: 'Thu', icon: 'sun', high: 35, low: 25 },
        { day: 'Fri', icon: 'sun', high: 36, low: 26 },
        { day: 'Sat', icon: 'sun', high: 35, low: 25 },
        { day: 'Sun', icon: 'sun', high: 34, low: 24 },
      ],
    },
    delays: {
      onTime: 81,
      delayed: 19,
      avgDelayMin: 14,
      vsAverage: '−1 min vs Middle East avg',
    },
    activity: {
      hours: [
        { hour: 0, flights: 18 }, { hour: 1, flights: 14 }, { hour: 2, flights: 22 },
        { hour: 3, flights: 28 }, { hour: 4, flights: 32 }, { hour: 5, flights: 38 },
        { hour: 6, flights: 52 }, { hour: 7, flights: 68 }, { hour: 8, flights: 82 },
        { hour: 9, flights: 78 }, { hour: 10, flights: 72 }, { hour: 11, flights: 68 },
        { hour: 12, flights: 65 }, { hour: 13, flights: 70 }, { hour: 14, flights: 76 },
        { hour: 15, flights: 74 }, { hour: 16, flights: 80 }, { hour: 17, flights: 72 },
        { hour: 18, flights: 68 }, { hour: 19, flights: 74 }, { hour: 20, flights: 82 },
        { hour: 21, flights: 76 }, { hour: 22, flights: 58 }, { hour: 23, flights: 36 },
      ],
      peakHour: '18:00 – 19:00',
      quietHour: '03:00 – 05:00',
      summary: 'DXB operates nearly 24 hours, with overnight traffic driven by long-haul connections and a secondary peak in the late evening.',
    },
    runways: {
      count: 2,
      longest: '4,000 m (13,123 ft)',
      surface: 'Asphalt',
      designations: ['12L/30R', '12R/30L'],
      note: 'Two parallel 4 km runways support some of the world\'s highest aircraft movements. Emirates\' A380 fleet requires the full length for maximum-weight long-haul departures.',
    },
    hubAirlines: [
      { name: 'Emirates', role: 'Primary Hub & Home', share: 56 },
      { name: 'flydubai', role: 'Base', share: 18 },
      { name: 'Qantas', role: 'Stopover Hub', share: 4 },
      { name: 'Other carriers', role: 'International services', share: 22 },
    ],
    throughput: {
      annualPassengers: '86.9M',
      flightsPerDay: 1200,
      annualMovements: '432,000',
      scaleLabel: 'World\'s busiest international airport',
    },
    arrivals: [
      { flight: 'EK 001', from: 'London LHR', airline: 'Emirates', airlineCode: 'ek', scheduled: '06:00', status: 'Landed', terminal: '3', gate: 'B6' },
      { flight: 'EK 215', from: 'Sydney SYD', airline: 'Emirates', airlineCode: 'ek', scheduled: '06:20', status: 'Landed', terminal: '3', gate: 'C18' },
      { flight: 'FZ 302', from: 'Beirut BEY', airline: 'flydubai', airlineCode: 'fz', scheduled: '06:40', status: 'On Time', terminal: '2', gate: 'A5' },
      { flight: 'EK 517', from: 'Nairobi NBO', airline: 'Emirates', airlineCode: 'ek', scheduled: '07:00', status: 'On Time', terminal: '3', gate: 'D22' },
      { flight: 'QR 961', from: 'Doha DOH', airline: 'Qatar Airways', airlineCode: 'qr', scheduled: '07:15', status: 'Delayed 20m', terminal: '1', gate: '14' },
    ],
    departures: [
      { flight: 'EK 001', to: 'London LHR', airline: 'Emirates', airlineCode: 'ek', scheduled: '08:00', status: 'Boarding', terminal: '3', gate: 'B4' },
      { flight: 'EK 211', to: 'New York JFK', airline: 'Emirates', airlineCode: 'ek', scheduled: '08:45', status: 'On Time', terminal: '3', gate: 'C12' },
      { flight: 'FZ 321', to: 'Beirut BEY', airline: 'flydubai', airlineCode: 'fz', scheduled: '09:20', status: 'On Time', terminal: '2', gate: 'A7' },
      { flight: 'EK 417', to: 'Nairobi NBO', airline: 'Emirates', airlineCode: 'ek', scheduled: '09:55', status: 'Delayed 30m', terminal: '3', gate: 'D18' },
      { flight: 'G9 231', to: 'Riyadh RUH', airline: 'Air Arabia', airlineCode: 'g9', scheduled: '10:10', status: 'On Time', terminal: '1', gate: '22' },
    ],
    facts: [
      {
        title: 'The world\'s busiest international airport',
        body: 'DXB handles more international passengers than any other airport globally — over 86 million in a single year — with flights connecting to more than 240 destinations.',
      },
      {
        title: 'Emirates operates 50% of all flights',
        body: 'More than half of all departures from Dubai International are operated by Emirates, making it one of the most airline-dominated hubs in the world.',
      },
      {
        title: 'Terminal 3 is enormous',
        body: 'Terminal 3, built exclusively for Emirates, is one of the largest buildings by floor area on Earth, covering 1.7 million square metres underground and above ground.',
      },
      {
        title: 'Open all night',
        body: 'Unlike most European airports, DXB has no scheduled night curfew, allowing Emirates to operate its famous "wave" of long-haul flights between midnight and 3am.',
      },
    ],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Dubai_International_Airport_-_Terminal_3.jpg/1280px-Dubai_International_Airport_-_Terminal_3.jpg',
    sunTimes: { sunrise: '06:12', sunset: '18:28' },
  },
}

export function getAirport(iata: string): AirportData | null {
  return airports[iata.toUpperCase()] ?? null
}
