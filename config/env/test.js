/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
module.exports = {
    app: {
        name: 'best-practise'
    },
    port: 3000,
    db: 'mongodb://localhost/best-practise-test',
    logger: {
        prefix: 'dev -',
        transports: [
            'Console'
        ],
        Console: {}
    }
};
