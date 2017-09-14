import knex from '../../server/sql/connector';

export default class Count {
  getCount(_id) {
    return knex('count')
      .where('id', '=', _id);
  }

  addCount(amount) {
    return knex('count').increment('amount', amount);
  }

  insertCount(initialAmount, _id) {
    return knex('count')
      .insert({ amount: initialAmount })
      .returning('id');
  }

  updateCountAmount(_id, amount) {
    return knex('count')
      .where('id', '=', _id)
      .update({
        amount,
        updated_at: new Date().toString()
      });
  }

  deleteCount(_id) {
    return knex('count')
      .where('id', '=', _id)
      .del();
  }
}
