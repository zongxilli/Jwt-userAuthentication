exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('user')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('user').insert([
				{
					user_name: 'Zongxi',
					user_email: 'zongxi2014@163.com',
					user_password: '123456',
				},
				{
					user_name: 'Yang',
					user_email: 'dxp9816@gmail.com',
					user_password: '123456',
				},
			]);
		});
};
