class UserList {
  constructor (users) {
    this._users = users;
  }

  showNames () {
    this._users.forEach(user => {
      console.log(`${user.firstName} ${user.lastName}`);
    });
    return this;
  }

  showById (id) {
    let sameId = false;
    this._users.forEach(user => {
      if (id == user.id) {
        console.log(user);
        sameId = true;
      }
    })
    if (!sameId) {
      console.log(`Unable to find user with id: ${id}`);
    }
    return this;
  }

  add (firstName, lastName, age) {
    const randomId = Math.floor(Math.random() * Math.pow(10, 13)).toString();
    const newUser = {
      id: randomId,
      firstName: firstName,
      lastName: lastName,
      age: age
    }
    if (firstName) {
      this._users.push(newUser);
      console.log(`Hi everyone, i am ${firstName}`) ;
    } else {
      console.log('You need to enter your first name');
    }
    return this;
  }

  removeById (id) {
    let sameId = false;
    this._users.forEach((user, index) => {
      if (id == user.id) {
        this._users.splice(index, 1)
        console.log(`bye bye ${user.firstName}`);
        sameId = true;
      }
    })
    if (!sameId) {
      console.log(`Unable to find user with id: ${id}`);
    }
    return this;
  }

  logUsersCould () {
    console.log(`Number of users: ${this._users.length}`);
    return this;
  }
}

const usersArray = [
  {
    id: '1485249082126',
    firstName: "Jon",
    lastName: 'Snow',
    age: '30'
  },
  {
    id: '0987654321123',
    firstName: "SpongeBob",
    lastName: 'SquarePants',
    age: '16'
  }
];

const users = new UserList(usersArray);

users
  .showNames()
  .showById('0987654321123')
  .add('Patrik', 'Star', '15')
  .removeById('1485249082126')
  .logUsersCould()
console.log(usersArray)