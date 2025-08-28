// library.js
exports.book = {
    title: "Node.js Mastery",
    author: "Jane Smith",
    details: function () {
        return `${this.title} by ${this.author}`;
    }
};

exports.utilities = {
    greet: function (name) {
        return `Hello, ${name}! Welcome to the library.`;
    }
};
