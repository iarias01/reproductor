export interface ISocialEvent {
  name: string;
  description: string;
  type: EEventType;
  image: string;
  date: {
    day: string;
    startTime: string;
    endTime: string;
  };
  sale: {
    at_door: number;
    anticipated: number;
  };
  address: {
    country: string;
    city: string;
    street: string;
    note: string;
    location: {
      link: string;
      position: { lat: number; lng: number };
      address: string;
    };
  };
  contact: {
    mail: string;
    phone: string;
    whatsapp: string;
    instagram: string;
  };
  visits: number;
}

export enum EEventType {
  CONGRESS = 'congress',
  WORKSHOP = 'workshop',
  PARTY = 'party',
}
