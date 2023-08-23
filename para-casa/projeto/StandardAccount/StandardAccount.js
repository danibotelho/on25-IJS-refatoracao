import Account from "../Account/Account";

class StandardAccount extends Account {
  transactionLimit;
  
  constructor() {
    const limit = 1000
    super();
    this.transactionLimit = limit;
  }

  createAccount(accountNumber, agency, balance, income) {
    const maxLimit = 4999
    if (income > maxLimit) {
      throw new Error("Renda incompatível com o tipo de conta")
    }
    if (accountNumber.length === 5 && agency.length === 4 && balance > 0) {
      this.accountNumber=accountNumber;
      this.agency=agency;
      this.balance=balance;
      return "Conta criada com sucesso";
    } else {
      throw new Error("Dados inválidos para cadastro");
    }
  }

  transfer(value, accountNumber, agency) {
    const validAccount = Account.all.find(account => {
      let accNumber = account.getAccountNumber();
      let accAgency = account.getAgency();
      return accNumber === accountNumber && accAgency === agency; 
    })

    if (!validAccount) {
      throw new Error ("Conta não encontrada")
    }

    if (value > this.transactionLimit) {
      throw new Error ("O seu limite de transação é de 1000 reais")
    }

    if (value < 0) {
      throw new Error("Valor inválido de transferência");
    }

    if (this.balance - value > 0) {
      validAccount.setBalance(value);
      this.balance -= value;
      return "Transferência feita com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }

  pix(value, pixKey, keyType) {
    const validAccount = Account.all.find(account => {
      return account.pixKeys[keyType] === pixKey;
    })
  
    if (!validAccount) {
      throw new Error ("Chave pix não encontrada")
    }

    if (value > this.transactionLimit) {
      throw new Error ("O seu limite de transação é de 1000 reais")
    }

    if (value < 0) {
      throw new Error("Valor inválido de pix");
    }

    if (this.balance - value > 0) {
      this.balance -= value;
      validAccount.setBalance(value);
      return "Pix feito com sucesso";
    } else {
      throw new Error("Você não possui saldo suficiente");
    }
  }
}

export default StandardAccount;