const faker = require('faker');
const fs = require('fs');
faker.locale = "vi";

const randomUserList = (n) => {
    const userList = [];
    if (n <= 0) return [];

    for (let i = 1; i <= n; i++) {
        const user = {
            id: faker.random.uuid(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
            full_name: `${faker.name.lastName()} ${faker.name.firstName()}`,
            email: faker.internet.email(),
            phone_number: faker.phone.phoneNumber(),
        };
        userList.push(user);
    }

    return userList;
};

const randomProductList = (n, categoryList) => {
    const productList = [];
    if (n <= 0) return [];

    for (let i = 1; i <= n; i++) {
        const product = {
            product_id: faker.random.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            description: faker.lorem.sentence(),
            image_url: faker.image.imageUrl(400, 400),
            category_id: faker.random.arrayElement(categoryList).category_id,
        };
        productList.push(product);
    }

    return productList;
};

const randomCategoryList = (n) => {
    const categoryList = [];
    if (n <= 0) return [];

    for (let i = 1; i <= n; i++) {
        const category = {
            category_id: faker.random.uuid(),
            name: faker.commerce.department(),
        };
        categoryList.push(category);
    }

    return categoryList;
};

const randomOrderList = (n, userList) => {
    const orderList = [];
    if (n <= 0) return [];

    for (let i = 1; i <= n; i++) {
        const order = {
            order_id: faker.random.uuid(),
            user_id: faker.random.arrayElement(userList).user_id,
            order_date: faker.date.past(),
            total_price: faker.commerce.price(),
        };
        orderList.push(order);
    }

    return orderList;
};

const randomOrderDetailList = (n, orderList, productList) => {
    const orderDetailList = [];
    if (n <= 0) return [];

    for (let i = 1; i <= n; i++) {
        const orderDetail = {
            order_detail_id: faker.random.uuid(),
            order_id: faker.random.arrayElement(orderList).order_id,
            product_id: faker.random.arrayElement(productList).product_id,
            quantity: faker.random.number(10),
        };
        orderDetailList.push(orderDetail);
    }

    return orderDetailList;
};

(() => {
    const numUsers = 5;
    const numCategories = 5;
    const numProducts = 20;
    const numOrders = 5;
    const numOrderDetails = 5;

    const userList = randomUserList(numUsers);
    const categoryList = randomCategoryList(numCategories);
    const productList = randomProductList(numProducts, categoryList);
    const orderList = randomOrderList(numOrders, userList);
    const orderDetailList = randomOrderDetailList(numOrderDetails, orderList, productList);

    const db = {
        users: userList,
        products: productList,
        categories: categoryList,
        orders: orderList,
        orderDetails: orderDetailList,
    };

    // write db obj to db.json
    fs.writeFile('./db.json', JSON.stringify(db), () => {
        console.log('Write successfully');
    });
})();
