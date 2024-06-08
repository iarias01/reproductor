import { EEventType, ISocialEvent } from '../interfaces/social-event.model';

export const SOCIAL_EVENT_MOCK: ISocialEvent[] = [
  {
    name: 'Music Fest 2024',
    type: EEventType.PARTY,
    description: 'A grand music festival with various artists performing live.',
    image: './assets/images/samples/flayerSample1.png',
    date: {
      day: '2024-06-01',
      startTime: '18:00',
      endTime: '23:00',
    },
    sale: {
      at_door: 50,
      anticipated: 40,
    },
    address: {
      country: 'USA',
      city: 'New York',
      street: '123 Broadway Ave',
      note: 'Main entrance through the front gate.',
      location: {
        link: 'https://maps.app.goo.gl/JL8UycGXi7gX7R5v6',
        position: { lat: 40.712776, lng: -74.005974 },
        address: '123 Broadway Ave, New York, NY',
      },
    },
    contact: {
      mail: 'info@musicfest.com',
      phone: '123-456-7890',
      whatsapp: '123-456-7890',
      instagram: '@musicfest2024',
    },
    visits: 1200,
  },
  {
    name: 'Food Carnival',
    type: EEventType.PARTY,
    description:
      'A celebration of gourmet food and beverages from around the world.',
    image: './assets/images/samples/flayerSample3.png',
    date: {
      day: '2024-07-15',
      startTime: '12:00',
      endTime: '20:00',
    },
    sale: {
      at_door: 30,
      anticipated: 25,
    },
    address: {
      country: 'Canada',
      city: 'Toronto',
      street: '456 Maple St',
      note: 'Parking available at the rear.',
      location: {
        link: 'https://maps.app.goo.gl/JL8UycGXi7gX7R5v6',
        position: { lat: 43.65107, lng: -79.347015 },
        address: '456 Maple St, Toronto, ON',
      },
    },
    contact: {
      mail: 'contact@foodcarnival.com',
      phone: '234-567-8901',
      whatsapp: '234-567-8901',
      instagram: '@foodcarnival2024',
    },
    visits: 900,
  },
  {
    name: 'Congreso interancional de Argentina Latin World',
    type: EEventType.CONGRESS,
    description: 'Showcasing the latest in technology and innovation.',
    image: './assets/images/samples/flayerSample4.png',
    date: {
      day: '2024-08-20',
      startTime: '10:00',
      endTime: '18:00',
    },
    sale: {
      at_door: 60,
      anticipated: 50,
    },
    address: {
      country: 'Germany',
      city: 'Berlin',
      street: '789 Innovation Rd',
      note: 'Free Wi-Fi available throughout the venue.',
      location: {
        link: 'https://maps.app.goo.gl/JL8UycGXi7gX7R5v6',
        position: { lat: 52.520008, lng: 13.404954 },
        address: '789 Innovation Rd, Berlin',
      },
    },
    contact: {
      mail: 'info@techexpo.com',
      phone: '345-678-9012',
      whatsapp: '345-678-9012',
      instagram: '@techexpo2024',
    },
    visits: 1500,
  },
  {
    name: 'Nombre del Evento',
    type: EEventType.WORKSHOP,
    description:
      'A fair featuring handmade crafts and artwork from local artists.',
    image: './assets/images/samples/flayerSample3.png',
    date: {
      day: '2024-09-10',
      startTime: '09:00',
      endTime: '17:00',
    },
    sale: {
      at_door: 20,
      anticipated: 15,
    },
    address: {
      country: 'France',
      city: 'Paris',
      street: '101 Champs-Élysées',
      note: 'Event held in the outdoor plaza.',
      location: {
        link: 'https://maps.app.goo.gl/JL8UycGXi7gX7R5v6',
        position: { lat: 48.856613, lng: 2.352222 },
        address: '101 Champs-Élysées, Paris',
      },
    },
    contact: {
      mail: 'info@artcraftfair.com',
      phone: '456-789-0123',
      whatsapp: '456-789-0123',
      instagram: '@artcraftfair2024',
    },
    visits: 800,
  },
  {
    name: 'Health & Wellness Expo',
    type: EEventType.PARTY,
    description: 'An expo focusing on health, wellness, and fitness.',
    image: './assets/images/samples/flayerSample4.png',
    date: {
      day: '2024-10-05',
      startTime: '08:00',
      endTime: '16:00',
    },
    sale: {
      at_door: 40,
      anticipated: 30,
    },
    address: {
      country: 'Australia',
      city: 'Sydney',
      street: '202 Healthy Living Blvd',
      note: 'Join us for fitness workshops and health screenings.',
      location: {
        link: 'https://maps.app.goo.gl/JL8UycGXi7gX7R5v6',
        position: { lat: -33.86882, lng: 151.209296 },
        address: '202 Healthy Living Blvd, Sydney',
      },
    },
    contact: {
      mail: 'info@wellnessexpo.com',
      phone: '567-890-1234',
      whatsapp: '567-890-1234',
      instagram: '@wellnessexpo2024',
    },
    visits: 1100,
  },
];
