


export default class User {
    constructor() {

    }

    async create({username, full_name, email, role_id, password}) {
        const [result] = await db.query(
            'INSERT INTO users (username, full_name, email, role_id, token,  password) VALUES (?, ?)',
            [data.full_name, data.email]
        );
        console.log('Inserted ID:', result.insertId);
    }
}