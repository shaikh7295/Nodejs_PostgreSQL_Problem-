const pool = require('../config/dbConnection');


async function insertIntoDB(records) {

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const item of records) {
      const fullName = `${item.name?.firstName || ''} ${item.name?.lastName || ''}`;
      const age = item?.age ?? null;
      const gender = item?.gender ?? null;
      const address = item?.address ?? null;
      const city = item?.address?.city ?? null;
      const additional_info = item?.additional_info ?? null;

      await client.query(
        `INSERT INTO records (name, age, address, city, gender, additional_info)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [fullName, age, address, city, gender, additional_info]
      );
    }

    await client.query('COMMIT');
    return { message: 'Records inserted successfully' };
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Insert error:', err);
    return { message: 'Insertion failed', error: err.message };
  } finally {
    client.release();
  }
}


function calculateAgeDistribution(users) {
  const dist = { '<20': 0, '20-40': 0, '40-60': 0, '>60': 0 };

  users.forEach(u => {
    const age = u.age;
    if (age < 20) dist['<20']++;
    else if (age <= 40) dist['20-40']++;
    else if (age <= 60) dist['40-60']++;
    else dist['>60']++;
  });

  const total = users.length;
  for (const group in dist) {
    console.log(`${group} : ${((dist[group] / total) * 100).toFixed(2)}%`);
  }
}

module.exports = { insertIntoDB, calculateAgeDistribution };