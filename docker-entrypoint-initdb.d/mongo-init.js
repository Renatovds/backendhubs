print(
    'Start #################################################################',
);

db = db.getSiblingDB('hubsdb');
db.createUser({
    user: 'api_user',
    pwd: 'api1234',
    roles: [{ role: 'readWrite', db: 'hubsdb' }],
});
db.createCollection('users');

db.users.insert({
    login: 'admin',
    name: 'admin',
    password: '$2b$10$UxLiwITmtPCGLJ2rAmrdKu.1z5j4vXz4.4lPGtxruVtZg5oAhO8Em',
    user_type: 'admin',
});
print('END #################################################################');
