const income = ['L HEALTHFOOD', 'FREELANCE INCOME'];
const expenses = [
  '#MONTHLY ACCOUNT FEE',
  '#REPLACEMENT CARD FEE   123456******1234',
  '#SERVICE FEES',
  'ABSOLUTE PETS MOUNTAIN 123456*1234',
  'ABSOLUTE PETS MOUNTAIN 123456*1234',
  'AIRLINE 123456*1234',
  'ANIMAL HOSP 123456*1234',
  'ANIMAL HOSP 123456*1234',
  'BRITTANS SWEETS INT 123456*1234',
  'CALTEX CBD 123456*1234',
  'CAR INSURANCE',
  'CHECKERS MOUNTAIN 123456*1234',
  'CHECKERS MOUNTAIN 123456*1234',
  'CHECKERS MOUNTAIN 123456*1234',
  'CHECKERS MOUNTAIN 123456*1234',
  'CHECKERS MOUNTAIN 123456*1234',
  'Clicks MOUNTAIN Ma 123456*1234',
  'DISC PREM 12345',
  'DISC PREM 12345',
  'Dischem MOUNTAIN M 123456*1234',
  'ELECTRICITY',
  'ELECTRICITY 04127674986',
  'FORNERIA ITALIA  10 123456*1234',
  'FORNERIA ITALIA  10 123456*1234',
  'GOOGLE *Goog 123456*1234',
  'GROCERIES',
  'JERRYS',
  'JERRYS DINNER',
  'MCD (419) 123456*1234',
  'MCD (419) 123456*1234',
  'NETFLIX.COM 123456*1234',
  'OZFM FOOD',
  'PETROL',
  'PLASTER',
  'PNP CRP 123456*1234',
  'PNP CRP 123456*1234',
  'PNP CRP 123456*1234',
  'SEATTLE RET 123456*1234',
  'SEATTLE RET 123456*1234',
  'SEATTLE EB MOUNTAIN 123456*1234',
  'SMART-AP PREPAID AIRTIME 08312345',
  'SUPERLIST COM A D 123456*1234',
  'SUSHI',
  'SnapScan Dermastore 123456*1234',
  'SnapScan Goodeggs  123456*1234',
  'SnapScan Ou Meul 123456*1234',
  'SnapScan Puglia Che 123456*1234',
  'SnapScan Rooir 123456*1234',
  'SnapScan Sea Breeze 123456*1234',
  'SnapScan Tasha Tyle 123456*1234',
  'SnapScan The Shred 123456*1234',
  'SnapScan Vadas Smok 123456*1234',
  'SnapScan Woodstock 123456*1234',
  'SpotifyZA 123456*1234',
  'SuperSpar CBD 123456*1234',
  'TRECASTELLI123456*1234',
  'The Hart 123456*1234',
  'UBER TRIP HELP.UBER 123456*1234',
  'V A WATERFRONT 123456*1234',
  'VIDA E CAFE MOUNTAIN 123456*1234',
  'WELLNESS WAREHOUSE 123456*1234',
  'WOOLWORTHS 123456*1234',
];
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};
// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  const month = (new Date().getMinutes() % 5) + 1;
  const includeIncome = Math.random() < 0.3;
  const transactions = new Array(Math.floor(Math.random() * 20 + 1))
    .fill(Math.floor(Math.random() * expenses.length))
    .map(() => ({
      amount: Math.floor(Math.random() * 1500 * -1),
      description: expenses[Math.floor(Math.random() * expenses.length)],
      date: new Date(
        `${month}/${Math.ceil(Math.random() * 27)}/20`
      ).toISOString(),
    }));

  if (includeIncome) {
    transactions.push({
      amount: Math.floor(Math.random() * 15000),
      description: income[Math.floor(Math.random() * income.length)],
      date: new Date(
        `${month}/${Math.ceil(Math.random() * 27)}/20`
      ).toISOString(),
    });
  }

  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        transactions,
      }),
      headers: {
        ...headers,
        'content-type': 'application/json',
        'cache-control': 'Cache-Control: max-age=300, public',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
      headers: {
        ...headers,
        'content-type': 'application/json',
        'cache-control': 'Cache-Control: max-age=300, public',
      },
    };
  }
};

module.exports = { handler };
