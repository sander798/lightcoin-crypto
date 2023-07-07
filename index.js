class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  
  get balance() {
    let total = 0;
    
    for (let e of this.transactions) {
      total += e;
    }
    
    return total;
  }
  
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}


class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.account.addTransaction(this.value());
      this.time = new Date();
    } else {
      console.log("The balance in this account is not sufficient to withdraw $" + this.amount + ".");
    }
  }
  
  isAllowed() {};
}

class Deposit extends Transaction {
  
  value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {

  value() {
    return -this.amount;
  }
  
  isAllowed() {
    return this.account.balance >= this.amount;
  }
}





// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

console.log('Starting Balance:', myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
//console.log('Transaction 1:', t1);

console.log('Balance:', myAccount.balance);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
//console.log('Transaction 2:', t2);

console.log('Balance:', myAccount.balance);

t3 = new Deposit(120.00, myAccount);
t3.commit();
//console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);