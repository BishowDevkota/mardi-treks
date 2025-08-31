
// app/api/pricing/route.ts
import { NextResponse } from 'next/server';

const TREK_PRICING = {
  "mardi-himal-trek": [
    { minPersons: 1, maxPersons: 1, price: 800 },
    { minPersons: 2, maxPersons: 2, price: 750 },
    { minPersons: 3, maxPersons: 5, price: 700 },
    { minPersons: 6, maxPersons: 9, price: 650 },
    { minPersons: 10, maxPersons: 12, price: 600 },
    { minPersons: 13, maxPersons: 999, price: 550 }
  ],
  "mardi-himal-trek-from-pokhara": [
    { minPersons: 1, maxPersons: 1, price: 550 },
    { minPersons: 2, maxPersons: 2, price: 520 },
    { minPersons: 3, maxPersons: 5, price: 490 },
    { minPersons: 6, maxPersons: 9, price: 460 },
    { minPersons: 10, maxPersons: 12, price: 430 },
    { minPersons: 13, maxPersons: 999, price: 400 }
  ],
  "mardi-himal-trek-with-annapurna-base-camp": [
    { minPersons: 1, maxPersons: 1, price: 950 },
    { minPersons: 2, maxPersons: 2, price: 930 },
    { minPersons: 3, maxPersons: 5, price: 910 },
    { minPersons: 6, maxPersons: 9, price: 890 },
    { minPersons: 10, maxPersons: 12, price: 870 },
    { minPersons: 13, maxPersons: 999, price: 850 }
  ]
};

export async function GET() {
  return NextResponse.json(TREK_PRICING);
}
