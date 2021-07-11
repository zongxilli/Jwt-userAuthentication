exports.up = function (knex) {
	return knex.schema.createTable('user', (table) => {
		table
			.uuid('user_id')
			.unique()
			.notNullable()
			.primary()
			.defaultTo(knex.raw('gen_random_uuid()'));
		table.string('user_name').notNullable();
    table.string('user_email').notNullable();
    table.string('user_password');
		table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('user');
};
